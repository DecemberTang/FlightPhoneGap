/**
 * Created by tangyue on 16/6/26.
 */
'use strict';

define(

    [
        'flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(composeBox);

        function composeBox() {

            this.defaultAttrs({

            });

            this.freshPage=function(){
                window.location.reload();
            };
            this.after("initialize", function() {
                this.on('click', this.freshPage);
                //this.on('click',this.findID);
                //this.on('click', this.testfunction);
            });
        }

    }
);
