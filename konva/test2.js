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
//#################################

function player(x,y){
    circle[0][0].setX(x);
    circle[0][0].setY(y);
    circle[0][1].setX(x-3);
    circle[0][1].setY(y-3);
}

var move_speed = 1;
document.addEventListener('keydown', (event) => {
    var player_key_x = circle[0][0].getX();
    var player_key_y = circle[0][0].getY();
    switch(event.keyCode){
        case 37://left
            player(player_key_x-=move_speed,player_key_y);
            break;
        case 38://up
            player(player_key_x,player_key_y-=move_speed);
            break;
        case 39://right
            player(player_key_x+=move_speed,player_key_y);
            break;
        case 40://down
            player(player_key_x,player_key_y+=move_speed);
            break;
    }
});

var circle = [[],[]];
var p=2;//object
var add=0;
var xmove;
var anim = new Konva.Animation(function(frame) {
    xmove = Math.floor(x+Math.cos(((180)*(Math.PI/180)))*add);
    circle[1][0].setX(xmove);
    circle[1][1].setX(xmove-3);
    if(hitcheck(circle,1,5)==1){xmove=-1;}
    if(xmove<0){
        add=0;
    }else{
        add++;
    }
}, layer);

function addobjCircle(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        circle[i][0] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        rad=Math.floor(rad*Math.cos(45*(Math.PI/180)));
        circle[i][1] = new Konva.Rect({
            x: x-rad,
            y: y-rad,
            width: rad*2,
            height: rad*2,
            fill: color
        });
        layadd(circle[i][0]);
        layadd(circle[i][1]);
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

addobjCircle(0,1,5,"red",x-200,y);
addobjCircle(1,1,5,"blue",x,y);

anim.start();

function hitcheck(obj,p,rad){
    var point=0;
    var minx = Math.floor(obj[0][0].getX()-rad);
    var maxx = Math.floor(obj[0][0].getX()+rad);
    var miny = Math.floor(obj[0][0].getY()-rad);
    var maxy = Math.floor(obj[0][0].getY()+rad);
    for(var i=1;i<=p;i++){
        var shot_minx = Math.floor(obj[p][0].getX()-rad);
        var shot_maxx = Math.floor(obj[p][0].getX()+rad);
        var shot_miny = Math.floor(obj[p][0].getY()-rad);
        var shot_maxy = Math.floor(obj[p][0].getY()+rad);
        if((minx<shot_maxx && maxx>shot_minx) && (miny<shot_maxy && maxy>shot_miny)){
            point=1;
            break;
        }
    }

    return point;
}