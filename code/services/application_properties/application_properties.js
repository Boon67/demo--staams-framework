function application_properties(req, resp){
    app_props={};
    app_props.mapbox_api_key="pk.eyJ1IjoicnJlaW5vbGQiLCJhIjoiY2lwOTllOGQ2MDB4Y2VhbnJnMWtzcW9qaiJ9.1mNTDQ5rwabgUL9onzaLxg";
    app_props.initialCenter=[-104.99,39.7392];
    app_props.initialzoom=8.1;
    app_props.minzoom=3.0;
    //app_props.mapboxstyle="mapbox://styles/boon67/cjax1xp8bngjq2soch8dqpg98"; //Decimal Style
    //app_props.mapboxstyle="mapbox://styles/boon67/cjax2ctrm2sjy2spapplotgeo"; //Large rail style
    app_props.mapboxstyle="mapbox://styles/mapbox/satellite-v9";
    //app_props.mapboxstyle="mapbox://styles/mapbox/cj3kbeqzo00022smj7akz3o1e";
    app_props.layers=[{"id":"Well Sites",
                        "type":"circle",
                        "source":{"type":"vector","url":"mapbox://boon67.4w0s1qz3"},
                        "source-layer":"Wells-5urq4x",
                        "paint": {
                            'circle-radius': {
                              "base": 5,
                              "stops": [[0, 2], [12, 3], [15, 5]]
                            },
                            //"circle-color": "#00FF00"
                            'circle-color': [
                            'match',
                            ['get', 'Facil_Stat'],
                            'PR', '#00FF00',
                            'PA', '#CCCCCC',
                            'DA', '#CCCCCC',
                            'TA', '#CCCCCC',
                            'AL', '#CCCCCC',
                            'SI', '#C1666B',
                            /* other */ '#FF0000'
                        ]
                            }
                        },
        
                        {"id":"Railroad Crossings",
                        "type":"circle",
                        "source":{"type":"vector","url":"mapbox://boon67.cwbr74tb"},
                        "source-layer":"Railroad_Crossings-82xlwy",
                        "paint": {
                            'circle-radius': {
                              "base": 1,
                              "stops": [[0, 1], [12, 2], [15, 10]]
                            },
                            //"circle-color": "#EE7600"
                            'circle-color': [
                            'match',
                            ['get', 'RAILROAD'],
                            'UP', '#C1666B',
                            'BNSF', '#EE00EE',
                            'KCS', '#B18FCF',
                            'CSX', '#00FFF0',
                            'CTA', '#FF0000',
                            'NIRC', '#1B3B6F',
                            /* other */ '#AAAAAA'
                        ]
                            }
                        },
                        {"id":"Rail Lines",
                        "type":"line",
                        "source":{"type":"vector","url":"mapbox://boon67.0gkwyeju"},
                        "source-layer":"Railroad_Lines-3khv67",
                        "layout":{"line-join":"round","line-cap":"round"},
                        "paint":{
                            'line-color': [
                            'match',
                            ['get', 'RROWNER1'],
                            'UP', '#C1666B',
                            'BNSF', '#EE00EE',
                            'KCS', '#B18FCF',
                            'CSXT', '#00FFF0',
                            'CTA', '#FF0000',
                            'NIRC', '#1B3B6F',
                            /* other */ '#CCCCCC'
                        ],
                            "line-width": {
                               "base": 1,
                               "stops": [
                                [0, 6],
                                [12, 2],
                                [22, 1]
                              ]
                                }
                            }                       
                        },
                        /*{
                            'id': '3d-buildings',
                            'source': 'composite',
                            'source-layer': 'building',
                            'filter': ['==', 'extrude', 'true'],
                            'type': 'fill-extrusion',
                            'minzoom': 15,
                            'paint': {
                                'fill-extrusion-color': '#aaa',
                    
                                // use an 'interpolate' expression to add a smooth transition effect to the
                                // buildings as the user zooms in
                                'fill-extrusion-height': [
                                    "interpolate", ["linear"], ["zoom"],
                                    15, 0,
                                    15.05, ["get", "height"]
                                ],
                                'fill-extrusion-base': [
                                    "interpolate", ["linear"], ["zoom"],
                                    15, 0,
                                    15.05, ["get", "min_height"]
                                ],
                                'fill-extrusion-opacity': .6
                            }
                        }, */
                        ];
    
    resp.success(app_props);
}


