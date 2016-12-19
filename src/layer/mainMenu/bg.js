/**
 * Created by hisham.javed on 1/12/15.
 */

Layer_MainMenu_BG = cc.Layer.extend({
    _className:"Layer_MainMenu_BG",
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // window size
        var size = cc.winSize;
        this.drawBg(size);
        this.drawMenu(size);
        return true;
    },
    drawBg:function(size){
        var sprite = new cc.Sprite(res.splash450X800);
        sprite.attr({
            x: 0,
            y: 0,
            anchorX: 0,
            anchorY: 0
        });
        this.addChild(sprite);
    },
    drawMenu:function(size){
        //5.
        cc.MenuItemFont.setFontSize(60);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.btnPlayUp), // normal state image
            new cc.Sprite(res.btnPlayDown), // select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(cc.p(size.width/2,size.height/2-250));
        this.addChild(menu);
    },
    onPlay : function(){
        var scene = new scenes.Stage1();
        cc.director.pushScene(scene);
    }
});