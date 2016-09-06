/**
 * Created by tangyue on 16/6/28.
 */

'use strict';

define(
    [
        'flight/lib/component'
    ],

    function(defineComponent) {

        return defineComponent(user);

        function user() {
            this.defaultAttrs({

            });

            this.checkLoginStatus = function(){
                console.log('loginStatus: '+window.sessionStorage.getItem('loginStatus'));
                console.log(window.sessionStorage.getItem('loginStatus') == 'true');
                if(window.sessionStorage.getItem('loginStatus') == 'true'){
                    window.location.href='index.html#userpage';
                }
                else{
                    window.location.href='index.html#loginPage';
                }
            };

            this.after('initialize', function() {
                this.on('click', this.checkLoginStatus);
            });
        }
    }
);