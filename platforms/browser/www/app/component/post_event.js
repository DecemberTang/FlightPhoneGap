/**
 * Created by tangyue on 16/5/19.
 */
define(function (require){
    var defineComponent=require('flight/lib/component');
    return defineComponent(postevent);
    function postevent(){
        this.attributes({

        });
        this.eventSend=function(event,data){
            var eventData=JSON.stringify(data);
            console.dir(eventData);
            var req;
            function createRequest(){
                if(window.XMLHttpRequest){
                    req=new XMLHttpRequest();
                }
                else if(window.ActiveXObject){
                    req=new ActiveXObject("Microsoft.XMLHttp");
                }
                if(req){
                    req.open("POST","http://10.108.167.72:9763/endpoints/HttpReciever_20160511",true);
                    req.onreadystatechange=check;
                    req.send(eventData);
                }


            }
            function check(){
                if(req.readyState==4){
                    if(req.status==200){
                        console.log("success");
                    }
                    else{
                        console.log("status: "+req.status+ " "+req.readyState);
                    }
                }
            }
            createRequest();
        }
        this.after('initialize', function () {

            this.on('sendEvent',this.eventSend);

        });
    }

});