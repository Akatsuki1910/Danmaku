/*jshint esversion: 6 */
//don't move
var width = window.innerWidth;
var height = window.innerHeight;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
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

//被弾回数
var word = "0";
var style = {font:'bold 40pt Arial', fill:'white'};
var textobj = new PIXI.Text(word, style);
stage.addChild(textobj);

//player
var move_speed = 1;
function playermove(mox,moy){
    player[0][0].x = mox;
    player[0][0].y = moy;
    var over_x = player[0][0].x;
    var over_y = player[0][0].y;
    switch(move_flg){
        case 0:
            over_x+=(-1*over_x+1);
            move_flg=4;
            playermove(over_x,over_y);
            break;
        case 1:
            over_y+=(-1*over_y+1);
            move_flg=4;
            playermove(over_x,over_y);
            break;
        case 2:
            over_x-=(over_x-(x*2)+1);
            move_flg=4;
            playermove(over_x,over_y);
            break;
        case 3:
            over_y-=(over_y-(y*2)+1);
            move_flg=4;
            playermove(over_x,over_y);
            break;
    }
}

var keyPressed = [];
var keyBind = [37, 38, 39, 40];
var move_flg=4;

function playerMoveMain(event){
    var player_key_x = player[0][0].x;
    var player_key_y = player[0][0].y;
    playerkey(player_key_x,player_key_y,move_speed,move_speed);
    switch(event){
        //left
        case 37:playermove(player_key_x-=move_speed,player_key_y);break;
        //up
        case 38:playermove(player_key_x,player_key_y-=move_speed);break;
        //right
        case 39:playermove(player_key_x+=move_speed,player_key_y);break;
        //down
        case 40:playermove(player_key_x,player_key_y+=move_speed);break;
    }
}

document.onkeydown = function (e) {keyPressed[e.keyCode] = true;};
document.onkeyup = function (e) {keyPressed[e.keyCode] = false;};
window.onblur = function (e) {keyPressed.length = 0;};

function exec(){
    for (var i = 0; i < keyBind.length; ++i) {
        if (keyPressed[keyBind[i]]) {
            playerMoveMain(keyBind[i]);
        }
    }
}

var Interval;
clearInterval(Interval);
Interval = setInterval(exec, 1000/120);//120fps

//player mouse
var movex;
var movey;
$("#pixiview").on("mousedown touchstart",(event)=>{
    movex = event.offsetX;
    movey = event.offsetY;
    onpointmain();
});

function onpointmain(){
    $("#pixiview").on("mousemove",(event)=>{onpointmove(event);});
    $("#pixiview").on("mouseleave",()=>{$("#pixiview").unbind("mouseup mousemove mouseleave");});
    $("#pixiview").on("mouseup",()=>{$("#pixiview").unbind("mouseup mousemove mouseleave");});
    $("#pixiview").on("mousemove",(event)=>{onpointmove(event);});
    $("#pixiview").on("mouseleave",()=>{$("#pixiview").unbind("mouseend mousemove mouseleave");});
    $("#pixiview").on("mouseend",()=>{$("#pixiview").unbind("mouseend mousemove mouseleave");});
}

function onpointmove(event){
    var player_key_x = player[0][0].x;
    var player_key_y = player[0][0].y;
    playerkey(player_key_x,player_key_y,-event.offsetY+movey,event.offsetY-movey);
    playermove(player_key_x+event.offsetX-movex,player_key_y+event.offsetY-movey);
    movex=event.offsetX;
    movey=event.offsetY;
}

function playerkey(playx,playy,min,max){
    if(playx-min<0){move_flg=0;}
    else if(playy-min<0){move_flg=1;}
    else if(playx+max>x*2){move_flg=2;}
    else if(playy+max>y*2){move_flg=3;}
}
//#########################################

