//屏幕自适应
// (function (doc, win) {
//   var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function () {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       docEl.style.fontSize = 32 * (clientWidth / 320) + 'px';
//     };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);
//
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "y+": this.getFullYear(), //月份
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 检测是否是手机
function isMobile(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["ndroid",'Adr',"iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > -1) {
            flag = true;
            break;
        }
    }
    return flag;
}

 
//判断是否已经存在了cookie
 function checkcookie(gindex){
     var thiscookie = 'sdcity_foodmap_goodplus' + gindex;
     var mapcookie = getCookie(thiscookie)
     if (mapcookie!=null && mapcookie!=""){
         return false;
     }else {
        setCookie(thiscookie,thiscookie,365);
        return true;
     } 
 }
  function checkcookie2(gindex){
     var thiscookie = 'sdcity_foodmap_goodplus' + gindex;
     var mapcookie = getCookie(thiscookie)
     if (mapcookie!=null && mapcookie!=""){
         return false;
     }else {
        return true;
     } 
 }
//获取URL参数
function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return  unescape(r[2]);
    return null;
}

var type = getQueryString('type');

if (type == "pc") {
    setCookie("visitType", "pc");
} else if (type == "mobile") {
    setCookie("visitType", "mobile");
}
var visitType = getCookie("visitType");

// if(!isMobile() && visitType!='mobile'){
//     var lhref=window.location.href;
//     lhref=lhref.replace(/m/,"www");
//     window.location.href=lhref;
// }

