
var ExternalBorder = 30;

var width = window.innerWidth-ExternalBorder*2;
var height = window.innerHeight-ExternalBorer*2;

var Enemy_XPost = width/2;
var Enemy_YPost = height/2;

var Obj_Size = 3;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();

var circle = [];

var p=360;

for(var i=0;i<p;i++){
    circle[i] = new Konva.Circle({
    x: 220,
    y: 75,
    radius: Obj_Size,
    fill: 'yellow',
    //stroke: 'black',
    //strokeWidth: 4,
    //draggable: true,
    });
    layer.add(circle[i]);
}

stage.add(layer);

var angularSpeed = 90;
var add=0;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var mox=0;
var moy=0;
var cou=0;
var anim = new Konva.Animation(function(frame) {
    var j=0;
    var angleDiff = frame.timeDiff * angularSpeed / 1000;
    for(var i=0;i<360;i+=360/p){
        var xmove = Enemy_XPost+Math.cos(((i+90)*(Math.PI/180)))*add;
        var ymove = Enemy_YPost+Math.sin(((i+90)*(Math.PI/180)))*add;
        circle[j].setX(xmove);
        circle[j].setY(ymove);
        j++;
        if((xmove<ExternalBorder || xmove>x*2 || ymove<0 || ymove>y*2)){cou++;}
    }
    var a=0;
    var b=0;
    if(cou==p){b=p;addobj(a,b);add=-5*2;}
    add+=5*2;
    cou=0;
}, layer);

function addobj(min,max){
    Enemy_XPost = Math.random() * width;
    Enemy_YPost = Math.random() * height;
    for(var i=min;i<max-min;i++){
        circle[i].destroy();
        circle[i] = new Konva.Circle({
            x: Enemy_XPost,
            y: Enemy_YPost,
            radius: Obj_Size,
            fill: 'yellow',
            //stroke: 'black',
            //strokeWidth: 4,
            //draggable: true,
            });
    }

    for(i=min;i<max-min;i++){layer.add(circle[i]);}
}

anim.start();