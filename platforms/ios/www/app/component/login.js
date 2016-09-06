/**
 * Created by tangyue on 16/6/28.
 */

'use strict';

define(
    [
        'flight/lib/component',
        'bower_components/mustache/mustache',
        '../template'
    ],

    function(defineComponent,Mustache,usernameTemplate) {

        return defineComponent(loginAccount);

        function loginAccount() {
            this.defaultAttrs({
                usernameTemplate: usernameTemplate
            });

            this.loginRequest = function(){
                var username=document.getElementById('username0').value;
                var password=document.getElementById('password0').value;
                console.log('username: '+username+' password: '+password);
                console.log(JSON.parse(window.localStorage.getItem(username)));
                if(window.localStorage.getItem(username)){
                    var storedPassword=JSON.parse(window.localStorage.getItem(username)).password;
                    if(storedPassword == password){
                        console.log('success');
                        window.sessionStorage.setItem('loginStatus',true);
                        window.sessionStorage.setItem('username',username);
                        var data={'name': window.sessionStorage.getItem('username')};
                        var newUserPage=Mustache.render(usernameTemplate.username,data);
                        var div=document.getElementById('usernameContainer');
                        div.innerHTML=newUserPage;
                        window.location.href='index.html#userpage';
                    }
                    else{
                        alert('Wrong password!');
                    }
                }
                else{
                    alert('Username is not existed');
                }

            };

            this.after('initialize', function() {
                this.on('click', this.loginRequest);
            });
        }
    }
);