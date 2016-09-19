/**
 * Created by tangyue on 16/6/12.
 */

'use strict';

define(
    function(){
        return {
            eventType: ['clickButton','openApp'],

            configurationDetails: [
                {
                    eventType: 'clickButton',
                    isCollection: true,
                    appId: '1',
                    appTitle: 'Store',
                    appVersionName: 'V2.0',
                    platform: 'iOS',
                    platformVersion: '4.0',
                    autoSubmitEvents: true,
                    eventStoreTime: 300000
                },
                {
                    eventType: 'openApp',
                    isCollection: true,
                    appId: '1',
                    appTitle: 'Store',
                    appVersionName: 'V2.0',
                    platform: 'iOS',
                    platformVersion: '4.0',
                    autoSubmitEvents: true,
                    eventStoreTime: 300000
                }
            ]
        };
        return data;
    }
);