/*jshint esversion: 6 */
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
var keyshift = false;
var keyBind = [37, 38, 39, 40 ,90];
var move_flg=4;
var count=0;
var move_speed_main = 2;
function playerMoveMain(event){
    var player_key_x = player[0][0].x;
    var player_key_y = player[0][0].y;
    if(keyshift){move_speed=move_speed_main/4;}else{move_speed=move_speed_main;}
    playerkey(player_key_x,player_key_y,move_speed,move_speed,event);
    switch(event){
        //left
        case 37:playermove(player_key_x-=move_speed,player_key_y);break;
        //up
        case 38:playermove(player_key_x,player_key_y-=move_speed);break;
        //right
        case 39:playermove(player_key_x+=move_speed,player_key_y);break;
        //down
        case 40:playermove(player_key_x,player_key_y+=move_speed);break;
        //z
        case 90:if(count==0){playershot();}break;
    }
}

$(document).on("keydown",(e)=>{
    if(e.keyCode==16){keyshift=true;}
    keyPressed[e.keyCode] = true;
});
$(document).on("keyup",(e)=>{
    if(e.keyCode==16){keyshift=false;}
    keyPressed[e.keyCode] = false;
});
$(window).on("blur",()=>{keyPressed.length = 0;});

function exec(){
    for (var i = 0; i < keyBind.length; ++i) {
        if (keyPressed[keyBind[i]]) {
            playerMoveMain(keyBind[i]);
        }
    }
    if(count==10){count=0;}else{count++;}
}

function playerkey(playx,playy,min,max,event){
    switch(event){
        //left
        case 37:if(playx-min<0){move_flg=0;}break;
        //up
        case 38:if(playy-min<0){move_flg=1;}break;
        //right
        case 39:if(playx+max>x*2){move_flg=2;}break;
        //down
        case 40:if(playy+max>y*2){move_flg=3;}break;
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
}

function onpointmove(event){
    var player_key_x = player[0][0].x;
    var player_key_y = player[0][0].y;
    playermouse(player_key_x,player_key_y,-event.offsetY+movey,event.offsetY-movey);
    playermove(player_key_x+event.offsetX-movex,player_key_y+event.offsetY-movey);
    movex=event.offsetX;
    movey=event.offsetY;
}

function playermouse(playx,playy,min,max){
    if(playx-min<0){move_flg=0;}
    else if(playy-min<0){move_flg=1;}
    else if(playx+max>x*2){move_flg=2;}
    else if(playy+max>y*2){move_flg=3;}
}

//shot
function addplayershot(rad,color,x,y){
    var i=player_shot.length;
    player_shot[i]= [];
    player_shot[i][0] = new PIXI.Graphics();
    player_shot[i][0].beginFill(color, 1);
    player_shot[i][0].drawCircle(0,0,rad);
    player_shot[i][0].endFill();
    stage.addChild(player_shot[i][0]);
    player_shot[i][0].x=x;
    player_shot[i][0].y=y;
    player_shot[i][1]=0;
}

function playershot(){
    addplayershot(3,"0x00ff00",player[0][0].x,player[0][0].y);
}

//playershot
var player_shot = [];
function playershotmove(){
    for(var i=0;i<player_shot.length;i++){
        var sx = player_shot[i][0].x;
        var sy = player_shot[i][0].y;
        ymove = sy-3;
        objset(i,sx,ymove,player_shot);
        if(hitcheck(player_shot,enemy,i,i+1,3,10)==1){
            if(player_shot[i][1]==0){
                hpobj.text--;
                if(hpobj.text==0){endflg=false;}
                decHP(enemy,0,1,"0x000000",10+hpcircle);
                player_shot[i][0].destroy();
                player_shot.splice(i, 1);
            }
        }
        if(ymove<0){
            player_shot[i][0].destroy();
            player_shot.splice(i, 1);
        }
    }
}


//player
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

addplayer(0,1,5,"0xff00ff",x,y+200);