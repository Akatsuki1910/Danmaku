/*jshint esversion: 6 */
var xmove , ymove;
var move = (new Array(1000)).fill(1);//0
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
    for(var i=0;i<movefps/60;i++){exec();}

    var l = 0;
    for(var t=0;t<u;t++){
        for(var i=0;i<360;i+=(360/obj_shot)){
            var sx = circle[l][0].x;
            var sy = circle[l][0].y;
            xmove = sx+Math.cos(((i+t*(360/obj_shot)/u)*(Math.PI/180)))*(move[l]*0.5*(t+1));
            ymove = sy+Math.sin(((i+t*(360/obj_shot)/u)*(Math.PI/180)))*(move[l]*0.5*(t+1));
            objset(l,xmove,ymove,circle);
            if(circle[l][0].x>x*2 || circle[l][0].x<0 || circle[l][0].y>y*2 || circle[l][0].y<0){
                move[l]*=-1;
            }
            if(hitcheck(circle,enemy,l,l+1,5,5)==1){
                if(colorX(circle[l][0].fillColor)=="ff0000"){
                    changecolor(circle,l,l+1,"0x0000ff",5);
                }
            }
            if(hitcheck(circle,player,l,l+1,5,5)==1){
                if(colorX(circle[l][0].fillColor)!="ff0000"){
                    changecolor(circle,l,l+1,"0xff0000",5);
                    hitobj.text++;
                }
            }
            l++;
        }
    }
    grazecheck(circle,player,0,circle.length,5,5);
    grazesoundmain();
    playershotmove();
    positionset(enemy);
    positionset(player);
    //effectmain();

    //rendererThree.render(scene, camera);
    renderer.render(stage);

    time++;
    fpsobj.text=time/100;
}

addenemy(0,1,10,"0xffff00",x,-(10+hpcircle+hpbar));
addobj(0,obj_shot*u,5,"0x0000ff",x,y,circle);
addplayer(0,1,5,"0xff00ff",x,y+200);

function positionset(obj){
    for(var i=0;i<obj.length;i++){
        obj[i][1].x=obj[i][0].x;
        obj[i][1].y=obj[i][0].y;
    }
}