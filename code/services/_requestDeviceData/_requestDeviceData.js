var TABLE="site_equipment";
var _req, _resp, edgeID;

var MBFUNCTION = {
    READCOIL:1,
    READINPUT:2,
    READHOLDINGREGISTERS:3,
    READINPUTREGISTERS:4,
    WRITESINGLECOIL:5,
    WRITESINGLEHOLDINGREGISTER:6,
    WRITEMULTIPLECOILS:15,
    WRITEMULTIPLEHOLDINGREGISTERS:16
};

/**
 * Queries the Edge data according to the defined site attributes
 */
function _requestDeviceData(req, resp){
    ClearBlade.init({request:req});
    _req=req;
    _resp=resp;

	if (ClearBlade.isEdge()) {
	    var query = ClearBlade.Query({collectionName:TABLE});
        edgeID=ClearBlade.edgeId();
	    query.equalTo("edgeid", edgeID);
	    promiseQuery(query).then(function(r){
	        var address=r[0].address;
	        attr=JSON.parse(r[0].data_aquisition_attributes);
	        try {
                if ('COILS_ADDR' in attr) {
                    sendDataRequest(edgeID, address, MBFUNCTION.READCOIL, attr.UNITID,  attr.COILS_ADDR, attr.COILS_LENGTH);
                }
                if ('INPUTS_ADDR' in attr) {
                    sendDataRequest(edgeID, address, MBFUNCTION.READINPUT, attr.UNITID,  attr.INPUTS_ADDR, attr.INPUTS_LENGTH);
                }
                if ('INPUT_REGISTERS_ADDR' in attr) {
                    sendDataRequest(edgeID, address, MBFUNCTION.READINPUTREGISTERS, attr.UNITID,  attr.INPUT_REGISTERS_ADDR, attr.INPUT_REGISTERS_LENGTH);
                }
                if ('HOLDING_REGISTERS' in attr) {
                    sendDataRequest(edgeID, address, MBFUNCTION.READHOLDINGREGISTERS, attr.UNITID,  attr.HREGISTERS, attr.HREGISTERS_LENGTH);
                }
	        }
	        catch(ex) {
	            resp.error(ex);
	        }
        });
	} else
	resp.error("Code can only execute on an edge");
}


function sendDataRequest(deviceid, hostaddress, fcode, unitid, startaddr, addrlength) {
    var msg = ClearBlade.Messaging();
    payload={
        ModbusHost: hostaddress,
        FunctionCode: fcode,
        UnitID: unitid,
        StartAddress: startaddr,
        AddressCount: addrlength,
        DeviceID: deviceid,
        Data: []};
    log(payload);
    msg.publish(MODBUSREQUESTTOPIC,JSON.stringify(payload));
    //_resp.success(MODBUSREQUESTTOPIC);
}

/**
 * promiseQuery returns a query in the form of a promise
 * @constructor
 * @param {ClearBlade.Query} title - QueryObject.
 */
function promiseQuery(query) {
    d = Q.defer();
    var cb = function(err, result) {
        if (err) {
            d.reject(new Error(result));
        } else {
            d.resolve(result.DATA);
        }
    };
    query.fetch(cb);
    return d.promise;
}