$('head').append(
	'<style type="text/css">#container { display: none; } #fade, #loader { display: block; }</style>'
);

var pageH;
$(window).on("load",()=>{ // 全ての読み込み完了後に呼ばれる関数
	pageH = height;

	$("#fade").css("height", pageH).delay(900).fadeOut(800).queue(()=>{
        titleserect=true;
    });
	$("#loader").delay(600).fadeOut(300);
	$("#pixiview").css("display", "block");
});