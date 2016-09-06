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

    function(defineComponent,Mustache, shoppingCartTemplate) {

        return defineComponent(shoppingCart);

        function shoppingCart() {
            this.defaultAttrs({
                cartTemplate: shoppingCartTemplate,

                //selector:
                showCartSelector: '.cart'
            });

            this.getCart = function(){
                var name = window.sessionStorage.getItem('username');
                var s=0;
                for(var i=0; i<JSON.parse(window.localStorage.getItem(name)).cart.length; i++){
                    s+=JSON.parse(window.localStorage.getItem(name)).cart[i].productPrice;
                }
                var data ={
                    carts: JSON.parse(window.localStorage.getItem(name)).cart,
                    pCount: JSON.parse(window.localStorage.getItem(name)).cart.length,
                    sumPrice: s
                };
                //console.log(data.pCount);
                //console.log(data.sumPrice);
                var out = Mustache.render(shoppingCartTemplate.shoppingCart,data);
                //console.log(out);
                this.select('cartContainerSelector').html(out);

            };

            this.after('initialize', function() {
                this.on('click', {
                    showCartSelector:this.getCart
                });
            });
        }
    }
);