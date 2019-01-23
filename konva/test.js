var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();

var circle = [];

var p=120;

for(var i=0;i<p;i++){
    circle[i] = new Konva.Circle({
    x: 220,
    y: 75,
    radius: 5,
    fill: 'yellow',
    //stroke: 'black',
    //strokeWidth: 4,
    //draggable: true,
    });
    layer.add(circle[i]);
}

stage.add(layer);

var add=0;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var mox=0;
var moy=0;
var cou=0;
var anim = new Konva.Animation(function(frame) {
    var j=0;
    for(var i=0;i<360;i+=360/p){
        var xmove = x+Math.cos(((i+90)*(Math.PI/180)))*add;
        var ymove = y+Math.sin(((i+90)*(Math.PI/180)))*add;
        circle[j].setX(xmove);
        circle[j].setY(ymove);
        j++;
        if((xmove<0 || xmove>x*2 || ymove<0 || ymove>y*2)){cou++;}
    }
    var a=0;
    var b=0;
    if(cou==p){b=p;addobj(a,b);add=-5*2;}
    add+=5*2;
    cou=0;
}, layer);

function addobj(min,max){
    for(var i=min;i<max-min;i++){
        circle[i].destroy();
        circle[i] = new Konva.Circle({
            x: x,
            y: y,
            radius: 5,
            fill: 'yellow',
            //stroke: 'black',
            //strokeWidth: 4,
            //draggable: true,
            });
    }

    for(i=min;i<max-min;i++){layer.add(circle[i]);}
}

anim.start();