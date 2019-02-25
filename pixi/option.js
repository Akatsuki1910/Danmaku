//don't move
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;
var stage = new PIXI.Stage();
var renderer = PIXI.autoDetectRenderer(width, height,{
    resolution: 1,
    antialias: true,
    transparent: true,
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
    location.reload();
};
var player = [];
var enemy = [];
var enemyhp = 100;
//#################################

//destroy
function des(obj,mas,num,mas2,num2){
    for(var i=mas;i<num+mas;i++){
        for(var l=mas2;l<num2+mas2;l++)
        if(obj[i][l]){
            obj[i][l].destroy();
        }
    }
}
//####################################

var mojimainx = 240;
var mojimainy = 50;

//被弾回数
var word = "被弾回数";
var style = {font:'bold 40pt Arial', fill:'white'};
var hitmainobj = new PIXI.Text(word, style);

var word = "0";
var style = {font:'bold 40pt Arial', fill:'white'};
var hitobj = new PIXI.Text(word, style);

hitobj.x=mojimainx;
//#########################################

//敵被弾回数
var word = "敵HP";
var style = {font:'bold 40pt Arial', fill:'white'};
var hpmainobj = new PIXI.Text(word, style);

hpmainobj.y=mojimainy;

var word = ""+enemyhp;
var style = {font:'bold 40pt Arial', fill:'white'};
var hpobj = new PIXI.Text(word, style);

hpobj.x=mojimainx;
hpobj.y=mojimainy;
//#########################################

//fps
var time=0;

var word = "時間";
var style = {font:'bold 40pt Arial', fill:'white'};
var fpsmainobj = new PIXI.Text(word, style);

fpsmainobj.y=mojimainy*2;

var word = "0.00";
var style = {font:'bold 40pt Arial', fill:'white'};
var fpsobj = new PIXI.Text(word, style);

fpsobj.x=mojimainx;
fpsobj.y=mojimainy*2;

//end
var endflg = true;
function endgame(){
    hpobj.text="0";
    renderer.render(stage);

    var word = "CLEAR";
    var style = {font:'bold 40pt Arial', fill:'white'};
    var clearobj = new PIXI.Text(word, style);
    clearobj.x=x-100;
    clearobj.y=y-50;
    stage.addChild(clearobj);
    var word = "SCORE";
    var score = (10000-fpsobj.text*(hitobj.text+0.01));
    word+=" "+orgRound(score,5);
    var style = {font:'bold 40pt Arial', fill:'white'};
    var scoremainobj = new PIXI.Text(word, style);
    scoremainobj.x=x-200;
    scoremainobj.y=y+10;
    stage.addChild(scoremainobj);
}

function orgRound(value, base) {
    return Math.round(((value+'0000000000').slice(0,10))*Math.pow(10,base))/Math.pow(10,base);
}

function optionstart(){
    stage.addChild(hitmainobj);
    stage.addChild(hitobj);

    stage.addChild(hpmainobj);
    stage.addChild(hpobj);

    stage.addChild(fpsmainobj);
    stage.addChild(fpsobj);
}