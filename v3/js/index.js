$(document).ready(function(){
	//var hdDemo = $(".huadong");
	//var hdT = $(".top_box").height();
	//$(window).scroll(function() {
    //
	//	if($(this).scrollTop()>hdT){
	//		hdDemo.css("position","fixed").css("top","0");
	//	}
	//	else{
	//		hdDemo.css("position","absolute").css("top","1.2222rem");
	//	}
	//})
	//
	$dragBln = false;




	$(".main_image").bind("mousedown", function() {
		$dragBln = false;
	});

	$(".main_image").bind("dragstart", function() {
		$dragBln = true;
	});

	$(".main_image a").click(function(){
		if($dragBln) {
			return false;
		}
	});

	timer = setInterval(function(){
		$("#btn_next").click();
	}, 5000);

	$(".main_image").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		}, 5000);
	});
	$(".wap_alert_p .close_btn").click(function(){
		$(".wap_alert_p").remove();
	})
	$(".wap_alert_p").delay(6000).fadeOut();


})//最外层

