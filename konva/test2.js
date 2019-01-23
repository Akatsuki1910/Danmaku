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
    circle[i] = new Konva.Rect({
    x: 220,
    y: 75,
    width: 50,
    height: 50,
    fill: 'yellow',
    //stroke: 'black',
    //strokeWidth: 4,
    //draggable: true,
    offset: {
        x: 25,
        y: 25
    }
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
        var xmove = x+Math.cos(((i+90)*(Math.PI/180)))*add;
        var ymove = y+Math.sin(((i+90)*(Math.PI/180)))*add;
        circle[j].setX(xmove);
        circle[j].setY(ymove);
        circle[j].rotate(angleDiff);
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
        circle[i] = new Konva.Rect({
        x: x,
        y: y,
        width: 50,
        height: 50,
        fill: 'yellow',
        //stroke: 'black',
        //strokeWidth: 4,
        //draggable: true,
        offset: {
            x: 25,
            y: 25
        }
        });
    }

    for(i=min;i<max-min;i++){layer.add(circle[i]);}
}

anim.start();