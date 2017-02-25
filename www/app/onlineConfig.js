/**
 * Created by tangyue on 16/11/9.
 */
'use strict';

define(function(){
    var eventsData={};
    var events = {
        getEvents: function(fn,appid){
            console.log(eventsData.length == undefined);
            if(eventsData.length != undefined){
                fn(eventsData);
                return;
            }
            if(!navigator.onLine){
                var data = window.localStorage.getItem('eventConfig');
                console.log(JSON.parse(data));
                fn(JSON.parse(data));
            }else{
                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8080/Demo/GetEventsByIdservlet?idapp='+appid,
                    success: function(data){
                        console.log(data);
                        window.localStorage.setItem('eventConfig',JSON.stringify(data));
                        eventsData = data;
                        console.log('online');
                        fn(eventsData);
                    },
                    error: function(){
                        console.log('offline');
                    }
                });
            }
        }
    };

    return events;
});