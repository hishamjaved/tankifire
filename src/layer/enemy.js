/**
 * Created by hisham.javed on 1/21/15.
 */

Layer_Enemy = cc.Layer.extend({
    _className: "Layer_Enemy",
    enemies: [],
    enemyTag: 200.342,
    explosionAnimTag: 300.324,
    ctor: function (stageMenuLayer) {
        var me = this;
        //////////////////////////////
        // 1. super init first
        me._super();

        /////////////////////////////
        // window size
        me.size = cc.winSize;
        me.scheduleUpdate();
        return true;
    },
    update: function () {
        var me = this;
        if (me.actions.resume) {
            me.enemies.forEach(function (enemy) {
                enemy.performQA();
                enemy.update();
            });

            me.enemies = me.enemies.filter(function (enemy) {
                return enemy.active;
            });
            if (Math.random() < 0.1) {
                if (me.enemies.length < conf.enemy.enemyStrength)
                    me.enemies.push(me.create());
            }
        }

    },
    setEnemySprite: function (enemy) {
        var me = this;
        enemy.type = getRandomInt(1, 3);
        enemy.width = 47;
        enemy.height = 94;
        if (enemy.type == 1) {
            enemy.sprite = new cc.Sprite(res.enemyTank47X94);
            enemy.worth = conf.enemy.worth.tank;
        }
        else if (enemy.type == 2) {
            enemy.sprite = new cc.Sprite(res.enemyTruck47X94);
            enemy.worth = conf.enemy.worth.truck;
        }
        else if (enemy.type == 3) {
            enemy.width = 96;
            enemy.height = 96;
            var heliCopterAnimObject = getHelicopterAnimObject();
            heliCopterAnimObject.sprite.runAction(heliCopterAnimObject.action.repeatForever());
            enemy.sprite = heliCopterAnimObject.sprite;
            enemy.worth = conf.enemy.worth.helicopter;
            enemy.sprite.setScale(1.5);
        }
        enemy.x = getRandomInt(1, me.size.width - enemy.width);
        enemy.y = me.size.height + enemy.height;
        enemy.sprite.attr({
            x: enemy.x,
            y: enemy.y,
            anchorX: 0.5,
            anchorY: 0
        });
    },
    create: function (enemy) {
        var me = this;
        enemy = enemy || {};
        me.setEnemySprite(enemy);
        me.addChild(enemy.sprite);
        enemy.alive = true;
        enemy.active = true;
        enemy.age = Math.floor(Math.random() * 128);
        enemy.xVelocity = 0;
        enemy.yVelocity = getRandomInt(1, 12);
        enemy.qaPass = false;
        enemy.inBounds = function () {
            return enemy.x >= 0 && enemy.x <= me.size.width &&
                enemy.y <= me.size.height + enemy.height && enemy.y >= -enemy.height;
        };
        enemy.hasCrossedBorder = function () {
            return enemy.alive && enemy.active && enemy.y < 0;
        };
        enemy.explode = function () {
            if (enemy.alive) {
                var explosionAnimObject = getExplosionAnimObject();
                if(enemy.type==3){
                    explosionAnimObject.sprite.setScale(1.8);
                }
                else
                    explosionAnimObject.sprite.setScale(1.3);
                me.addChild(explosionAnimObject.sprite);
                explosionAnimObject.sprite.setPosition(cc.p(enemy.x, enemy.y));


                //Explosion and on end of explosion clear the explosion animation object
                var explosionAction = cc.sequence(explosionAnimObject.action.repeat(1), cc.callFunc(function () {
                    explosionAnimObject.sprite.opacity = 0;
                    explosionAnimObject.sprite.setPosition(cc.p(0, -400));
                    me.removeChild(explosionAnimObject.sprite,true);
                    explosionAnimObject=null;
                }));
                explosionAnimObject.sprite.runAction(explosionAction);

                //Remove enemy with effects
                enemy.alive = false;
                //Play Audio
                cc.audioEngine.playEffect(res.explosion_mp3);
                enemy.sprite.runAction(cc.sequence(cc.blink(0.7, 4), cc.fadeOut(0.3), cc.callFunc(function () {
                    enemy.remove();
                })));
            }
        };
        enemy.remove = function () {
            enemy.alive = false;
            enemy.active = false;
            enemy.sprite.opacity = 0;
            enemy.sprite.setPosition(cc.p(0, -400));
            if(enemy.soundTag)
                cc.audioEngine.stopEffect(enemy.soundTag);
            me.removeChild(enemy.sprite, true);
        };

        enemy.performQA = function () {
            if (enemy.alive && enemy.active && !enemy.qaPass) {
                if (me.isOverlapped(enemy)) {
                    enemy.remove();
                }
                else {
                    if(!enemy.soundTag && enemy.type==3)
                       enemy.soundTag = cc.audioEngine.playEffect(res.helicopter_mp3,true);
                    enemy.qaPass = true;

                }
            }
        };
        enemy.update = function () {
            if (enemy.qaPass && enemy.alive) {
                enemy.x += enemy.xVelocity;
                enemy.y -= enemy.yVelocity;
                if (enemy.y < ((me.size.height / 2) - getRandomInt(0, 350)) && enemy.yVelocity > 2)
                    enemy.yVelocity--;
                enemy.sprite.setPosition(cc.p(enemy.x, enemy.y));
                enemy.xVelocity = conf.enemy.xSpeed * Math.sin(enemy.age * Math.PI / 64);
                enemy.angle = Math.sin(enemy.age * Math.PI / 64);
                enemy.age++;
                enemy.active = enemy.active && enemy.inBounds();
            }
        };
        return enemy;
    },

    isOverlapped: function (a) {
        var me = this;
        var isOverlapped = false;
        me.enemies.forEach(function (b) {
            //if(b.y<=me.size.height){
            if (hasXCollision(a, b)) {
                isOverlapped = true;
            }
            //}
        });
        return isOverlapped;
    }
});