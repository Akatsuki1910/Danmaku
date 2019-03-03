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


$('head').append(
	'<style type="text/css">#container { display: none; } #fade, #loader { display: block; }</style>'
);

var pageH;
$(window).on("load",()=>{ // 全ての読み込み完了後に呼ばれる関数
	pageH = height;

	$("#fade").css("height", pageH).delay(900).fadeOut(800).queue(()=>{
        titleserect=true;
    });
	$("#loader").delay(600).fadeOut(300);
	$("#pixiview").css("display", "block");
});