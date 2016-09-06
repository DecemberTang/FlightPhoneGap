
'use strict';

define(

    [
        'flight/lib/component',
        'bower_components/mustache/mustache',
        'app/productsData',
        '../template'
    ],

    function(defineComponent, Mustache, productsData,productsTemplate) {
        return defineComponent(getProductDetail);

        function getProductDetail() {

            this.defaultAttrs({
                productsData: productsData,
                productsTemplate: productsTemplate,
                product: "",

                //selector:
                addToCartSelector: '#addToCart'
            });
            this.getProductID=function(event){
                var target=event.target;
                //console.log(target.id);
                //console.log('Classes: '+target.className);
                var getProduct=this.attr.productsData.productsDetails.filter(function(item){
                    return (item.productId == target.className);
                });
                //console.log(getProduct.length);
                if(getProduct.length != 0){
                    this.trigger("productServed", {markup: this.renderProducts(getProduct)});
                    this.attr.product=getProduct[0];
                }
            };
            this.renderProducts=function(data){
                console.log(data[0]);
                return Mustache.render(productsTemplate.productDetails,data[0]);
            };
            this.renderItems=function(ev,data){
                this.select('itemContainerSelector').html(data.markup);
            };

            this.addRequest=function(){
                var size=document.getElementById('size').value;
                console.log('size: '+size);
                if(window.sessionStorage.getItem('loginStatus') != 'true'){
                    alert('You need to login!');
                    window.location.href='index.html#loginPage';
                }else{
                    var name=window.sessionStorage.getItem('username');
                    console.log(name);
                    var newcart=JSON.parse(window.localStorage.getItem(name)).cart;
                    //console.log(newcart);
                    //console.log(this.attr.product.productPicture);
                    var addedProduct={
                        productId: this.attr.product.productId,
                        productName: this.attr.product.productName,
                        productPrice: this.attr.product.productPrice,
                        productPicture: this.attr.product.productPicture,
                        productSize: size
                    };
                    newcart.push(addedProduct);
                    //console.log('new cart: '+newcart[0].productId);
                    var temp=JSON.parse(window.localStorage.getItem(name));
                    console.log(temp);
                    temp.cart=newcart;
                    console.log('after adding: '+JSON.stringify(temp));
                    window.localStorage.setItem(name,JSON.stringify(temp));
                    alert('Add success');
                }
            };
            this.after("initialize", function() {
                this.on('click', this.getProductID);
                this.on('productServed', this.renderItems);
                //this.on('recordProductRequest',this.recordProduct);
                this.on('click', {
                    'addToCartSelector': this.addRequest
                });
            });
        }
    }
);

