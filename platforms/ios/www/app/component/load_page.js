/**
 * Created by tangyue on 16/6/26.
 */
'use strict';

define(

    [
        'flight/lib/component',
        'http://localhost/configurationData.js',
        '../configurationData',
        '../network_check',
    ],

    function(defineComponent,online,offline,networkCheck) {
        return defineComponent(loadPage);

        function loadPage() {

            this.defaultAttrs({

            });

            this.loadPage=function(){
                console.log('window.onload');
                var networkFlag = networkCheck.networkCheck();
                var option;
                if(networkFlag){
                    option = online.configurationDetails[1];
                }else{
                    option = offline.configurationDetails[1];
                }
                //var option = offline.configurationDetails[1];
                console.log(option);
                var manager=new MECManager(option);
                console.log("Analytics initialized");
                manager.collectEvent(option.eventType,'timestamp='+new Date().toISOString(),
                    'http://10.108.167.72:9763/endpoints/HttpReciever_20160511');
                alert("success");
            };
            this.after("initialize", function() {
                this.loadPage();
            });
        }

    }
);
