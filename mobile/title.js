/*jshint esversion: 6 */
var title;
title = new PIXI.Text("TITLE",{fontFamily : 'Arial',fontSize : '70px', fill : 0xffffff});
title.anchor.x = 0.5;
title.anchor.y = 0.5;
title.position.x = x;
title.position.y = y;
stage.addChild(title);
title.interactive = true;

title
.on('touchstart', ()=>{if(titleserect){titleclick();}})
.on('mousedown', ()=>{if(titleserect){titleclick();}});

function titleclick(){
    titleserect=false;
    title.destroy();
    buttonset();
    levelserect=true;
    renderer.render(stage);
}

var titleserect=false;

renderer.render(stage);