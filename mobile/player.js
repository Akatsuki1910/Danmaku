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

var movekeylock = false;
var move_flg=4;
var count=0;




function exec(){
    if(count==10){count=0;}else{count++;}
    if(count==0 && movekeylock){playershot();}
}

var Interval;
clearInterval(Interval);
Interval = setInterval(exec, 1000/120);//120fps

//player touch
var movex;
var movey;
$("#pixiview").on("touchstart",(event)=>{
    if(movekeylock){
        movex = event.changedTouches[0].pageX;
        movey = event.changedTouches[0].pageY;
        onpointmain();
        event.preventDefault();
    }
});

function onpointmain(){
    $("#pixiview")
        .on("touchmove",(event)=>{onpointmove(event);})
        .on("touchleave",()=>{$("#pixiview").unbind("touchmove touchleave touchend");})
        .on("touchend",()=>{$("#pixiview").unbind("touchmove touchleave touchend");});
}

function onpointmove(event){
    var player_key_x = player[0][0].x;
    var player_key_y = player[0][0].y;
    var touchx = event.changedTouches[0].pageX;
    var touchy = event.changedTouches[0].pageY;
    playertouch(player_key_x,player_key_y,-touchy+movey,touchy-movey);
    playermove(player_key_x+touchx-movex,player_key_y+touchy-movey);
    movex=touchx;
    movey=touchy;
}

function playertouch(playx,playy,min,max){
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
        player[i][0].x=x;
        player[i][0].y=y;
    }
}

addplayer(0,1,5,"0xff00ff",x,y+200);

function playerstart(){
    for(var i=0;i<player.length;i++){
        stage.addChild(player[i][0]);
    }
}