//enemy
var circle = [];
var obj_shot=40;//object
var u = 4;//number
var add = (new Array(1000)).fill(0);//0
var xmove , ymove;
var move = (new Array(1000)).fill(1);//0
function animate(){
    requestAnimationFrame(animate);
    var l = 0;
    for(var t=0;t<u;t++){
        for(var i=0;i<360;i+=(360/obj_shot)){
            var sx = circle[l][0].x;
            var sy = circle[l][0].y;
            xmove = sx+Math.cos(((i+t*(360/obj_shot)/u)*(Math.PI/180)))*(move[l]*0.5*(t+1));
            ymove = sy+Math.sin(((i+t*(360/obj_shot)/u)*(Math.PI/180)))*(move[l]*0.5*(t+1));
            objset(l,xmove,ymove,circle,3);
            if(circle[l][0].x>x*2 || circle[l][0].x<0 || circle[l][0].y>y*2 || circle[l][0].y<0){
                move[l]*=-1;
            }
            if(hitcheck(circle,enemy,l,l+1,5)==1){
                if(colorX(circle[l][0].fillColor)=="ff0000"){
                    changecolor(circle,l,l+1,"0x0000ff",5);
                }
            }
            if(hitcheck(circle,player,l,l+1,5)==1){
                if(colorX(circle[l][0].fillColor)!="ff0000"){
                    changecolor(circle,l,l+1,"0xff0000",5);
                    textobj.text++;
                }
            }
            l++;
        }
    }
    renderer.render(stage);
}

function addenemy(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        enemy[i]= [];
        enemy[i][0] = new PIXI.Graphics();
        enemy[i][0].beginFill(color, 1);
        enemy[i][0].drawCircle(0,0,rad);
        enemy[i][0].endFill();
        stage.addChild(enemy[i][0]);
        enemy[i][0].x=x;
        enemy[i][0].y=y;
    }
}

function addplayer(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        player[i]= [];
        player[i][0] = new PIXI.Graphics();
        player[i][0].beginFill(color, 1);
        player[i][0].drawCircle(0,0,rad);
        player[i][0].endFill();
        stage.addChild(player[i][0]);
        player[i][0].x=x;
        player[i][0].y=y;
    }
}

function addobj(mas,num,rad,color,x,y,obj){
    for(var i=mas;i<num+mas;i++){
        obj[i] = [];
        obj[i][0] = new PIXI.Graphics();
        obj[i][0].beginFill(color, 1);
        obj[i][0].drawCircle(0,0,rad);
        obj[i][0].endFill();
        stage.addChild(obj[i][0]);
        obj[i][0].x=x;
        obj[i][0].y=y;
    }
}

function des(obj,mas,num){
    for(var i=mas;i<num+mas;i++){
        if(obj[i][0]){
            obj[i][0].destroy();
        }
    }
}

addenemy(0,1,10,"0xffff00",x,y);
addplayer(0,1,5,"0xff00ff",x,y+200);
addobj(0,obj_shot*u,5,"0x0000ff",x,y,circle);

requestAnimationFrame(animate);

function hitcheck(obj,tar,p,q,rad){
    rad=rad/2+1;
    var point=0;
    var minx = tar[0][0].x-rad;
    var maxx = tar[0][0].x+rad;
    var miny = tar[0][0].y-rad;
    var maxy = tar[0][0].y+rad;
    for(var i=p;i<q;i++){
        var shot_minx = obj[i][0].x-rad;
        var shot_maxx = obj[i][0].x+rad;
        var shot_miny = obj[i][0].y-rad;
        var shot_maxy = obj[i][0].y+rad;
        if((minx<shot_maxx && maxx>shot_minx) && (miny<shot_maxy && maxy>shot_miny)){
            point=1;
            break;
        }
    }

    return point;
}

function changecolor(obj,min,max,col,rad){
    for(var i=min;i<max;i++){
        var obx=obj[i][0].x;
        var oby=obj[i][0].y;
        obj[i][0].clear();
        obj[i][0].beginFill(col);
        obj[i][0].drawCircle(0,0,rad);
        obj[i][0].x=obx;
        obj[i][0].y=oby;
    }
}

function objset(num,x,y,obj){
    obj[num][0].x=x;
    obj[num][0].y=y;
}

function colorX(obj){
    return ('0000000000' + obj).slice(-6);
}