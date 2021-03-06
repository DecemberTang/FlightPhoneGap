    /**
     * Created by tangyue on 16/5/22.
     */
    /**
     * @name MECManager
     * @namespace MECManager
     * @constructor
     */
//define(function(require, exports, module){
//
//});
    'use strict';

    /**
     * @lends MECManager
     * @property {string}   [appId=] - The Application ID
     * @property {boolean}  [autoSubmitEvents=true] - Automatically Submit Events, Default: true
     * @property {number}   [autoSubmitInterval=5000] - Interval to try to submit events in ms,
     *                                                                     Default: 5s
     * @property {number}   [eventStoreTime=100] - if autoSubmitEvent is false, event would be stored,
     *                                          this property is the time that event would be stored，default: 86400s, 1 day
     * @property {MECManager.submitCallback}  [submitCallback=] - Callback function that is executed when events are
     *                                                            successfully submitted
     * @property {MECManager.attributes}      [attributes=] - Attribute to be applied to every event, may be
     *                                                              overwritten with a different value when recording events.
     * @property {string}   [appTitle=] - The title of your app. For example, My App.
     * @property {string}   [appVersionName=] - The version of your app. For example, V2.0.
     * @property {string}   [platform=] - The operating system of the device. For example, iPhoneOS.
     * @property {string}   [plaformVersion=] - The version of the operating system of the device.
     *                                                            For example, 4.0.4.
     */
    function MECManager(options){
        console.log('MECManager constructor]'+' options '+JSON.stringify(options));
        this.options=options;
        if(options.appId === ''){
            console.error("MECManager must be initialized with an appId");
        }
        if(options.platform === undefined){
            console.error("MECManager must be initialized with an platform");
        }

        this.options.autoSubmitEvents = options.autoSubmitEvents;
        this.options.autoSubmitInterval = options.autoSubmitInterval || 2000;
        this.options.eventStoreTime = options.eventStoreTime || 86400000;
        this.options.eventStoreMaxLength = options.eventStoreMaxLength || 5;
        this.options.appTitle = options.appTitle || "DefaultApp";
        this.options.appVersionName = options.appVersionName || "V1.0";
        this.options.platformVersion = options.platformVersion || "V0.0";
        this.options.appId = options.appId || "default00";
        this.options.platform = options.platform || "default Platform: iOS";
    }

    /**
     * MECManager.validateEvent
     *
     */
    MECManager.prototype.validateEvent=function(event){
        console.log('[function: MECManager.validateEvent'+JSON.stringify(event));
        alert('【事件配置模块】获取事件配置信息: '+JSON.stringify(event));
        function test(){
            //alert('in test');
        }
        if(typeof event.attributes == 'string'){
            var customAttributes=event.attributes.split('&');
            for(var i=0; i<customAttributes.length; i++){
                if(customAttributes[i].indexOf('=')>0){
                    var item=customAttributes[i].split('=');
                    console.log(item);
                    if(attributesNameErrorFilter(item[0])){
                        validationError('Event Attribute names must be 1-50 characters');
                    }
                    if(attributesValueErrorFilter(item[1])){
                        validationError('Event Attribute values cannot be longer than 200 characters');
                    }
                }
                else{
                    console.warn('the format of attributes should be a=b');
                }
            }
        }
        function validationError(errorMsg){
            console.error(errorMsg);
            return null;
        }
        function attributesNameErrorFilter(name){
            if(name.length === 0){
                return true;
            }
            return name.length>50;
        }
        function attributesValueErrorFilter(name){
            return event.attributes[name] && event.attributes[name].length>200;
        }
        if(typeof event.eventType !== 'string'){
            validationError('Event Type must be string!');
        }
        if(typeof event.attributes == 'object'){
            if(Object.keys(event.attributes).filter(attributesNameErrorFilter).length){
                validationError('Event Attribute names must be 1-50 characters');
            }
            if(Object.keys(event.attributes).filter(attributesValueErrorFilter).length){
                validationError('Event Attribute values cannot be longer than 200 characters');
            }
        }
        //if(event.version !== 'v1.0'){
        //    validationError('Event Version must be v1.0');
        //}
        //if(Object.keys(event.attributes).filter(attributesNameErrorFilter).length){
        //    validationError('Event Attribute names must be 1-50 characters');
        //}
        //if(Object.keys(event.attributes).filter(attributesValueErrorFilter).length){
        //    validationError('Event Attribute values cannot be longer than 200 characters');
        //}
        return event;
        //return this.prepareEvent(event,URL);
    };

    /**
     * MECManager.createEvent
     *
     */
    MECManager.prototype.createEvent=function(eventType,attributes,URL){
        //alert('[Function: MECManager.createEvent]'+' eventType: '+eventType
        //    +' '+attributes);
        var that=this;
        attributes=attributes || undefined;
        if(typeof attributes == 'object'){
            console.log('[Function: MECManager.createEvent]'+' eventType: '+eventType
                +' attributes '+JSON.stringify(attributes));
            Object.keys(attributes).forEach(function (name){
                if(typeof attributes[name] !== 'string'){
                    try{
                        attributes[name]=JSON.stringify(attributes[name]);
                    }catch(e){
                        that.console.warn('Error parsing attribute ' + name);
                    }
                }
            });
        }
        if(typeof attributes == 'string'){
            console.log('[Function: MECManager.createEvent]'+' eventType: '+eventType
                +' '+attributes);
            var customAttributes=attributes.split('&');
            console.log(customAttributes);
        }
        var event={
            eventType: eventType,
            timestamp: new Date().toISOString(),
            appVersion: this.options.appVersionName,
            appID: this.options.appId,
            platform: this.options.platform,
            platformVersion: this.options.platformVersion,
            appTitle: this.options.appTitle,
            attributes: attributes
        };
        return this.validateEvent(event,URL);
    };

    /**
     * MECManager.collectEvent
     *
     */
    MECManager.prototype.collectEvent=function(eventType,attributes,URL){
        //console.log('[Function: MECManager.collectEvent]'+' eventType: '+eventType
        //            +' attributes '+JSON.stringify(attributes));
        alert('【事件监听模块】监听事件: '+' eventType: '+eventType);
        alert('联网为: '+navigator.onLine);
        console.log('[Function: MECManager.collectEvent]'+' eventType: '+eventType
            +' '+attributes);
        var event=this.createEvent(eventType,attributes,URL);
        console.log("this.options.autoSubmitEvents: "+this.options.autoSubmitEvents);
        alert("【事件记录模块】查看 autoSubmitEvents 属性为: "+this.options.autoSubmitEvents);
        if(!navigator.onLine){
            this.storeEvent(event,URL);
        }else{
            if(this.options.autoSubmitEvents === "true"){
                this.submitEvent(event,URL);
            }else{
                //var storeCount=this.storeEvent(event,URL);
                this.storeEvent(event,URL);
                var storeCount  = window.localStorage.length;
                //if(JSON.stringify(localStorage).length >= this.options.eventStoreMaxLength){
                //    this.readyEventSubmit(URL);
                //}
                if(storeCount >= this.options.eventStoreMaxLength){
                    this.readyEventSubmit(URL);
                }
            }
        }
    };
    MECManager.prototype.prepareEvent=function(event, URL){
        console.log("this.options.autoSubmitEvents: "+this.options.autoSubmitEvents);
        //alert("this.options.autoSubmitEvents: "+this.options.autoSubmitEvents);
        if(this.options.autoSubmitEvents === true){
            this.submitEvent(event,URL);
        }else{
            var storeCount=this.storeEvent(event,URL);
            //if(JSON.stringify(localStorage).length >= this.options.eventStoreMaxLength){
            //    this.readyEventSubmit(URL);
            //}
            if(storeCount >= this.options.eventStoreMaxLength){
                this.readyEventSubmit(URL);
                //count = 0;
            }
        }

    };
    /**
     * MECManager.submitEvent
     */
    MECManager.prototype.submitEvent=function(event,URL){
        console.log('[Function: MECManager.submitEvent]');
        var eventData=JSON.stringify(event);
        alert('【事件传输模块】传输事件: '+eventData);
        var req;
        function createRequest(){
            if(window.XMLHttpRequest){
                req=new XMLHttpRequest();
            }
            else if(window.ActiveXObject){
                req=new ActiveXObject("Microsoft.XMLHttp");
            }
            if(req){
                console.log(JSON.stringify(event));
                req.open("POST",URL,true);
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
                req.onreadystatechange=submitCallback;
                req.send(eventData);
            }
        }
        function submitCallback(){
            if(req.readyState==4){
                if(req.status==200){
                    console.log("success");
                }
                else{
                    console.log("status: "+req.status+ " "+req.readyState);
                }
            }
            else{
                console.log("status: "+req.status+ " "+req.readyState);
            }
        }
        console.log("this.options.autoSubmitInterval: "+this.options.autoSubmitInterval
            +" typeof is: "+typeof this.options.autoSubmitInterval);
        window.setTimeout(createRequest,this.options.autoSubmitInterval);
    };

    /**
     * MECManager.storeEvent
     */
    //var count=0;
    MECManager.prototype.storeEvent=function(event,URL){
        console.log('[Function MECManager.storeEvent]'+JSON.stringify(event));
        alert('【事件存储模块】 存储事件: '+JSON.stringify(event));
        if(typeof localStorage === 'object'){
            try{
                localStorage.setItem('TestStorage','1');
                localStorage.removeItem('TestStorage');
            }catch(e){
                console.warn('Your web browser does not support storing settings locally. In Safari, ' +
                    'the most common cause of this is using "Private Browsing Mode". ' +
                    'Some settings may not save or some features may not work properly for you.');
            }
        }
        var eventStorageKey='MECStorageKey-'+event.timestamp+'-'+event.eventType;

        console.log('eventStorageKey: '+eventStorageKey);
        try{
            window.localStorage.setItem(eventStorageKey,JSON.stringify(event));
            //window.localStorage.setItem(localStorage.length+'',eventStorageKey);
            //window.localStorage.setItem((++count) +'',eventStorageKey);
        }catch(saveToLocalStorageError){
            console.log('Error saving to LocalStorage: ' + JSON.stringify(saveToLocalStorageError));
            this.submitEvent(event,URL);
        }
        //return count;
    };
    /**
     * MECManager.readyEventSubmit
     */
    MECManager.prototype.readyEventSubmit=function(URL){
        console.log('[Function MECManager.readyEventSubmit');

        for(var key in localStorage){
            if(/MECStorageKey/.test(key)){
                var storedEvent = JSON.parse(localStorage.getItem(key));
                window.localStorage.removeItem(key);
                this.submitEvent(storedEvent,URL);
            }
        }

    };
    /**
     * MECManager.dataFormatting
     */
    MECManager.prototype.dataFormatting = function(events){
        console.log('dataFormatting');
        //idapp=25,AppTitle=Store&userid=26,AutoSubmit=false
        var string = '';
        for(var prop in events){
            for(var key in events[prop]){
                string+=key+':'+events[prop][key]+',';
            }
            string+='@';
        }
        console.log(string);
        return string;
    };
    /**
     * MECManager.eventConfig
     */
    MECManager.prototype.eventConfig = function(e,userid,appid){
        var config = this.dataFormatting(e);
        var URL = 'http://localhost:8080/Demo/CreateEventConfigservlet';
        var event = {
            eventConfig: config,
            userid: userid,
            idapp: appid
        };
        var data = (function(obj){ // 转成post需要的字符串.
            var str = "";

            for(var prop in obj){
                str += prop + "=" + obj[prop] + "&"
            }
            return str;
        })(event);
        console.log(data);
        window.localStorage.setItem('eventConfig',JSON.stringify(e));
        request();
        var req;
        function request(){
            if(window.XMLHttpRequest){
                req=new XMLHttpRequest();
            }
            else if(window.ActiveXObject){
                req=new ActiveXObject("Microsoft.XMLHttp");
            }
            if(req){
                req.open("POST",URL,true);
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
                req.onreadystatechange=submitCallback;
                req.send(data);
            }
        }
        function submitCallback(){
            if(req.readyState==4){
                if(req.status==200){
                    console.log("事件远端配置成功");
                    console.log(req.responseText);
                }
                else{
                    console.log("status: "+req.status+ " "+req.readyState);
                }
            }
            else{
                console.log("status: "+req.status+ " "+req.readyState);
            }
        }
    };



