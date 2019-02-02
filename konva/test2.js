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
var circle = [[],[]];
var p=2;//object
var add=0;
var xmove;
var anim = new Konva.Animation(function(frame) {
    xmove = Math.floor(x+Math.cos(((180)*(Math.PI/180)))*add);
    circle[0][0].setX(xmove);
    circle[0][1].setX(xmove-3);
    if(hitcheck(circle,1,5)==1){xmove=-1;}
    if(xmove<0){
        add=0;
    }else{
        add++;
    }
}, layer);

function addplayer(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        player[i][0] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        rad=Math.floor(rad*Math.cos(45*(Math.PI/180)));
        player[i][1] = new Konva.Rect({
            x: x-rad,
            y: y-rad,
            width: rad*2,
            height: rad*2,
            fill: color
        });
        layadd(player[i][0]);
        layadd(player[i][1]);
    }
}

function addobj(mas,num,rad,color,x,y,obj){
    for(var i=mas;i<num+mas;i++){
        obj[i][0] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        rad=Math.floor(rad*Math.cos(45*(Math.PI/180)));
        obj[i][1] = new Konva.Rect({
            x: x-rad,
            y: y-rad,
            width: rad*2,
            height: rad*2,
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

addplayer(0,1,5,"red",x-200,y);
addobj(0,1,5,"blue",x,y,circle);

anim.start();

function hitcheck(obj,p,rad){
    var point=0;
    var minx = Math.floor(player[0][0].getX()-rad);
    var maxx = Math.floor(player[0][0].getX()+rad);
    var miny = Math.floor(player[0][0].getY()-rad);
    var maxy = Math.floor(player[0][0].getY()+rad);
    for(var i=0;i<p;i++){
        var shot_minx = Math.floor(obj[i][0].getX()-rad);
        var shot_maxx = Math.floor(obj[i][0].getX()+rad);
        var shot_miny = Math.floor(obj[i][0].getY()-rad);
        var shot_maxy = Math.floor(obj[i][0].getY()+rad);
        if((minx<shot_maxx && maxx>shot_minx) && (miny<shot_maxy && maxy>shot_miny)){
            point=1;
            break;
        }
    }

    return point;
}