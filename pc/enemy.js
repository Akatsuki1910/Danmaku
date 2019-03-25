/*jshint esversion: 6 */
//enemy
var circle = [];
var obj_shot=60;//object
var u = 11;//number
var pi = Math.PI/180;
var grazespace = 4;
var hpcircle = 20;
var hpbar = 2;

function addenemy(mas,num,rad,color,x,y){
    for(var i=mas;i<num+mas;i++){
        enemy[i]= [];
        //enemy main
        enemy[i][0] = new PIXI.Graphics();
        enemy[i][0].beginFill(color, 1);
        enemy[i][0].drawCircle(0,0,rad);
        enemy[i][0].endFill();
        enemy[i][0].x=x;
        enemy[i][0].y=-(enemy[0][0].width/2+hpcircle+hpbar);
        //HP
        enemy[i][1] = new PIXI.Graphics();
        enemy[i][1].lineStyle(hpbar, 0xff00ff, 1);
        enemy[i][1].arc(0,0,rad+hpcircle,0,Math.PI*2, false);
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
        obj[i][0].globalCompositeOperation = 'destination-over';
        obj[i][0].endFill();

        obj[i][0].x=x;
        obj[i][0].y=y;
    }
}

function hitcheck(obj,tar,p,q,orad,trad){
    var point=0;
    var tarx = tar[0][0].x;
    var tary = tar[0][0].y;
    for(var i=p;i<q;i++){
        var objx = obj[i][0].x;
        var objy = obj[i][0].y;
        if((tarx-objx)**2+(tary-objy)**2<=(orad+trad-grazespace)**2){// jshint ignore:line
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
        if(obj[i][0]!=null){
            var objx = obj[i][0].x;
            var objy = obj[i][0].y;
            var sla = (tarx-objx)**2+(tary-objy)**2;// jshint ignore:line
            if(sla<=(orad+trad)**2 && sla>(orad+trad-grazespace)**2){// jshint ignore:line
                grazeobj.text++;
            }
        }
    }
}

function decHP(obj,min,max,rad){
    for(var i=min;i<max;i++){
        var pi = Math.PI/180;
        obj[i][1].clear();
        enemy[i][1].lineStyle(2, 0xff00ff, 1);
        obj[i][1].arc(0,0,rad,0,-pi*(360*(enemyhp-hpobj.text)/enemyhp), false);
        obj[i][1].x=obj[i][0].x;
        obj[i][1].y=obj[i][0].y;
    }
}

function nextshot(obj,min,max,col,rad,obx=enemy[0][0].x,oby=enemy[0][0].y){
    for(var i=min;i<max;i++){
        obj[i][0].beginFill(col);
        obj[i][0].drawCircle(0,0,rad);
        obj[i][0].x=obx;
        obj[i][0].y=oby;
        obj[i][0].clearDirty=0;
    }
}

function objset(num,x,y,obj){
    obj[num][0].x=x;
    obj[num][0].y=y;
}

//function colorX(obj){
//    return ('0000000000' + obj).slice(-6);
//}

function enemystart(obj){
    for(var i=0;i<obj.length;i++){
        stage.addChild(obj[i][0]);
    }

    for(var a=0;a<enemy.length;a++){
        for(var b=0;b<enemy[a].length;b++){
            stage.addChild(enemy[a][b]);
        }
    }
}

function firsyenemymove(){
    renderer.render(stage);
    enemy[0][0].y+=1;
    positionset(enemy);
    for(var t=0;t<circle.length;t++){
        objset(t,enemy[0][0].x,enemy[0][0].y,circle);
    }
    if(y<=enemy[0][0].y){
        cancelAnimationFrame(firsyenemymove);
        movekeylock();
        animate();
    }else{
        requestAnimationFrame(firsyenemymove);
    }
}