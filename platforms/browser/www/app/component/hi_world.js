'use strict';

define(

    [
      'flight/lib/component',
      'bower_components/mustache/mustache',
      'http://172.27.35.4/www2/app/configurationData.js'
    ],

    function(defineComponent, Mustache, dataStore) {
      return defineComponent(composeBox);

      function composeBox() {

        this.defaultAttrs({
          configurationData: dataStore
        });

        this.testfunction=function(){
          alert(this.attr.configurationData.eventType[0]);
          console.log(this.attr.configurationData.eventType[0]);
          var options=this.attr.configurationData.configurationDetails[0];
          //console.dir(options);
        };
        this.networkCheck=function(){
          var networkState = navigator.connection.type;

          var states = {};
          states[Connection.UNKNOWN]  = 'Unknown connection';
          states[Connection.ETHERNET] = 'Ethernet connection';
          states[Connection.WIFI]     = 'WiFi connection';
          states[Connection.CELL_2G]  = 'Cell 2G connection';
          states[Connection.CELL_3G]  = 'Cell 3G connection';
          states[Connection.CELL_4G]  = 'Cell 4G connection';
          states[Connection.CELL]     = 'Cell generic connection';
          states[Connection.NONE]     = 'No network connection';

          alert('Connection type: ' + states[networkState]);
          alert(this.attr.configurationData.eventType[0]);
        };
        this.findID=function(event){
          var id=event.target.id;
          console.log(id);
        };
        this.cachetest=function(){
          var appCache = window.applicationCache;

          switch (appCache.status) {
            case appCache.UNCACHED: // UNCACHED == 0
              return 'UNCACHED';
              break;
            case appCache.IDLE: // IDLE == 1
              return 'IDLE';
              break;
            case appCache.CHECKING: // CHECKING == 2
              return 'CHECKING';
              break;
            case appCache.DOWNLOADING: // DOWNLOADING == 3
              return 'DOWNLOADING';
              break;
            case appCache.UPDATEREADY:  // UPDATEREADY == 4
              return 'UPDATEREADY';
              break;
            case appCache.OBSOLETE: // OBSOLETE == 5
              return 'OBSOLETE';
              break;
            default:
              return 'UKNOWN CACHE STATUS';
              break;
          };
        };
        this.after("initialize", function() {
          //this.on('click', this.networkCheck);
          //this.on('click',this.findID);
          this.on('click', this.testfunction);
        });
      }

    }
);
