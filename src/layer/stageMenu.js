/**
 * Created by hisham.javed on 1/12/15.
 */

Layer_StageMenu = cc.Layer.extend({
    _className:"Layer_StageMenu",
    actions:{
        resume:true
    },
    ctor:function (collisionLayer) {
        var me = this;
        //////////////////////////////
        // 1. super init first
        me._super();

        /////////////////////////////

        // window size
        me.size = cc.winSize;

        //Set Collision Layer
        me.collisionLayer = collisionLayer;
        me.collisionLayer.actions = me.actions;
        me.collisionLayer.enemyLayer.actions = me.actions;
        me.collisionLayer.playerLayer.actions = me.actions;

        //Button Position
        me.pos = {x:48,y:me.size.height - 48};

        //Pause Button
        me.btnPause = new ccui.Button();
        me.btnPause.loadTextures(res.btnPauseUp,res.btnPauseDown);
        me.btnPause.x=me.pos.x;
        me.btnPause.y=me.pos.y;
        me.btnPause.addTouchEventListener(me.btnPauseTouchEvent,me);
        me.addChild(me.btnPause);

        //Resume Button
        me.btnResume = new ccui.Button();
        me.btnResume.loadTextures(res.btnResumeUp,res.btnResumeDown);
        me.btnResume.x=me.pos.x-100;
        me.btnResume.y=me.pos.y;
        me.btnResume.addTouchEventListener(me.btnResumeTouchEvent,me);
        me.addChild(me.btnResume);

        //Stop Button
        me.btnStop = new ccui.Button();
        me.btnStop.loadTextures(res.btnStopUp,res.btnStopDown);
        me.btnStop.x=me.pos.x-100;
        me.btnStop.y=me.pos.y;
        me.btnStop.addTouchEventListener(me.btnStopTouchEvent,me);
        me.addChild(me.btnStop);

        return true;
    },
    btnPauseTouchEvent:function(sender,type){
        var me = this;
        switch(type){
            case ccui.Widget.TOUCH_ENDED:
                me.btnResume.setPosition(cc.p(me.pos.x,me.pos.y));
                me.btnStop.setPosition(cc.p(me.pos.x+60,me.pos.y));
                me.btnPause.setPosition(cc.p(me.pos.x-100,me.pos.y));
                me.actions.resume=false;
                break;
        }
    },

    btnResumeTouchEvent:function(sender,type){
        var me = this;
        switch(type){
            case ccui.Widget.TOUCH_ENDED:
                me.btnPause.setPosition(cc.p(me.pos.x,me.pos.y));
                me.btnStop.setPosition(cc.p(me.pos.x-100,me.pos.y));
                me.btnResume.setPosition(cc.p(me.pos.x-100,me.pos.y));
                me.actions.resume=true;
                break;
        }
    },

    btnStopTouchEvent:function(sender,type){
        var me = this;
        switch(type){
            case ccui.Widget.TOUCH_ENDED:
                me.actions.resume=true;
                scenes.Stage1.initialized=false;
                cc.audioEngine.stopAllEffects();
                cc.director.popScene();
                break;
        }
    }

});