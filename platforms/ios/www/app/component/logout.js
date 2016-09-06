/**
 * Created by tangyue on 16/6/29.
 */
'use strict';

define(
    [
        'flight/lib/component'
    ],

    function(defineComponent) {

        return defineComponent(logout);

        function logout() {
            this.defaultAttrs({

            });

            this.logoutAccount = function(){
                window.sessionStorage.setItem('loginStatus',false);
                //window.location.href='index.html#loginPage';
            };

            this.after('initialize', function() {
                this.on('click', this.logoutAccount);
            });
        }
    }
);