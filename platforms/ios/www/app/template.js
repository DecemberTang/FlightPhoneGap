/**
 * Created by tangyue on 16/6/14.
 */
'use strict';

define(
    function() {
        var productDetails1 =
            '<p class="product-details">价格：&#65509;<span>{{productPrice}}</span></p>\
             <img class="product-image" src="{{productPicture}}">\
             <p class="product-description">{{productDescription}}</p>\
             <label class="product-description">尺码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数量:</label>\
             <div>\
                <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all">\
                    <div class="ui-controlgroup-controls ">\
                        <div class="ui-select">\
                            <div id="size-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow ui-first-child">\
                                <span>S</span>\
                                <select name="size" id="size">\
                                    <option value="S">S</option>\
                                    <option value="M">M</option>\
                                    <option value="L">L</option>\
                                </select>\
                            </div>\
                        </div>\
                        <div class="ui-select">\
                            <div id="quantity-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow ui-last-child">\
                                <span>1</span>\
                                <select name="quantity" id="quantity">\
                                    <option value="one">1</option>\
                                    <option value="two">2</option>\
                                    <option value="three">3</option>\
                                    <option value="four">4</option>\
                                </select>\
                            </div>\
                        </div>\
                    </div>\
                </fieldset>\
             </div>\
             <div class="ui-btn ui-input-btn ui-corner-all ui-shadow ui-btn-inline">加入购物车\
                <input class="checkoutButton" type="submit" data-inline="true" value="加入购物车">\
            </div>';

        var productDetails =
            '<p class="product-details">{{productName}}:&nbsp;&#65509;<span>{{productPrice}}</span></p>\
             <img class="product-image" src="{{productPicture}}">\
             <p class="product-description">{{productDescription}}</p>';

        var username =
            '<div class="username">欢迎 {{name}}！</div>';

        var shoppingCart =
            '<p class="content">我的购物车&nbsp;<span id="shoppingNum">{{pCount}}</span></p>\
            <div class="line1"></div>\
            <br>\
            <ul>\
                {{#carts}}\
                <li class="products">\
                    <img class="small-image" src="{{productPicture}}">\
                    <div>\
                        <p>{{productName}}</p>\
                        <p>价格<span>&#65509;{{productPrice}}</span></p>\
                        <p>尺码：<span>{{productSize}}</span></p>\
                    </div>\
                </li>\
                {{/carts}}\
            </ul>\
            <br>\
            <div class="line1"></div>\
            <br>\
            <p>总价：&#65509;{{sumPrice}}</p>';

        var searchResult =
            '<ul>\
                {{#result}}\
                <li class="products" id="{{productId}}">\
                    <img class="small-image" src="{{productPicture}}">\
                    <div>\
                        <p>{{productName}}</p>\
                        <p>价格<span>&#65509;{{productPrice}}</span></p>\
                        <p>{{productDescription}}</p>\
                    </div>\
                </li>\
                {{/result}}\
            </ul>';

        return {
            productDetails1: productDetails1,
            productDetails: productDetails,
            username: username,
            shoppingCart: shoppingCart,
            searchResult: searchResult
        }
    }

);
