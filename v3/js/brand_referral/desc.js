$(function(){
    //可查询最低价格
    $(".count_radio a:first").addClass('cur');
    $(".count_radio a").click(function(){
        $(".count_radio a").removeClass('cur');
        $(this).addClass('cur');
    })



})
