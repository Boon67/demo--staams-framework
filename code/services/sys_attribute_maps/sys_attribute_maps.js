var _resp, _req;
var _record;
tbl="sys_attributes_maps";

function sys_attribute_maps(req, resp){
    ClearBlade.init({request:req});
    _resp=resp;
    _req=req;
    values=req.params;
    if (values.DELETE) {
        resp.success('DELETE');
    }
    else if (values.UPDATE) { //Create or Update based upon values
        log('UPDATE');
        delete values.UPDATE;
        updateRecord(tbl, values);
    }
    else if (values.GET) { //Create or Update based upon values
        log('GET');
        processRecord(tbl, values.item_id);
    }        
    else if (values.CREATE) { //Create or Update based upon values
        log('CREATE');
        createRecord(tbl, values);
    }
    else { //Read All Data if there is no operation defined
        queryAll();
    }
}

function queryAll() {
    var q = ClearBlade.Query({collectionName:tbl});
    //q.setPage(10000, 0)
    //q.columns(["<COLUMN_NAME_1>", "<COLUMN_NAME_2>"]);
    promiseQuery(q).then(function(r){
        //_resp.success(r);
        _resp.success(groupBy(r, 'id'))
    })
    .catch(function(err) {
        _resp.error(err);
    });
}

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

//Update an existing record
function updateRecord(tbl, values) {
    var query = ClearBlade.Query({collectionName:tbl});
    query.equalTo('edgeid', values.item_id);
    query.update(values, statusCallBack);
}

//Create a record
function createRecord(tbl, values) {
    var col = ClearBlade.Collection( {collectionName: tbl } );
    col.create(values, statusCallBack);
}

//Locate a recro by item_id
function findRecord(tbl, values) {
    _record=values; //Global for inner loop
    log("processRecord");
    var query = ClearBlade.Query({collectionName: tbl});
    query.equalTo('item_id', values.item_id);
    d = Q.defer();
	query.fetch(function(err, result) {
        if (err) {
            d.reject(new Error(err));
        } else {
            d.resolve(result.DATA);
        }
    });
    return d.promise;
}

//Shared Status Callback
var statusCallBack = function (err, data) {
    if (err) {
        log("error: " + JSON.stringify(data));
    	_resp.error(data);
    } else {
        log(data);
    	_resp.success(data);
    }
};

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

