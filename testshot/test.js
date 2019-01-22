var i=100;
var p=30;
var dir = 60;

var x = window.innerWidth - 50;
var y = window.innerHeight - 50;

var shot = 0;
var disp = 0;
var flg=true;

// Object Definition
var Max_object = 500;
var objnum= 7;
var obj_Agi = 2;
var obj_Xspeed = [];
var obj_Yspeed = [];
var obj_Size = [];
var obj_Xpost = [];
var obj_Ypost = [];
var obj_expired = [];
var obj_follow = [];
var obj_Final = 0;
// Define End
//
// Player Definition
var player_Xpost = 0;
var player_Ypost = 0;
// Define End

function shoot( displacement ){
    for(var k=0;k<objnum;k++){
        obj_Size[(k+obj_Final)%Max_object] = p;
        obj_Xpost[(k+obj_Final)%Max_object] = x/2;
        obj_Ypost[(k+obj_Final)%Max_object] = y/2;
        obj_Xspeed[(k+obj_Final)%Max_object] = 10*Math.cos(Math.PI*2/objnum*k + displacement);
        obj_Yspeed[(k+obj_Final)%Max_object] = 10*Math.sin(Math.PI*2/objnum*k + displacement);
        obj_expired[(k+obj_Final)%Max_object] = 0;
        obj_follow[(k+obj_Final)%Max_object] = 1;
    }
    obj_Final = (k+obj_Final)%Max_object;
}

function bullet(){
    for(var oi = 0; oi < obj_Size.length; oi++ ){
        obj_Xpost[oi] += obj_Xspeed[oi];
        obj_Ypost[oi] += obj_Yspeed[oi];
        if( obj_Xpost[oi] > x || obj_Xpost[oi] < 0 ){
            obj_expired[oi] = 1;
        }
        if( obj_Ypost[oi] > y || obj_Ypost[oi] < 0 ){
            obj_expired[oi] = 1;
        }
    }
}

function anim(){
    var j=0;
    for(var oi=0; oi<obj_Size.length; oi++ ){
        if( obj_expired[oi] == 0 )
            $(".s"+oi).css({
                'visibility': 'visible',
                'left':obj_Xpost[oi]+'px',
                'top':obj_Ypost[oi]+'px',
                'width':p+'px',
                'height':p+'px'
            });
        else
            $(".s"+oi).css( 'visibility','hidden' );
        // $(".s"+j).css({
        //     'left':x+Math.cos(k*(Math.PI/180))*i-p/2+'px',
        //     'top':y+Math.sin(k*(Math.PI/180))*i-p/2+'px',
        //     'width':p+'px',
        //     'height':p+'px'
        // });
    }
}

function divadd(){
    for(var l=0;l<Max_object;l++){
        $("#body").append('<div class="s'+l+' s"></div>');
    }
}


function game(){
    bullet();
    if( shot % obj_Agi == 0) shoot( shot );
    // disp++;
    shot+=1;
    anim();
}

window.setInterval( game , 10 );

