var geoModule = {
    eventTarget: function (){this._listeners={}}
        EventTarget.prototype={constructor:EventTarget,addListener:function(a,c){"undefined"==typeof this._listeners[a]&&(this._listeners[a]=[]);this._listeners[a].push(c)},fire:function(a){"string"==typeof a&&(a={type:a});a.target||(a.target=this);if(!a.type)throw Error("Event object missing 'type' property.");if(this._listeners[a.type]instanceof Array)for(var c=this._listeners[a.type],b=0,d=c.length;b<d;b++)c[b].call(this,a)},removeListener:function(a,c){if(this._listeners[a]instanceof Array)for(var b=
        this._listeners[a],d=0,e=b.length;d<e;d++)if(b[d]===c){b.splice(d,1);break}}}; var ET = new EventTarget();    
    },    
    init: function () {
    	"use strict";
        var GPS_AVAILABLE = 'GPS_AVAILABLE';
        var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE'; 
               
        debug_message("Controleer of GPS beschikbaar is...");

        ET.addListener(GPS_AVAILABLE, _start_interval);
        ET.addListener(GPS_UNAVAILABLE, function(){debug_message('GPS is niet beschikbaar.')});
        (geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);        
        console.log( "Testi" );
    }
};