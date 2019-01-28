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
    circle[1].setX(x);
    circle[1].setY(y);
}

document.addEventListener('keydown', (event) => {
    var x = circle[1].getX();
    var y = circle[1].getY();
    switch(event.keyCode){
        case 37://left
            x--;
            player(--x,y);
            break;
        case 38://up
            y--;
            player(x,--y);
            break;
        case 39://right
            x++;
            player(++x,y);
            break;
        case 40://down
            player(x,++y);
            break;
    }
});

var circle = [];
var p=2;//object
var add=0;
var anim = new Konva.Animation(function(frame) {
    var xmove = x+Math.cos(((180)*(Math.PI/180)))*add;
    circle[0].setX(xmove);
    if(rgb_po(circle,1)==1){xmove=-1;}
    if(xmove<0){
        add=0;
        console.log(xmove);
    }else{
        add++;
    }
}, layer);

function addobjCircle(min,max,rad,color,x,y){
    for(var i=min;i<max;i++){
        circle[i] = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: color
        });
        layadd(circle[i]);
    }
}

function des(obj,min,max){
    for(var i=min;i<max-min;i++){
        if(obj[i]){obj[i].destroy();}
    }
}

function layadd(obj){
    layer.add(obj);
}

addobjCircle(0,1,5,"yellow",x,y);
addobjCircle(1,2,5,"red",x-200,y);

anim.start();

function rgb_po(obj,p){
    var point=0;
    for(var i=0;i<360;i++){
        var xpo = obj[p].getX()+Math.cos((i*(Math.PI/180)));
        var ypo = obj[p].getY()+Math.sin((i*(Math.PI/180)));
        var rgb_point = rgbcheck(xpo+=5,ypo+=5);
        if(rgb_point==1){point=1;break;}
    }
    return point;
}

var rgbcheck = function(x,y){
    var imagedata = context.getImageData(x, y, 1, 1);
    var r = imagedata.data[0];
    var g = imagedata.data[1];
    var b = imagedata.data[2];
    if(r==0 && g==0 && b==0){
        return 0;
    }else{
        return 1;
    }
};