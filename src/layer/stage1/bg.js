/**
 * Created by hisham.javed on 1/12/15.
 */

Layer_Stage1_BG = cc.Layer.extend({
    _className:"Layer_Stage1_BG",
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // window size
        var size = cc.winSize;
        this.drawBg(size);

        return true;
    },
    drawBg:function(size){
        var y=0;
        var x=0;
        for(var i=0;i<size.height/64;i++){
            x=0;
            for(var j=0;j<size.width/64;j++){
                var sprite = new cc.Sprite(res.bgGrass64X64);
                sprite.attr({
                    x: x,
                    y: y,
                    anchorX: 0,
                    anchorY: 0
                });
                this.addChild(sprite);
                x+=64;
            }
            y+=64;
        }
    }
});