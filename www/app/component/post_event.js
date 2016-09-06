define(

    [
        'flight/lib/component',
        '../network_check'
    ],

    function (defineComponent,networkCheck){
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
                var option = networkCheck.networkCheck();
                var options={
                    appId: '1',
                    appTitle: 'testApp',
                    appVersionName: 'V2.0',
                    platform: 'ios',
                    platformVersion: '4.0',
                    autoSubmitEvents: false,
                    eventStoreTime: 300000
                };
                count++;
                //localStorage.clear();
                var manager=new MECManager(option);
                console.log("Analytics initialized");
                manager.recordEvent('clickButton','button_ID='+'buttonID'+'&click_count='+count,
                    'http://10.108.167.72:9763/endpoints/HttpReciever_20160511');
                alert("success");

            };

            this.after('initialize', function () {

                this.on('click',this.loginMethod);
                //this.on('click', this.dosomething);
            });

        }

    });