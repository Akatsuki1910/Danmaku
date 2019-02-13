//don't move
var width = window.innerWidth;
var height = window.innerHeight;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});
var layer = new Konva.Layer();
stage.add(layer);
window.onresize = function () {
    location.reload();
};
var player = [];
var enemy = [];
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
context.globalCompositeOperation = 'destination-over';
//#################################

//player
var move_speed = 1;
function playermove(mox,moy){
    player[0][0].setX(mox);
    player[0][0].setY(moy);
    player[0][1].setX(mox-3);
    player[0][1].setY(moy-3);
    var over_x = player[0][0].getX();
    var over_y = player[0][0].getY();
    switch(move_flg){
        case 0:
            over_x+=(0-over_x+1);
            move_flg=4;
            playermove(over_x,over_y);
            break;
        case 1:
            over_y+=(0-over_y+1);
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
    var player_key_x = player[0][0].getX();
    var player_key_y = player[0][0].getY();
    if(player_key_x-move_speed<0){move_flg=0;}
    else if(player_key_y-move_speed<0){move_flg=1;}
    else if(player_key_x+move_speed>x*2){move_flg=2;}
    else if(player_key_y+move_speed>y*2){move_flg=3;}
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
Interval = setInterval(exec, 1000/60);//60fps
//#########################################

//enemy
var circle = [];
var obj_shot=40;//object
var u = 4;//number
var add = (new Array(1000)).fill(0);//0
var xmove , ymove;
var move = (new Array(1000)).fill(1);//0
var anim = new Konva.Animation(function() {
    var l = 0;
    for(var t=0;t<u;t++){
        for(var i=0;i<360;i+=(360/obj_shot)){
            var sx = circle[l][0].getX();
            var sy = circle[l][0].getY();
            xmove = sx+Math.cos(((i+t*(360/obj_shot)/u)*(Math.PI/180)))*(move[l]*0.5*(t+1));
            ymove = sy+Math.sin(((i+t*(360/obj_shot)/u)*(Math.PI/180)))*(move[l]*0.5*(t+1));
            objset(l,xmove,ymove,circle,3);
            if(circle[l][0].getX()>x*2 || circle[l][0].getX()<0 || circle[l][0].getY()>y*2 || circle[l][0].getY()<0){
                move[l]*=-1;
            }
            if(hitcheck(circle,enemy,l,l+1,5)==1){
                if(circle[l][0].fill()=="red"){
                    changecolor(circle,l,l+1,"blue");
                }
            }
            if(hitcheck(circle,player,l,l+1,5)==1){
                changecolor(circle,l,l+1,"red");
            }
            l++;
        }
    }
}, layer);

function addenemy(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        enemy[i]= [];
        enemy[i][0] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        hit_rad=Math.floor(rad*Math.cos(45*(Math.PI/180)));
        enemy[i][1] = new Konva.Rect({
            x: x-hit_rad,
            y: y-hit_rad
        });
        layadd(enemy[i][0]);
        //layadd(enemy[i][1]);
    }
}

function addplayer(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        player[i]= [];
        player[i][0] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        hit_rad=Math.floor(rad*Math.cos(45*(Math.PI/180)));
        player[i][1] = new Konva.Rect({
            x: x-hit_rad,
            y: y-hit_rad
        });
        layadd(player[i][0]);
        //layadd(player[i][1]);
    }
}

function addobj(mas,num,rad,color,x,y,obj){
    for(var i=mas;i<num+mas;i++){
        obj[i] = [];
        obj[i][0] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        hit_rad=Math.floor(rad*Math.cos(45*(Math.PI/180)));
        obj[i][1] = new Konva.Rect({
            x: x-hit_rad,
            y: y-hit_rad
        });
        layadd(obj[i][0]);
        //layadd(obj[i][1]);
    }
}

function des(obj,mas,num){
    for(var i=mas;i<num+mas;i++){
        if(obj[i][0]){
            obj[i][0].destroy();
            obj[i][1].destroy();
        }
    }
}

function layadd(obj){
    layer.add(obj);
}

addenemy(0,1,10,"yellow",x,y);
addplayer(0,1,5,"red",x,y+200);
addobj(0,obj_shot*u,5,"blue",x,y,circle);

anim.start();

function hitcheck(obj,tar,p,q,rad){
    rad=rad/2+1;
    var point=0;
    var minx = tar[0][0].getX()-rad;
    var maxx = tar[0][0].getX()+rad;
    var miny = tar[0][0].getY()-rad;
    var maxy = tar[0][0].getY()+rad;
    for(var i=p;i<q;i++){
        var shot_minx = obj[i][0].getX()-rad;
        var shot_maxx = obj[i][0].getX()+rad;
        var shot_miny = obj[i][0].getY()-rad;
        var shot_maxy = obj[i][0].getY()+rad;
        if((minx<shot_maxx && maxx>shot_minx) && (miny<shot_maxy && maxy>shot_miny)){
            point=1;
            break;
        }
    }

    return point;
}

function changecolor(obj,min,max,col){
    for(var i=min;i<max;i++){
        obj[i][0].fill(col);
        obj[i][1].fill(col);
    }
}

function objset(num,x,y,obj,sub){
    obj[num][0].setX(x);
    obj[num][1].setX(x-sub);
    obj[num][0].setY(y);
    obj[num][1].setY(y-sub);
}