function lazypicload()
{
    //图片延迟加载
        if($("img.lazy").length>0){
            $("img.lazy").lazyload({
                skip_invisible : false,
                 effect:"fadeIn",
                 failure_limit : 30
            });
        }
}
$(function() {
    //蓝色导航浮动
    //var hdDemo = $(".huadong");
    //var hdT = $(".top_box").height();
    //$(window).scroll(function() {
    //
    //    if($(this).scrollTop()>hdT){
    //        hdDemo.css("position","fixed").css("top","0");
    //    }
    //    else{
    //        hdDemo.css("position","fixed").css("top","1.2222rem");
    //    }
    //});


    /*广告位点击增加点击量*/
    // $(document).on('click','.ad_click',function() {
    //     var aid = $(this).data('id');
    //     $.ajax({
    //         url:"?s=/api/adClick",
    //         type:'get',
    //         data:'aid='+aid,
    //         success:function(res) {

    //         }
    //     });
    //    // return false;
    // });
    
	//点击导航下拉
	$(".huadong #menu_select_btn").click(function(){
		if($(this).hasClass("up_click")){
			$(this).removeClass("up_click").addClass("down_click");
			$(".select_list_box").addClass("show");
		}
		else{
			$(this).removeClass("down_click").addClass("up_click");
			$(".select_list_box").removeClass("show");
		}
	})
	$(".down_fix_close").click(function(){
		$(".down_app").remove();
	})
	$(".side_menu_box .fixed").css("position","fixed");
	lazypicload();

        //底部广告
        $(".bottom_xl_close").click(function() {
                $(".b_app").hide();
                $(".adv_dw").css({
                    "height": "0",
                    "padding": "0"
                });
            })
            //默认顶部悬浮
      /*  var mH = $(".top").height();
        $(window).scroll(function() {
                if ($(".huadong").length > 0) {
                    if ($(this).scrollTop() > mH) {
                        $(".huadong").addClass("fixed");
                        $(".hd_fenl").css("display", "block");
                    } else {
                        $(".huadong").removeClass("fixed");
                        $(".hd_fenl").css("display", "none");
                    }
                }
            })*/
            //顶部要闻...
            // $(".huadong .swiper-container a").click(function(){
            //     var len=0;
            //     var ii;

        //     var x=$(this).index();
        //     for(ii=0;ii<x;ii++){
        //         len=len+$(".huadong .swiper-container a").eq(ii).outerWidth();
        //     }
        //     //console.log(len);
        //     $(".huadong .swiper-container").css("transform","translateX(-"+len+"px)");
        //     $(".huadong .swiper-container a").removeClass('cur');
        //     $(this).addClass('cur');
        // })

        // var fr_top;
        // var scl_top;
        // var bm_text=$(".footer").outerHeight();
        // console.log(bm_text);

        // $(window).scroll(function() {
        //   fr_top=$(".footer").offset().top;
        //   scl_top=$(this).scrollTop();

        //   console.log("与底部的距离"+fr_top);
        //   console.log("滚动的距离"+scl_top);

        //   if (scl_top > fr_top-10) {
        //       alert(1);
        //   }
        // })
        //顶部分类下拉
        if($(".side_menu_btn").length>0){
            $(".top_xl_close").css("display","block");
        }
		
		var llqH = window.innerHeight;
		
        var bool = true;
        $(".side_menu_btn").click(function() {
			
            $(".top_xl").slideToggle();
			var xltH = $(".top_xl .pdh").height()+$(".side_menu_box").height();
            if (bool) {
                $(".huadong .hd_fenl span").addClass("anmt");
				if(xltH<llqH){
					document.ontouchmove = function(e) {
						e.preventDefault();
					}
					bool = false;
				}
            } else {
                $(".huadong .hd_fenl span").removeClass("anmt");
                if(xltH<llqH){
					document.ontouchmove = function(e) {
						e.stopPropagation();
					}
					bool = true;
				}
            }
        })
        $(".top_xl_close").click(function(){
			var xltH = $(".top_xl .pdh").height()+$(".side_menu_box").height();
            $(".top_xl").slideUp();
			if(xltH<llqH){
				document.ontouchmove = function(e) {
					e.stopPropagation();
				}
				bool = true;
			}
        })
            //置顶隐藏
        $(window).scroll(function() {
            $('.qrcode').fadeOut(100);
            $('.QR_code_box').fadeOut(100);//
//			if ($(this).scrollTop() < 500) {
//				$(".go_top").css("display", "none");
//			}
		})
		function touchmove(){
			var startY = '';     // 触摸开始时的纵坐标  
			var moveY = '';     // 触摸移动中的纵坐标    
	  
			document.addEventListener('touchstart',touch, false);  
			document.addEventListener('touchmove',touch, false);  
			  
			function touch (event) {  
				var event = event || window.event;   
				switch(event.type){  
					case "touchstart":  
						startY = event.touches[0].clientY;  
						break;  
					// case "touchend":  
					//  break;  
					case "touchmove":  
						wscrollT = document.body.scrollTop;
						moveY = event.touches[0].clientY;  
						if (moveY > startY && wscrollT>500) {  
						//向上滑动
							$(".go_top").css("display", "block");
							$(".go_top").delay(4000).fadeOut(); 
						}
						 else {  
						//向下滑动
							$(".go_top").css("display", "none");
						}  
						break;  
				}  
			}
		}
			  
		var zwg = document.body.scrollHeight;
		var fblg =  window.screen.height*1.5;
		//页面高度小于屏幕高度X1.5时不加载触屏滑动事件
		if(zwg>fblg){
			touchmove();
		}
		
        //二维码
        $('.yhfk').click(function(){
            $('.qrcode').fadeOut(300);
            $('.QR_code_box').fadeToggle(300);
        })
        $('.yjfk_btn').click(function(){
            $('.qrcode').fadeToggle(300);
            $('.QR_code_box').fadeOut(300);
        })
            //向上向下滚动广告显示隐藏
            // var sign=20;
            // $(window).scroll(function(){

        //     if (getScrollHeight()-getScrollTop() - getClientHeight() <120 ) {
        //                     $(".bm_adv").css("display", "block");
        //                 }else{
        //                    if ($(this).scrollTop() > 1) {
        //                     $(".totop").css("display", "block");
        //                     } else{
        //                     $(".totop").css("display", "none");
        //                     }

        //                     var scrtop =document.documentElement.scrollTop||document.body.scrollTop;
        //                     if (scrtop > sign) {//向下滚动
        //                       sign = scrtop;
        //                         $(".bm_adv").css("display", "block");
        //                     }
        //                     if (scrtop < sign) {//向上滚动
        //                       sign = scrtop;
        //                       $(".bm_adv").css("display", "none");
        //                     }
        //                 }
        // });

        $(".go_top").click(function() {
            $('html,body').stop().animate({
                scrollTop: 0
            }, 300);
        });

        //content点赞
        $(".main_zan a").click(function() {
            $(this).addClass("yizan");

            var tagid = $(this).attr('tagid');
            var zambia = $(this).attr('zambia');

            $.post("/m.php?s=/api/zambia.html", {
                tagid: tagid
            }, function(data) {
                if (typeof(data) != "object") {
                    data = JSON.parse(data);
                }
                if (data.status) {
                    var zan_str, zan_arr;

                    zan_str = $.cookie('zan_arr');

                    if (typeof(zan_str) != 'undefined') {
                        zan_arr = zan_str.split(',');
                    } else {
                        zan_arr = [];
                    }
                    zan_arr.push(tagid);

                    $.cookie('zan_arr', zan_arr.join(','));

                    zambia++;
                    $(".main_zan").find("a").text(zambia);
                    $(".zan").fadeIn(500, function() {
                        $(".zan").fadeOut(1500);
                    })
                } else {
                    $(".zan_ok").fadeIn(500, function() {
                        $(".zan_ok").fadeOut(1500);
                    })
                }
            })

        })

        //q_desc广告图
        var bool = true;
        $(".main_arr").click(function() {
                if (bool) {
                    $(".main_adv img").slideUp();
                    $(this).css({
                        transform: "rotate(180deg)"
                    });
                    bool = false;
                } else {
                    $(".main_adv img").slideDown();
                    $(this).css({
                        transform: "rotate(0deg)"
                    });
                    bool = true;
                }
            })
            //q_desc分时图...
        $(".main_zst ul li").click(function() {

                $(".main_zst ul li").removeClass("cur");
                $(this).addClass("cur");

                //更多+下拉
                $(".main_gd div").slideUp();
                $(".main_gd div a").removeClass("cur");
                $(".gd_top").removeClass("atop");
                $(".gd_top").removeClass("atopt");
            })
            //更多...
        $(".gd_top").click(function() {

                $(".main_gd div").slideToggle();
                $(this).toggleClass("atop");
            })
            //q_desc5分...
        $(".main_gd div a").click(function() {

            $(".main_gd div a").removeClass("cur");
            $(this).addClass("cur");

            //分时一栏+下拉+更多
            $(".main_zst ul li").removeClass("cur");
            $(".main_gd div").slideUp();
            $(".gd_top").removeClass("atop").addClass("atopt");
        })

        // 定位划动导航位置
        //navPos();
      

    }) //最外层

// 定位划动导航位置
function navPos() {
    var len = 0;
    var ii;
    var x = $('.main_top li.cur').index();
    if (!$('.main_top li:last').hasClass('cur')) {

        for (ii = 0; ii < x; ii++) {
            len = len + $(".main_top li").eq(ii).outerWidth();
        }
        $(".main_top").css("transform", "translateX(-" + len + "px)");
        $(".main_top li").removeClass('cur');
        $('.main_top li').eq(x).addClass('cur');
        // $('.titlefont').text($('.main_top a').eq(x).text());
    }
}


function setCookie(c_name, value,expiredays)
{
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays);
    if(expiredays==1)
    {
        exdate = new Date()
        exdate.setDate(exdate.getDate() + 1);
        exdate.setHours(4);
        exdate.setMinutes(0);
        exdate.setSeconds(0);
        exdate.setMilliseconds(0);
    }
    document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
    var arr,reg=new RegExp("(^| )"+c_name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))
    {
        return unescape(arr[2]);
    }else{
        return null;
    }
}


