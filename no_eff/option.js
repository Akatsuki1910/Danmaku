/*jshint esversion: 6 */
//don't move
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(width, height,{
    resolution: 1,
    antialias: true,
    //transparent: true,
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
    location.reload();
};
var player = [];
var enemy = [];
var enemyhp;

//#################################

//destroy
function des(obj,mas,num,mas2,num2){
    for(var i=mas;i<num+mas;i++){
        for(var l=mas2;l<num2+mas2;l++){
            if(obj[i][l]){
                obj[i][l].destroy();
            }
        }
    }
}
//####################################

var mojimainx = 240;
var mojimainy = 50;

//被弾回数
var word = "被弾回数";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var hitmainobj = new PIXI.Text(word, style);

var word = "0";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var hitobj = new PIXI.Text(word, style);

hitobj.x=mojimainx;
//#########################################

//敵被弾回数
var word = "敵HP";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var hpmainobj = new PIXI.Text(word, style);

hpmainobj.y=mojimainy;

var word = ""+enemyhp;
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var hpobj = new PIXI.Text(word, style);

hpobj.x=mojimainx;
hpobj.y=mojimainy;
//#########################################

//fps
var time=0;

var word = "時間";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var fpsmainobj = new PIXI.Text(word, style);

fpsmainobj.y=mojimainy*2;

var word = "0.00";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var fpsobj = new PIXI.Text(word, style);

fpsobj.x=mojimainx;
fpsobj.y=mojimainy*2;
//#########################################

//graze
var word = "グレイズ";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var grazemainobj = new PIXI.Text(word, style);

grazemainobj.y=mojimainy*3;

var word = "0";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var grazeobj = new PIXI.Text(word, style);

grazeobj.x=mojimainx;
grazeobj.y=mojimainy*3;
//#########################################

//end
var endflg = true;
function endgame(){
    var word = "CLEAR";
    var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white'};
    var clearobj = new PIXI.Text(word, style);
    clearobj.position.x = x;
    clearobj.position.y =y-70;
    clearobj.anchor.x = 0.5;
    clearobj.anchor.y = 0.5;
    stage.addChild(clearobj);

    var word = "SCORE";
    var score = (10000-(hitobj.text/100)+(grazeobj.text-fpsobj.text)*10);
    word+=" "+orgRound(score,5);
    var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white'};
    var scoremainobj = new PIXI.Text(word, style);
    scoremainobj.position.x = x;
    scoremainobj.position.y = y;
    scoremainobj.anchor.x = 0.5;
    scoremainobj.anchor.y = 0.5;
    stage.addChild(scoremainobj);

    var word = "ENTER";
    var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white'};
    var oneobj = new PIXI.Text(word, style);
    oneobj.position.x = x;
    oneobj.position.y=y+100;
    oneobj.anchor.x = 0.5;
    oneobj.anchor.y = 0.5;
    stage.addChild(oneobj);
    //oneobj.interactive = true;
    //oneobj.on('click', ()=>{
    //    location.reload();
    //});
    $(document).on("keyup",(e)=>{
        if(e.keyCode==13){location.reload();}
    });

    cancelAnimationFrame(animate);
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

    stage.addChild(grazemainobj);
    stage.addChild(grazeobj);
}

//json
var sounds;
var enemypic;
var playerpic;
$.ajaxSetup({async: false});
$.getJSON("../option.json",(data)=>{
    sounds=data.sound;
    enemypic=data.enemy;
    playerpic=data.player;
});
$.ajaxSetup({async: true});
createjs.Sound.alternativeExtensions = ["wav"];
createjs.Sound.registerSounds(sounds, "../");

//graze
var grazesound;
var audio_boo = false;
var grazesub=0;

function grazesoundmain(){
    if(Number(grazeobj.text)-grazesub!=0){
        if(!audio_boo){
            grazesound = createjs.Sound.play("graze-music");
            audio_boo=true;
        }
    }else{
        if(audio_boo){
            if(grazesound){grazesound.stop();}
            audio_boo=false;
        }
    }
    if(!grazesound){audio_boo=false;}
    grazesub=Number(grazeobj.text);
}