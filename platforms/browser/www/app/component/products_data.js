
'use strict';

define(

    [
        'flight/lib/component',
        'bower_components/mustache/mustache',
        'app/productsData',
        'app/productsTemplate'
    ],

    function(defineComponent, Mustache, productsData,productsTemplate) {
        return defineComponent(composeBox);

        function composeBox() {

            this.defaultAttrs({
                productsData: productsData,
                productsTemplate: productsTemplate
            });
            this.renderProducts=function(){
                var s=this.attr.productsData.productsDetails[0];
                //console.log(s);
                return Mustache.render(productsTemplate.product,s);
            };
            this.serveItems = function() {
                this.trigger("dataMailItemsServed", {markup: this.renderProducts()})
            };
            this.renderItems=function(ev,data){
                this.select('itemContainerSelector').html(data.markup);
            };

            this.after("initialize", function() {
                this.on('click', this.serveItems);
                this.on('dataMailItemsServed', this.renderItems);
            });
        }

    }
);
