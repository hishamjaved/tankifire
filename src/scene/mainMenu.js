/**
 * Created by hisham.javed on 1/12/15.
 */
scenes.MainMenu= cc.Scene.extend({
    _className:"Scene_MainMenu",
    onEnter:function () {
        this._super();
        if(!this.initialized){
            var layer = new Layer_MainMenu_BG();
            this.addChild(layer);
            this.initialized=true;
        }
    }
});