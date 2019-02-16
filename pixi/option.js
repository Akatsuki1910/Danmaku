//don't move
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;
var stage = new PIXI.Stage();
var renderer = PIXI.autoDetectRenderer(width, height,{
    resolution: window.devicePixelRatio,
    backgroundColor: 0x000000,
    antialias: true
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
    location.reload();
};
var player = [];
var enemy = [];
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
var word = "着弾回数";
var style = {font:'bold 40pt Arial', fill:'white'};
var hpmainobj = new PIXI.Text(word, style);
stage.addChild(hpmainobj);
hpmainobj.y=mojimainy;
var word = "0";
var style = {font:'bold 40pt Arial', fill:'white'};
var hpobj = new PIXI.Text(word, style);
stage.addChild(hpobj);
hpobj.x=mojimainx;
hpobj.y=mojimainy;
//#########################################
