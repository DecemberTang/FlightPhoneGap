/**
 * Created by tangyue on 16/7/17.
 */
'use strict';

define(

    [
        'flight/lib/component',
        'bower_components/mustache/mustache',
        'app/productsData',
        '../template'
    ],

    function(defineComponent,Mustache,productsData,searchTemplate) {
        return defineComponent(search);

        function search() {

            this.defaultAttrs({
                searchTemplate: searchTemplate,
                productsData: productsData,

                searchButton: '.go'
            });

            this.getSearchInfo=function(){
                var pName = document.getElementById('search').value;
                var name = this.capitalize(pName);
                console.log(name);

                var getProduct=this.attr.productsData.productsDetails.filter(function(item){
                    return (item.productName == name);
                });
                console.log(getProduct);
                var data = {
                    result: getProduct
                };
                if(getProduct.length != 0){
                    var out = Mustache.render(searchTemplate.searchResult,data);
                    console.log(out);
                    this.select('searchResultContainerSelector').empty();
                    this.select('searchResultContainerSelector').html(out);
                    window.location.href = 'index.html#searchpage';
                }else{
                    console.log('Input search keyword');
                }

            };


            this.capitalize=function(data){
                var words = data.split(" ");
                for(var i = 0; i < words.length; i++) {
                    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                }
                return words.join(" ");
            };
            this.after("initialize", function() {
                this.on('click', {
                    searchButton: this.getSearchInfo
                });
            });
        }

    }
);
