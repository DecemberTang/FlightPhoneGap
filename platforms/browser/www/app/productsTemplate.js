/**
 * Created by tangyue on 16/6/14.
 */
'use strict';

define(
    function() {
        var products =
            '<div id="test2">\
              <p>{{productName}}</p>\
              <p>{{productPrice}}</p>\
              <p>{{productDescription}}</p>\
            </div>';

        var product =
            '<p class="product-details">价格：&#65509;<span>{{productPrice}}</span></p>\
             <img class="product-image" src="{{productPicture}}">\
             <p class="product-description">{{productDescription}}</p>\
             <label class="product-description">尺码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数量:</label>\
             <div>\
                <fieldset data-role="controlgroup" data-type="horizontal">\
                    <select name="size" id="size">\
                        <option value="S">S</option>\
                        <option value="M">M</option>\
                        <option value="L">L</option>\
                    </select>\
                    <select name="quantity" id="quantity">\
                        <option value="one">1</option>\
                        <option value="two">2</option>\
                        <option value="three">3</option>\
                        <option value="four">4</option>\
                    </select>\
                </fieldset>\
             </div>\
            <input class="checkoutButton" type="submit" data-inline="true" value="加入购物车">';

        return {
            products: products,
            product: product
        }
    }

);
