/*jshint esversion: 6 */
//enemy
var circle = [];
var obj_shot=60;//object
var u = 4;//number

function addenemy(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        enemy[i]= [];
        enemy[i][0] = new PIXI.Graphics();
        enemy[i][0].beginFill(color, 1);
        enemy[i][0].drawCircle(0,0,rad);
        enemy[i][0].endFill();
        stage.addChild(enemy[i][0]);
        enemy[i][0].x=x;
        enemy[i][0].y=y;
    }
}

function addobj(mas,num,rad,color,x,y,obj){
    for(var i=mas;i<num+mas;i++){
        obj[i] = [];
        obj[i][0] = new PIXI.Graphics();
        obj[i][0].beginFill(color, 1);
        obj[i][0].drawCircle(0,0,rad);
        obj[i][0].endFill();
        stage.addChild(obj[i][0]);
        obj[i][0].x=x;
        obj[i][0].y=y;
    }
}

function des(obj,mas,num){
    for(var i=mas;i<num+mas;i++){
        if(obj[i][0]){
            obj[i][0].destroy();
        }
    }
}

addenemy(0,1,10,"0xffff00",x,y);
addobj(0,obj_shot*u,5,"0x0000ff",x,y,circle);

function hitcheck(obj,tar,p,q,orad,trad){
    orad=orad/2+1;
    trad=trad/2+1;
    var point=0;
    var minx = tar[0][0].x-trad;
    var maxx = tar[0][0].x+trad;
    var miny = tar[0][0].y-trad;
    var maxy = tar[0][0].y+trad;
    for(var i=p;i<q;i++){
        var shot_minx = obj[i][0].x-orad;
        var shot_maxx = obj[i][0].x+orad;
        var shot_miny = obj[i][0].y-orad;
        var shot_maxy = obj[i][0].y+orad;
        if((minx<shot_maxx && maxx>shot_minx) && (miny<shot_maxy && maxy>shot_miny)){
            point=1;
            break;
        }
    }

    return point;
}

function changecolor(obj,min,max,col,rad){
    for(var i=min;i<max;i++){
        var obx=obj[i][0].x;
        var oby=obj[i][0].y;
        obj[i][0].clear();
        obj[i][0].beginFill(col);
        obj[i][0].drawCircle(0,0,rad);
        obj[i][0].x=obx;
        obj[i][0].y=oby;
    }
}

function objset(num,x,y,obj){
    obj[num][0].x=x;
    obj[num][0].y=y;
}

function colorX(obj){
    return ('0000000000' + obj).slice(-6);
}