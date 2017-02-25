define(

    [
        'flight/lib/component',
        '../onlineConfig.js',
        '../configurationData'
    ],

    function (defineComponent,online,offline){
        return defineComponent(login);

        function login(){

            this.attributes({
                buttonID: "#goButton"
            });
            var count=0;
            this.loginMethod= function () {
                //localStorage.clear();
                console.log("*************************");
                console.log('localStorage: '+localStorage.length);
                //console.log(localStorage);
                console.log(JSON.stringify(localStorage).length);
                var option = offline.configurationDetails[1];
                var events = online.getEvents(function(data){
                    console.log("*************************"+data.openApp.AppTitle);
                    count++;
                    var parameters = {
                        eventType: 'ClickSearchButton',
                        isCollection: data.ClickSearchButton.EventCollection,
                        appId: '1',
                        appTitle: data.ClickSearchButton.AppTitle,
                        appVersionName: 'V2.0',
                        platform: 'iOS',
                        platformVersion: '4.0',
                        autoSubmitEvents: data.ClickSearchButton.AutoSubmit,
                        eventStoreTime: data.ClickSearchButton.EventStoredTime
                    };
                    console.log(parameters.isCollection=="true");
                    if(parameters.isCollection == "true"){
                        var manager=new MECManager(parameters);
                        console.log("Analytics initialized");
                        manager.collectEvent(parameters.eventType,'button_ID='+'buttonID'+'&click_count='+count,
                            'http://10.108.167.72:9763/endpoints/HttpReciever_20160511');
                        alert("success");
                    }
                },25);


            };
            this.eventCreateAndUpdateToServerTest = function(){
                var parameters = {
                    eventType: 'ClickSearchButton',
                    isCollection: true,
                    appId: '1',
                    appTitle: 'testAPP',
                    appVersionName: 'V2.0',
                    platform: 'iOS',
                    platformVersion: '4.0',
                    autoSubmitEvents: true,
                    eventStoreTime: 5
                };
                var manager=new MECManager(parameters);
                var events = {
                    openApp222: {
                        idapp: "25",
                        AppTitle: "Store",
                        EventType: "openApp222",
                        EventCollection: "true",
                        userid: "26",
                        AutoSubmit: "true"
                    },
                    clickEvent1:{
                        idapp: "25",
                        AppTitle: "Store",
                        EventType: "clickEvent1",
                        EventCollection: "true",
                        userid: "26",
                        AutoSubmit: "true"
                    }

                };
                manager.eventConfig(events,26,25);
            };

            this.after('initialize', function () {

                this.on('click',this.loginMethod);
                //this.on('click', this.eventCreateAndUpdateToServerTest);
            });

        }

    });