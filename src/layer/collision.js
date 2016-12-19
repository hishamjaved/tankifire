/**
 * Created by hisham.javed on 1/12/15.
 */

Layer_Collision = cc.Layer.extend({
    _className: "Layer_Collision",
    enemyLayer: null,
    playerLayer: null,
    ctor: function (enemyLayer, playerLayer) {
        var me = this;
        //////////////////////////////
        // 1. super init first
        me._super();

        /////////////////////////////
        // window size
        me.size = cc.winSize;
        me.enemyLayer = enemyLayer;
        me.playerLayer = playerLayer;

        me.scheduleUpdate();
        return true;
    },
    update: function () {
        var me = this;
        if (me.actions.resume) {
            if (me.playerLayer != undefined && me.enemyLayer != undefined) {
                me.playerLayer.bullets.forEach(function (bullet) {
                    me.enemyLayer.enemies.forEach(function (enemy) {
                        if (me.bulletEnemyCollision(bullet, enemy)) {
                            if (enemy.alive) {
                                me.playerLayer.player.updateScore(enemy.worth);
                                enemy.explode();
                                bullet.sprite.opacity=0;
                                bullet.active = false;
                            }
                        }
                    });
                });

                me.enemyLayer.enemies.forEach(function (enemy) {
                    if(me.playerLayer.player.lives>0 && enemy.hasCrossedBorder() ){
                        me.playerLayer.player.explode();
                    }
                    else{
                        if (me.enemyPlayerCollision(me.playerLayer.player, enemy)) {
                            if (enemy.alive && me.playerLayer.player.lives > 0) {
                                enemy.explode();
                                me.playerLayer.player.explode();
                            }
                        }
                    }
                });
            }
        }
    },

    bulletEnemyCollision: function (bullet, enemy) {
        return bullet.x < enemy.x + enemy.width - 15 &&
            bullet.x + bullet.width + 10 > enemy.x &&
            bullet.y < enemy.y + 50 + enemy.height + 50 &&
            bullet.y + bullet.height > enemy.y + 50;
    },

    enemyPlayerCollision: function (player, enemy) {
        return player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height - 20 &&
            player.y + player.height - 20 > enemy.y;
    }
});