var i=100;
var p=100;
var dir = 60;

var x = window.innerWidth/2;
var y = window.innerHeight/2;

var flg=true;

var objnum=36;

function anim(){
    var j=0;
    for(var k=0;k<360;k+=360/objnum){
        $(".s"+j).css({
            'left':x+Math.cos(k*(Math.PI/180))*i-p/2+'px',
            'top':y+Math.sin(k*(Math.PI/180))*i-p/2+'px',
            'width':p+'px',
            'height':p+'px'
        });
        j++;
    }
    if(i==200){
        flg=false;
    }else if(i==100){
        flg=true;
    }
    if(flg)i++;else i--;
}

function divadd(){
    for(var l=0;l<objnum;l++){
        $("#body").append('<div class="s'+l+' s"></div>');
    }
}

window.setInterval(anim, 50);
