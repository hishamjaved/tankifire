/**
 * Created by hisham.javed on 1/14/15.
 */

function getHelicopterAnimObject(){
    return {"sprite":getHelicopterAnimSprite(),"action":getHelicopterAnimAction()};
}

function getHelicopterAnimSprite(){
    return new cc.Sprite("res/animation/helicopter/heli1.png");
}

function getHelicopterAnimAction(){
    var animation = new cc.Animation();
    for (var i = 2; i <= 10;i++){
        animation.addSpriteFrameWithFile("res/animation/helicopter/heli"+i+".png");
    }
    animation.setDelayPerUnit(0.05);
    animation.setRestoreOriginalFrame(false);
    return new cc.Animate(animation);
}