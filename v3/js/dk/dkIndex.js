// 名家机构切换整体页面轮播创建
new Swiper('.tapBoxSwiper', {
    loop: false,
    // 播放的速度
    speed: 300,
});
// 名家轮播创建
new Swiper('.mJSwiper', {
    loop: true,
    // 自动播放时间
    autoplay: 3000000,
    // 播放的速度
    speed: 300,
    autoplayDisableOnInteraction: false,
    pagination: '.mJSwiper .swiper-pagination',
});
//机构轮播创建
new Swiper('.jGSwiper', {
    loop: true,
    // 自动播放时间
    autoplay: 3000000,
    // 播放的速度
    speed: 300,
    autoplayDisableOnInteraction: false,
    pagination: '.jGSwiper .swiper-pagination',
});

// 名家机构切换
$(".dk_top_tab_item").on("click",function(){
    $(".dk_top_tab_item").removeClass("cur");
    $(this).addClass("cur");
    for (var i = 0; i < $(".top_tab_content_box").length; i++) {
        $($(".top_tab_content_box")[i]).css("visibility","hidden");
        $($(".top_tab_content_box")[$(this).index()]).css("visibility","visible");
    }
});

// 名家中关注 热门点击事件
$("#mj .tab_content_header_item").on("click", function () {
    $("#mj .tab_content_header_item").removeClass("main_tab_show");
    $(this).addClass("main_tab_show");
    for (var i = 0; i < $("#mj .tab_content_box_item").length; i++) {
        $($("#mj .tab_content_box_item")[i]).hide();
        $($("#mj .tab_content_box_item")[$(this).index()]).show();
    }
});
// 机构中关注 热门点击事件
$("#jg .tab_content_header_item").on("click", function () {
    $("#jg .tab_content_header_item").removeClass("main_tab_show");
    $(this).addClass("main_tab_show");
    for (var i = 0; i < $("#jg .tab_content_box_item").length; i++) {
        $($("#jg .tab_content_box_item")[i]).hide();
        $($("#jg .tab_content_box_item")[$(this).index()]).show();
    }
});


$("#mj .guandian_title_item").on("click",function(){
    $("#mj .guandian_title_item").removeClass("active");
    $(this).addClass("active");
    for (var i = 0; i < $("#mj .guandian_content").length; i++) {
        $($("#mj .guandian_content")[i]).hide();
        $($("#mj .guandian_content")[$(this).index()]).show();
    }
});
$("#jg .guandian_title_item").on("click",function(){
    $("#jg .guandian_title_item").removeClass("active");
    $(this).addClass("active");
    for (var i = 0; i < $("#jg .guandian_content").length; i++) {
        $($("#jg .guandian_content")[i]).hide();
        $($("#jg .guandian_content")[$(this).index()]).show();
    }
});

$(window).scroll(function () {
    var top1 = $('.guandian_title').offset().top - $(".i_top").outerHeight(true)-$(".action-bar-box").outerHeight(true);
    var gun = $(document).scrollTop();
    if (gun >= top1) {
        $('.guandian_title_box').addClass('fixed_top');
    }
    if (gun < top1) {
        $('.guandian_title_box').removeClass('fixed_top');
    }
});