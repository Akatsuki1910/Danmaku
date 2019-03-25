/*jshint esversion: 6 */
var xmove , ymove;
var move = (new Array(obj_shot*u)).fill(1);//1
var hansya =[];
for(var l=0;l<obj_shot*u;){
    for(var i=0;i<360;i+=(360/obj_shot),l++){
        hansya[l]=[];
        hansya[l][0]=i;
        hansya[l][1]=0;
    }
}
var endflg = true;
var movefps = 120;

function animate(){
    if(endflg){
        requestAnimationFrame(animate);
    }else{
        hpobj.text="0";
        if(grazesound){grazesound.stop();}
        endgame();
    }
    for(var c=0;c<movefps/60;c++){exec();}

    //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    //var l = 0;
    //var count=0;
    //for(var i=0;i<360;i+=(360/obj_shot)){
    //    if(circle[l][0]!=""){
    //        var sx = circle[l][0].x;
    //        var sy = circle[l][0].y;
    //        xmove = sx+Math.cos(i*(Math.PI/180))*(move[l]*5);
    //        ymove = sy+Math.sin(i*(Math.PI/180))*(move[l]*5);
    //        objset(l,xmove,ymove,circle);
    //        if(circle[l][0].x>x*2 || circle[l][0].x<0 || circle[l][0].y>y*2 || circle[l][0].y<0){
    //            circle[l][0].clear();
    //            //circle[l][0]="";
    //            count++;
    //        }
    //        if(hitcheck(circle,player,l,l+1,circle[0][0].width/2,player[0][0].width/2)==1){hitobj.text++;}
    //    }else{count++;}
    //    l++;
    //}
    //if(count==obj_shot){
    //    nextshot(circle,0,obj_shot,"0x0000ff",5);
    //}
    //randommove();

    if(time%120==0){
        for(var i=0;i<u;i++){
            if(qed_boo[i]==false){
                qed_boo[i]=true;
                randomposition(obj_shot*i,obj_shot*(i+1));
                break;
            }
        }
    }
    for(var i=0;i<u;i++){
        if(qed_boo[i]){
            qed(obj_shot*i,obj_shot*(i+1),i);
        }
    }



    //↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    grazecheck(circle,player,0,circle.length,circle[0][0].width/2,player[0][0].width/2);
    grazesoundmain();
    playershotmove();
    positionset(enemy);
    positionset(player);
    effectmain();

    rendererThree.render(scene, camera);
    renderer.render(stage);

    time++;
    fpsobj.text=time/100;
}

addenemy(0,1,20,"0xffff00",x,y);
addobj(0,obj_shot*u,5,"0x0000ff",x,y,circle);
addplayer(0,1,5,"0xff00ff",x,y+200);

function positionset(obj){
    for(var i=0;i<obj.length;i++){
        obj[i][1].x=obj[i][0].x;
        obj[i][1].y=obj[i][0].y;
    }
}

var ran_mov_x;
var ran_mov_y;
var ran_mov=true;
var ran_mov_tim=0;
var now_pla_x;
var now_pla_y;
var ran_mov_rou=120;
function randommove(){
    if(ran_mov){
        ran_mov=false;
        var min_x = width/10;
        var max_x = width-min_x;
        var min_y = height/10;
        var max_y = y-min_y;
        ran_mov_x = Math.floor( Math.random() * (max_x + 1 - min_x) ) + min_x;
        ran_mov_y = Math.floor( Math.random() * (max_y + 1 - min_y) ) + min_y;
        now_pla_x = enemy[0][0].x;
        now_pla_y = enemy[0][0].y;
    }

    enemy[0][0].x += (ran_mov_x-now_pla_x)/ran_mov_rou;
    enemy[0][0].y += (ran_mov_y-now_pla_y)/ran_mov_rou;
    ran_mov_tim++;

    if(ran_mov_tim==ran_mov_rou){
        ran_mov=true;
        ran_mov_tim=0;
    }

}

function han(ang,xy,i){
    if(hansya[i][1]==3){
        circle[i][0].clear();
        return 1;
    }else{
        if(xy==0){//x
            hansya[i][1]++;
            hansya[i][0]=540-ang;
        }else if(xy==1){//y
            hansya[i][1]++;
            hansya[i][0]=-ang;
        }
    }
}



var qed_boo =[];
for(var i=0;i<u;i++){
    qed_boo[i]=false;
}
function qed(min,max,boo_i){
    var count=0;
    for(var i=min;i<max;i++){
        if(circle[i][0].clearDirty==0){
            var sx = circle[i][0].x;
            var sy = circle[i][0].y;
            xmove = sx+Math.cos(hansya[i][0]*(Math.PI/180))*(move[i]*3);
            ymove = sy+Math.sin(hansya[i][0]*(Math.PI/180))*(move[i]*3);
            objset(i,xmove,ymove,circle);
            if(circle[i][0].y<0){
                count+=han(hansya[i][0],1,i);
            }
            if(circle[i][0].x<0 || circle[i][0].x>x*2){
                count+=han(hansya[i][0],0,i);
            }
            if(circle[i][0].y>y*2){
                circle[i][0].clear();
                count++;
            }
            if(hitcheck(circle,player,i,i+1,circle[min][0].width/2,player[0][0].width/2)==1){hitobj.text++;}
        }else{count++;}
    }
    if(count==obj_shot){
        for(var i=0,l=min;i<360;i+=(360/obj_shot),l++){
            hansya[l][0]=i;
            hansya[l][1]=0;
        }
        nextshot(circle,min,max,"0x0000ff",5);
        qed_boo[boo_i]=false;
    }
}

function randomposition(min,max){
    var min_x = width/10;
    var max_x = width-min_x;
    var min_y = height/10;
    var max_y = y-min_y;
    ran_x = Math.floor( Math.random() * (max_x + 1 - min_x) ) + min_x;
    ran_y = Math.floor( Math.random() * (max_y + 1 - min_y) ) + min_y;
    for(var i=min;i<max;i++)objset(i,ran_x,ran_y,circle);
}