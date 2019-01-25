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
//#################################
var circle = [];
var p=120;//object
var add=0;
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
    if(cou==p){b=p;des(circle,a,b);addobjCircle(a,b,5,"yellow");add=-5*2;}
    add+=5*2;
    cou=0;
}, layer);

function addobjCircle(min,max,rad,color){
    for(var i=min;i<max-min;i++){
        circle[i] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
    }
    for(i=min;i<max-min;i++){layadd(circle[i]);}
}

function des(obj,min,max){
    for(var i=min;i<max-min;i++){
        if(obj[i]){obj[i].destroy();}
    }
}

function layadd(obj){
    layer.add(obj);
}

addobj(0,p,5,"yellow");

anim.start();