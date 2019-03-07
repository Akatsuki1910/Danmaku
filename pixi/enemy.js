/*jshint esversion: 6 */
//enemy
var circle = [];
var obj_shot=60;//object
var u = 4;//number
var pi = Math.PI/180;
var hpcircle;

function addenemy(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        enemy[i]= [];
        //enemy main
        enemy[i][0] = new PIXI.Graphics();
        enemy[i][0].beginFill(color, 1);
        enemy[i][0].drawCircle(0,0,rad);
        enemy[i][0].endFill();
        enemy[i][0].x=x;
        enemy[i][0].y=y;
        //HP
        hpcircle = 5;
        enemy[i][3] = new PIXI.Graphics();
        enemy[i][3].beginFill("0xff00ff", 1);
        enemy[i][3].drawCircle(0,0,rad+hpcircle);
        enemy[i][3].endFill();
        enemy[i][3].x=enemy[i][0].x;
        enemy[i][3].y=enemy[i][0].y;
        //hole
        enemy[i][2] = new PIXI.Graphics();
        enemy[i][2].beginFill("0x000000", 1);
        enemy[i][2].drawCircle(0,0,rad+hpcircle-2);
        enemy[i][2].endFill();
        enemy[i][2].x=enemy[i][0].x;
        enemy[i][2].y=enemy[i][0].y;
        //gage
        enemy[i][1] = new PIXI.Graphics();
        enemy[i][1].beginFill("0x000000", 1);
        enemy[i][1].arc(0,0,rad+hpcircle,-pi*0,pi*(360), true);
        enemy[i][1].endFill();
        enemy[i][1].x=enemy[i][0].x;
        enemy[i][1].y=enemy[i][0].y;
    }
}

function addobj(mas,num,rad,color,x,y,obj){
    for(var i=mas;i<num+mas;i++){
        obj[i] = [];
        obj[i][0] = new PIXI.Graphics();
        obj[i][0].beginFill(color, 1);
        obj[i][0].drawCircle(0,0,rad);
        obj[i][0].endFill();

        obj[i][0].x=x;
        obj[i][0].y=y;
    }
}

addenemy(0,1,10,"0xffff00",x,y);
addobj(0,obj_shot*u,5,"0x0000ff",x,y,circle);

function hitcheck(obj,tar,p,q,orad,trad){
    var point=0;
    var tarx = tar[0][0].x;
    var tary = tar[0][0].y;
    for(var i=p;i<q;i++){
        var objx = obj[i][0].x;
        var objy = obj[i][0].y;
        if((tarx-objx)**2+(tary-objy)**2<=(orad+trad-2)**2){// jshint ignore:line
            point=1;
            break;
        }
    }
    return point;
}

function grazecheck(obj,tar,p,q,orad,trad){
    var tarx = tar[0][0].x;
    var tary = tar[0][0].y;
    for(var i=p;i<q;i++){
        var objx = obj[i][0].x;
        var objy = obj[i][0].y;
        var sla = (tarx-objx)**2+(tary-objy)**2;// jshint ignore:line
        if(sla<=(orad+trad)**2 && sla>(orad+trad-2)**2){// jshint ignore:line
            grazeobj.text++;
        }
    }
}

function decHP(obj,min,max,col,rad){
    for(var i=min;i<max;i++){
        var pi = Math.PI/180;
        obj[i][1].clear();
        obj[i][1].beginFill(col, 1);
        obj[i][1].arc(0,0,rad,-pi*0,-pi*(360*(enemyhp-hpobj.text)/enemyhp), true);
        obj[i][1].lineTo(0,0);
        obj[i][1].x=obj[i][0].x;
        obj[i][1].y=obj[i][0].y;
    }
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

function enemystart(obj){
    for(var i=0;i<obj.length;i++){
        stage.addChild(obj[i][0]);
    }

    for(var a=0;a<enemy.length;a++){
        for(var b=enemy[a].length-1;b>=0;b--){
            stage.addChild(enemy[a][b]);
        }
    }
}