'use strict';

define(

    [
      '../component/hi_world',
        '../component/login',
        '../component/search',
        '../component/products_data'


    ],

    function(
        HiWorld,
        Login,
        Search,
        ProductsData) {

      function initialize() {
          HiWorld.attachTo('.go');
          Login.attachTo('buttones');
          Search.attachTo('.gosf');
          ProductsData.attachTo(document,{
              itemContainerSelector: '#productDetails'
          });
      }

      return initialize;
    }
);
