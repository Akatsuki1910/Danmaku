/*jshint esversion: 6 */
var title;
title = new PIXI.Text("TITLE",{fontFamily : 'Arial',fontSize : '60px', fill : 0xffffff});
title.anchor.x = 0.5;
title.anchor.y = 0.5;
title.position.x = x;
title.position.y = y;
stage.addChild(title);
title.interactive = true;

title.on('click', ()=>{
    titleserect=false;
    title.destroy();
    buttonset();
    levelserect=true;
    renderer.render(stage);
});

var titleserect=false;
$(document).on("keyup",(e)=>{
    if(titleserect){
        if(e.keyCode == 13){
            createjs.Sound.play("decision");
            titleserect=false;
            title.destroy();
            buttonset();
            levelserect=true;
            renderer.render(stage);
        }
    }
});
rendererThree.render(scene, camera);
renderer.render(stage);
