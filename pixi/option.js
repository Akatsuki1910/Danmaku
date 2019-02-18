//don't move
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;
var stage = new PIXI.Stage();
var renderer = PIXI.autoDetectRenderer(width, height,{
    resolution: window.devicePixelRatio,
    antialias: true,
    transparent: true,
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
    location.reload();
};
var player = [];
var enemy = [];
var enemyhp = 10;
//#################################

var mojimainx = 240;
var mojimainy = 50;

//被弾回数
var word = "被弾回数";
var style = {font:'bold 40pt Arial', fill:'white'};
var hitmainobj = new PIXI.Text(word, style);
stage.addChild(hitmainobj);
var word = "0";
var style = {font:'bold 40pt Arial', fill:'white'};
var hitobj = new PIXI.Text(word, style);
stage.addChild(hitobj);
hitobj.x=mojimainx;
//#########################################

//敵被弾回数
var word = "敵HP";
var style = {font:'bold 40pt Arial', fill:'white'};
var hpmainobj = new PIXI.Text(word, style);
stage.addChild(hpmainobj);
hpmainobj.y=mojimainy;
var word = ""+enemyhp;
var style = {font:'bold 40pt Arial', fill:'white'};
var hpobj = new PIXI.Text(word, style);
stage.addChild(hpobj);
hpobj.x=mojimainx;
hpobj.y=mojimainy;
//#########################################

//fps
var time=0;

var word = "時間";
var style = {font:'bold 40pt Arial', fill:'white'};
var fpsmainobj = new PIXI.Text(word, style);
stage.addChild(fpsmainobj);
fpsmainobj.y=mojimainy*2;
var word = "0.00";
var style = {font:'bold 40pt Arial', fill:'white'};
var fpsobj = new PIXI.Text(word, style);
stage.addChild(fpsobj);
fpsobj.x=mojimainx;
fpsobj.y=mojimainy*2;

//end
var endflg = true;
function endgame(){
    var word = "CLEAR";
    var style = {font:'bold 40pt Arial', fill:'white'};
    var clearobj = new PIXI.Text(word, style);
    clearobj.x=x-100;
    clearobj.y=y-50;
    stage.addChild(clearobj);
    var word = "SCORE";
    word+=" "+(10000-fpsobj.text*(hitobj.text+0.01));
    var style = {font:'bold 40pt Arial', fill:'white'};
    var scoremainobj = new PIXI.Text(word, style);
    scoremainobj.x=x-200;
    scoremainobj.y=y+10;
    stage.addChild(scoremainobj);
}