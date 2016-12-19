/**
 * Created by hisham.javed on 1/14/15.
 */

function getExplosionAnimObject(){
    return {"sprite":getExplosionAnimSprite(),"action":getExplosionAnimAction()};
}

function getExplosionAnimSprite(){
    return new cc.Sprite("res/animation/explosion/explosion1.png");
}

function getExplosionAnimAction(){
    var animation = new cc.Animation();
    for (var i = 2; i <= 17;i++){
        animation.addSpriteFrameWithFile("res/animation/explosion/explosion"+i+".png");
    }
    animation.addSpriteFrameWithFile(res.spacer1X1);
    animation.setDelayPerUnit(0.05);
    animation.setRestoreOriginalFrame(false);
    return new cc.Animate(animation);
}