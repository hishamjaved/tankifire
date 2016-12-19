/**
 * Created by hisham.javed on 1/12/15.
 */
scenes.Stage1 = cc.Scene.extend({
    _className: "Scene_Stage1",
    onEnter: function () {
        this._super();
        if (!this.initialized) {

            this.addChild(new Layer_Stage1_BG());

            //Enemies Layer
            var enemyLayer = new Layer_Enemy();
            this.addChild(enemyLayer);

            //Player Layer
            var playerLayer = new Layer_Player();
            this.addChild(playerLayer);

            //Collision Layer
            var collisionLayer = new Layer_Collision(enemyLayer, playerLayer);
            this.addChild(collisionLayer);

            //Stage Menu Layer
            var stageMenuLayer = new Layer_StageMenu(collisionLayer);
            this.addChild(stageMenuLayer);

            this.initialized = true;
        }

    }
});