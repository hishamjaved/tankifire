/**
 * Created by hisham.javed on 1/12/15.
 */

Layer_Player = cc.Layer.extend({
    _className: "Layer_Player",
    sprite: null,
    size: null,
    bullets: [],
    bulletTag: 592.342,
    lastFireTime: 0,
    ctor: function () {
        var me = this;
        //////////////////////////////
        // 1. super init first
        me._super();

        me.removeAllChildren();

        /////////////////////////////
        // window size
        me.size = cc.winSize;
        me.player.init(me);
        me.drawPlayer();
        me.playerListeners();
        me.scheduleUpdate();
        return true;
    },
    update: function () {
        var me = this;
        if (me.actions.resume) {
            if (me.player.lives > 0) {
                if (me.fireStart) {
                    var date = new Date();
                    var timeDiff = date.getTime() - me.lastFireTime;
                    if (timeDiff > getRandomInt(200, conf.player.fireDelay)) {
                        me.lastFireTime = date.getTime();
                        var pos = {
                            x: me.sprite.getPosition().x + me.sprite.getBoundingBox().width / 2 - 40,
                            y: me.sprite.getBoundingBox().height
                        };
                        me.fireBullet(pos);
                        me.fireEffect(pos);
                    }
                }

            }
            me.bullets.forEach(function (bullet) {
                bullet.update();
            });
            me.bullets = me.bullets.filter(function (bullet) {
                return bullet.active;
            });
        }

    },
    fireEffect: function (pos) {
        var me = this;
        //Play Audio
        cc.audioEngine.playEffect(res.shoot1_mp3);

        //Play Tank Gun Fire Animation
        pos.x = pos.x + 6;
        pos.y = pos.y + 9;
        if (!me.explosionAnimObject) {
            me.explosionAnimObject = getExplosionAnimObject();
            me.explosionAnimObject.tag = -2;
            me.explosionAnimObject.sprite.setScale(0.5);
            me.explosionAnimObject.sprite.setTag(me.explosionAnimObject.tag);
            me.addChild(me.explosionAnimObject.sprite);
        }
        me.explosionAnimObject.sprite.setPosition(cc.p(pos.x, pos.y));
        me.explosionAnimObject.sprite.runAction(me.explosionAnimObject.action.repeat(1));
    },
    player: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        score: 0,
        lives: conf.player.life,
        tag: -1,
        init: function (layer) {
            var me = this;
            me.layer = layer;
            me.x = 0;
            me.y = 0;
            me.width = 0;
            me.height = 0;
            me.score = 0;
            me.lives = conf.player.life;
            me.tag = -1;

            //Score Label
            me.lblScore = new cc.LabelBMFont("Score: 0", "res/fonts/toga.fnt");
            me.lblScore.color = cc.color.WHITE;
            me.lblScore.anchorX = 0.5;
            me.lblScore.anchorY = 0.5;
            me.lblScore.x = layer.size.width - 100;
            me.lblScore.y = layer.size.height - 70;
            layer.addChild(me.lblScore);

            //Lives label
            me.lblLives = new cc.LabelBMFont("Lives: " + me.lives, "res/fonts/toga.fnt");
            me.lblLives.color = cc.color.GRAY;
            me.lblLives.anchorX = 0.5;
            me.lblLives.anchorY = 0.5;
            me.lblLives.x = layer.size.width - 95;
            me.lblLives.y = layer.size.height - 25;
            layer.addChild(me.lblLives);
        },
        updateScore: function (points) {
            var me = this;
            me.score += points;
            var str = "Score: " + me.score;
            me.lblScore.setString(str);
            //me.lblScore.x = me.layer.size.width- str.length *10;
        },
        updateLives: function () {
            var me = this;
            me.lives -= 1;
            me.lblLives.setString("Lives: " + me.lives);
        },
        explode: function () {
            var me = this;
            me.updateLives();
            if (me.lives >= 0) {
                //Play Audio
                cc.audioEngine.playEffect(res.explosion_mp3);
                me.explosionAnimation();
                me.layer.sprite.runAction(cc.sequence(cc.blink(0.7, 4), cc.fadeOut(0.3), cc.fadeIn(0.3), cc.callFunc(function () {
                    if (me.lives == 0) {
                        me.layer.sprite.opacity = 0;
                        me.layer.sprite.setPosition(cc.p(0, -400));
                        me.lives = -1;

                        var gameOver = new cc.Sprite(res.gameOver);
                        gameOver.anchorX = 0.5;
                        gameOver.anchorY = 0.5;
                        gameOver.x = me.layer.size.width / 2;
                        gameOver.y = me.layer.size.height / 2;
                        me.layer.addChild(gameOver);
                    }
                })));
            }
        },

        explosionAnimation: function () {
            var me = this;
            if (!me.explosionAnimObject) {
                me.explosionAnimObject = getExplosionAnimObject();
                me.explosionAnimObject.sprite.setScale(2);
                me.layer.addChild(me.explosionAnimObject.sprite);
            }
            me.explosionAnimObject.sprite.setPosition(cc.p(me.x, me.y + 40));
            me.explosionAnimObject.sprite.runAction(cc.sequence(me.explosionAnimObject.action.repeat(1), cc.callFunc(function () {
                me.layer.removeChild(me.explosionAnimObject.sprite, true);
                me.explosionAnimObject = null;
            })));
        }
    },

    drawPlayer: function () {
        var me = this;
        me.sprite = new cc.Sprite(res.playerTank80X175);
        me.sprite.setTag(me.tag);
        me.player.x = me.size.width / 2;
        me.player.y = 0;
        me.player.width = 80;
        me.player.height = 175;
        me.sprite.attr({
            x: me.player.x,
            y: me.player.y,
            anchorX: 0.4,
            anchorY: 0
        });
        me.addChild(me.sprite);
    },

    playerListeners: function () {
        var me = this;
        if (cc.sys.capabilities.hasOwnProperty("touches")) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (touch, event) {
                    //Start Firing
                    if (me.actions.resume) {
                        me.fireStart = true;
                    }
                    return true;
                },
                onTouchEnded: function (touch, event) {
                    //Stop Firing
                    me.fireStart = false;
                    return true;
                },
                onTouchMoved: function (touch, event) {
                    if (me.actions.resume) {
                        if (touch.getLocationY() < 130 && me.player.lives >= 0) {
                            me.player.x = touch.getLocationX();
                            me.sprite.setPosition(cc.p(touch.getLocationX(), 0));
                        }
                        me.fireStart = true;
                    }
                    return true;
                }
            }, me);
        }
    },

    bullet: function (bullet) {
        var me = this;
        bullet.active = true;
        bullet.xVelocity = 0;
        bullet.width = 11;
        bullet.height = 38;
        bullet.yVelocity = -bullet.speed;
        bullet.sprite = new cc.Sprite(res.bullet11X38);
        bullet.sprite.attr({
            x: bullet.x,
            y: bullet.y,
            anchorX: 0,
            anchorY: 0
        });
        me.addChild(bullet.sprite);

        bullet.inBounds = function () {
            return bullet.x >= 0 && bullet.x <= me.size.width &&
                bullet.y >= 0 && bullet.y <= me.size.height;
        };

        bullet.update = function () {
            if(bullet.active){
                bullet.x += bullet.xVelocity;
                bullet.y -= bullet.yVelocity;
                bullet.sprite.setPosition(cc.p(bullet.x, bullet.y));
                bullet.active = bullet.active && bullet.inBounds();
                bullet.remove();
            }
        };

        bullet.remove = function () {
            if (!bullet.active) {
                bullet.sprite.opacity = 0;
                bullet.sprite.setPosition(cc.p(10, -400));
                me.removeChild(bullet.sprite, true);
            }
        };
        return bullet;
    },

    fireBullet: function (bulletPosition) {
        var me = this;
        me.bullets.push(me.bullet({
            speed: conf.player.bullet.speed,
            x: bulletPosition.x,
            y: bulletPosition.y
        }));
    }
});