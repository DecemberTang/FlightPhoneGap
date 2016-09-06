'use strict';

define(

    [
      'http://localhost/configurationData.js',
      'app/configurationData'
    ],

    function(onlineConfigData, offlineConfigData) {
        var config = {
            networkCheck: function(){
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
                alert('networkState: ' + networkState);
                if(networkState == 'none' || networkState == 'unknown'){
                  alert('offline status '+offlineConfigData.eventType[0]);
                  return offlineConfigData;
                }
                else{
                  alert('online status '+onlineConfigData.eventType[0]);
                  return onlineConfigData;
                }
            }
        };

      return config;

    }
);
