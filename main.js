/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(450, 800, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //Loader Image
    cc._loaderImage = "data:image/gif;base64,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";
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new scenes.MainMenu());
    }, this);
};
cc.game.run();