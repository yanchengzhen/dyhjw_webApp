$(function(){

    $('.main_more').unbind('click').click(function(event) {
        $('.main_more a').text('加载中...')
        function parseDom(arg) {
            var objE = document.createElement("div");
            objE.innerHTML = arg;
            return objE;
        }

        $.ajax({
        type:"GET",//请求方式
        url:ajaxmore,//请求路径
        data:{'cate':cate,'p':p,'tuijian':tuijian},
        dataType:"json",
        success: function(data){
        //成功处理函
            if(data.status)
            {
                if(data.list&&data.list.length>0)
                {
                    loadmore(data.list);
                    p++;
                    window.isLoad = false;
                }
                else
                {
                    $('.main_more').hide();
                    $('.no_more').show();
                }
            }
        }
        });
    });

    window.onscroll = function () {
        if (getScrollHeight()-getScrollTop() - getClientHeight() <400 && !window.isLoad) {
            $('.main_more').click();
            window.isLoad = true;
        }
    }
})
function lazy(){
	$("img.lazy1").lazyload({
		skip_invisible : false,
		 failure_limit : 60
	});
}
function loadmore(data)
{
    var divs='';
    for(var i=0;i<data.length;i++)
    {
        var image="";
        var hot="";
        
        if(data[i].image!="")
        image='<img src="/Public/Mobile1/images/index/no_img.svg" data-original="'+data[i].image+'" class="lazy1">';

        var perdiv = '<li><div class="news_demo1 news_li_list"><a href="'+data[i].url+'">'
                   + image
                   + '<div class="news_word_dm"><h2>'+data[i].title+'</h2><div class="time_box">'
                   + '<span class="time">'+data[i].pushtime+'</span>/<span class="name">'+data[i].author+'</span></div>'
                   + '</div></a></div></li>';
        divs+=perdiv;
        
    }
    $("#newslist").append($(divs));
    if($("img.lazy1").length>0){
		lazy();
	}
    
}

