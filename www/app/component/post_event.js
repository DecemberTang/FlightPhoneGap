define(

    [
        'flight/lib/component',
        'http://localhost/configurationData.js',
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
                console.log("*************************");
                console.log('localStorage: '+localStorage.length);
                console.log(localStorage);
                console.log(JSON.stringify(localStorage).length);
                var option = offline.configurationDetails[1];
                console.log(option);
                count++;
                var manager=new MECManager(option);
                console.log("Analytics initialized");
                manager.collectEvent(option.eventType,'timestamp='+new Date().toISOString(),
                    'http://10.108.167.72:9763/endpoints/HttpReciever_20160511');
                alert("success");

            };
            this.clear = function(){
                window.localStorage.clear();
            };

            this.after('initialize', function () {

                this.on('click',this.loginMethod);
                //this.on('click', this.clear);
            });

        }

    });