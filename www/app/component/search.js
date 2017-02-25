define(

    [
        'flight/lib/component',
        '../network_check',
        '../onlineConfig.js',
        '../configurationData'
    ],

    function (defineComponent,networkCheck,onlineConfigData, offlineConfigData){
        return defineComponent(login);

        function login(){

            this.attributes({
                buttonID: "#goButton"
            });
            var count=0;
            this.loginMethod= function () {
                console.log("*************************");
                console.log('localStorage: '+localStorage.length);
                console.log(localStorage);
                console.log(JSON.stringify(localStorage).length);
                var networkFlag = networkCheck.networkCheck();
                var option;
                if(networkFlag){
                    onlineConfigData.getEvents(function(data){
                        alert(data.clickButton.EventCollection);
                        option = {
                            eventType: 'clickButton',
                            isCollection: data.clickButton.EventCollection,
                            appId: '1',
                            appTitle: data.clickButton.AppTitle,
                            appVersionName: 'V2.0',
                            platform: 'iOS',
                            platformVersion: '4.0',
                            autoSubmitEvents: data.clickButton.AutoSubmit
                        };
                        count++;
                        alert("+++++"+option);
                        if(option.isCollection == "true"){
                            var manager=new MECManager(option);
                            console.log("Analytics initialized");
                            manager.collectEvent(option.eventType,'button_ID='+'buttonID'+'&click_count='+count,
                                'http://10.108.167.72:9763/endpoints/HttpReciever_20160511');
                            alert("success");
                        }
                    },25);
                }else{
                    option = offlineConfigData.configurationDetails[0];
                    alert("+++++"+option);
                    count++;
                    if(option.isCollection == "true"){
                        var manager=new MECManager(option);
                        console.log("Analytics initialized");
                        manager.collectEvent(option.eventType,'button_ID='+'buttonID'+'&click_count='+count,
                            'http://10.108.167.72:9763/endpoints/HttpReciever_20160511');
                        alert("success");
                    }
                }



            };
            this.clearStorage = function(){
                window.localStorage.clear();
            };

            this.after('initialize', function () {

                this.on('click',this.loginMethod);
                //this.on('click', this.clearStorage());
            });

        }

    });