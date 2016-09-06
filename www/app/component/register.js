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

        return defineComponent(register);

        function register() {
            this.defaultAttrs({
                usernameTemplate: usernameTemplate
            });

            this.registerNewAccount = function(){
                var username=document.getElementById('username').value;
                var password=document.getElementById('password').value;
                console.log('username: '+username+' password: '+password);
                if(username == ''){
                    alert('Please enter username');
                }
                else if(password == ''){
                    alert('Please enter password');
                }
                else if(window.localStorage.getItem(username)){
                    alert('Username has existed already!');
                }
                else{
                    var account={
                        'username': username,
                        'password': password,
                        'cart': []
                    };
                    window.localStorage.setItem(username,JSON.stringify(account));
                    window.sessionStorage.setItem('username',username);
                    console.log(JSON.parse(window.localStorage.getItem(username)));
                    alert('Register successfully');
                    //window.localStorage.setItem('loginStatus',true);
                    window.sessionStorage.setItem('loginStatus',true);
                    this.trigger('registerSuccessfully');
                }
                //window.localStorage.clear();
            };

            this.openUserPage=function(){
                if(window.sessionStorage.getItem('loginStatus')){
                    var data={'name': window.sessionStorage.getItem('username')};
                    var newUserPage=Mustache.render(usernameTemplate.username,data);
                    var div=document.getElementById('usernameContainer');
                    div.innerHTML=newUserPage;
                    window.location.href='index.html#userpage';
                }
            };

            this.after('initialize', function() {
                this.on('click', this.registerNewAccount);
                this.on('registerSuccessfully',this.openUserPage);
            });
        }
    }
);

