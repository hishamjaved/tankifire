var res = {
    //Images
    spacer1X1 : "res/spacer.png",
    bgGrass64X64 : "res/bgGrass64X64.png",
    splash450X800 : "res/splash450X800.png",
    playerTank80X175 : "res/playerTank80X175.png",
    bullet11X38 : "res/bullet11X38.png",
    enemyTank47X94 : "res/enemyTank47X94.png",
    enemyTruck47X94 : "res/enemyTruck47X94.png",
    gameOver : "res/gameover.png",

    //Buttons
    btnPlayUp : "res/btnPlayUp.png",
    btnPlayDown : "res/btnPlayDown.png",
    btnPauseUp : "res/btnPauseUp.png",
    btnPauseDown : "res/btnPauseDown.png",
    btnStopUp : "res/btnStopUp.png",
    btnStopDown : "res/btnStopDown.png",
    btnResumeUp : "res/btnResumeUp.png",
    btnResumeDown : "res/btnResumeDown.png",
    //Sounds
    helicopter_mp3:"res/sound/helicopter.mp3",
    explosion_mp3:"res/sound/explosion.mp3",
    shoot1_mp3:"res/sound/shoot1.mp3",
    shoot2_mp3:"res/sound/shoot2.mp3",
    tankFiring_mp3:"res/sound/tankFiring.mp3",

    //Fonts
    font:"res/fonts/toga.fnt"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}