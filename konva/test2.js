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

var move_speed = 2;
document.addEventListener('keydown', (event) => {
    var player_key_x = circle[0][0].getX();
    var player_key_y = circle[0][0].getY();
    switch(event.keyCode){
        case 37://left
            player(--player_key_x,player_key_y);
            break;
        case 38://up
            player(player_key_x,--player_key_y);
            break;
        case 39://right
            player(++player_key_x,player_key_y);
            break;
        case 40://down
            player(player_key_x,++player_key_y);
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
    if(rgb_po(circle,0,5)==1){xmove=-1;}
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

function rgb_po(obj,p,r){
    var point=0;
    var r_end=Math.floor(r*Math.cos(45*(Math.PI/180)));
    var obj_x = Math.floor(obj[p][0].getX());
    var obj_y = Math.floor(obj[p][0].getY());
    var xpo,ypo,rgb_point;
    //up
    for(var i=0;i<r_end;i++){
        xpo = obj_x-r_end+i;
        ypo = obj_y-r_end;
        rgb_point = rgbcheck(xpo,ypo);
        if(rgb_point==1){point=1;break;}
    }
    //end
    for(var i=0;i<r_end;i++){
        xpo = obj_x-r_end+i;
        ypo = obj_y+r_end;
        rgb_point = rgbcheck(xpo,ypo);
        if(rgb_point==1){point=1;break;}
    }
    //side
    for(var l=1;l<r_end-1;l++){
        for(var i=0;i<2;i++){
            xpo = obj_x-r_end+r_end*2*i;
            ypo = obj_y-r_end+l;
            rgb_point = rgbcheck(xpo,ypo);
            if(rgb_point==1){point=1;break;}
        }
    }
    return point;
}

var rgbcheck = function(x,y){
    var imagedata = context.getImageData(x, y, 1, 1);
    var r = imagedata.data[0];
    var g = imagedata.data[1];
    var b = imagedata.data[2];
    if((r==255 && g==0 && b==0) || (r==0 && g==0 && b==0)){
        return 0;
    }else{
        console.log(r+" "+g+" "+b);
        return 1;
    }
};
