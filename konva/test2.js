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
window.addEventListener('resize', function() {
    location.reload();
}, false);
$('canvas').attr('id', 'can');
var obj = document.getElementById("can");
var context = obj.getContext('2d');
var player = [[],[]];
//#################################

//player
var move_speed = 1;
function playermove(x,y){
    player[0][0].setX(x);
    player[0][0].setY(y);
    player[0][1].setX(x-3);
    player[0][1].setY(y-3);
}

var keyPressed = [];
var keyBind = [37, 38, 39, 40];

function playerMoveMain(event){
    var player_key_x = player[0][0].getX();
    var player_key_y = player[0][0].getY();
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
Interval = setInterval(exec, 17);//60fps
//#########################################

//enemy
var circle = [];
var obj_shot=36;//object
var add=0;
var xmove , ymove;
var move = 1;
var anim = new Konva.Animation(function(frame) {
    var l = 0;
    var hitflg=false;
    for(var i=0;i<360;i+=(360/obj_shot)){
        xmove = x+Math.cos(((i)*(Math.PI/180)))*add;
        ymove = y+Math.sin(((i)*(Math.PI/180)))*add;
        circle[l][0].setX(xmove);
        circle[l][1].setX(xmove-3);
        circle[l][0].setY(ymove);
        circle[l][1].setY(ymove-3);
        l++;
    }
    if(hitcheck(circle,obj_shot,5)==1){hitflg=true;}
    if(hitflg || circle[0][0].getX()>x*2){
        move=-1;
    }else if(circle[0][0].getX()<x){
        move=1;
    }
    add+=move;
}, layer);

function addplayer(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        player[i][0] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        hit_rad=Math.floor(rad*Math.cos(45*(Math.PI/180)));
        player[i][1] = new Konva.Rect({
            x: x-hit_rad,
            y: y-hit_rad,
            width: hit_rad*2,
            height: hit_rad*2,
            fill: color
        });
        layadd(player[i][0]);
        layadd(player[i][1]);
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
            y: y-hit_rad,
            width: hit_rad*2,
            height: hit_rad*2,
            fill: color
        });
        layadd(obj[i][0]);
        layadd(obj[i][1]);
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

addplayer(0,1,5,"red",x,y+200);
addobj(0,obj_shot,5,"blue",x,y,circle);

anim.start();

function hitcheck(obj,p,rad){
    rad=rad/2+1;
    var point=0;
    var minx = player[0][0].getX()-rad;
    var maxx = player[0][0].getX()+rad;
    var miny = player[0][0].getY()-rad;
    var maxy = player[0][0].getY()+rad;
    for(var i=0;i<p;i++){
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