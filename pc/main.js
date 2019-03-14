/*jshint esversion: 6 */
var xmove , ymove;
var move = (new Array(1000)).fill(1);//0
var endflg = true;
function animate(){
    if(endflg){requestAnimationFrame(animate);}else{hpobj.text="0";endgame();}
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
    playershotmove();
    effectmain();

    if(Number(grazeobj.text)-grazesub!=0){
        if(!audio_boo){
            grazesound = createjs.Sound.play("graze-music");
            audio_boo=true;
        }
    }else{
        if(audio_boo){
            if(grazesound){grazesound.stop();}
            audio_boo=false;
        }
    }
    if(!grazesound){audio_boo=false;}
    grazesub=Number(grazeobj.text);

    rendererThree.render(scene, camera);
    renderer.render(stage);

    time++;
    fpsobj.text=time/100;
}

var grazesound;
var audio_boo = false;
var grazesub=0;