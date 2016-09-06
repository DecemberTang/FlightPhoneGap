'use strict';

define(

    [
        '../component/login',
        '../component/search_products',
        '../component/products_data',
        '../component/register',
        '../component/user',
        '../component/logout',
        '../component/shopping_cart',
        '../component/post_event'
    ],

    function(
        Login,
        Search,
        ProductsData,
        Register,
        User,
        Logout,
        ShoppingCart,
        PostEvent) {

      function initialize() {
          Login.attachTo('.loginButton');
          Search.attachTo(document,{
              searchResultContainerSelector: '.searchContainer'
          });
          ProductsData.attachTo(document,{
              itemContainerSelector: '#productDetails'
          });
          Register.attachTo('#register-btn');
          User.attachTo('.user');
          Logout.attachTo('#logout');
          ShoppingCart.attachTo(document,{
              cartContainerSelector: '.addedProducts'
          });
          PostEvent.attachTo('.go');
      }

      return initialize;
    }
);
