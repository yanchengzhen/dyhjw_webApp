var data_type = "all";  //数据类型
var type = "all";
var data_impt = "all";  //重要程度
var area = "all";       //区域
$(
    function () {
        var Object = {
            //获取指定日期的数据
            "getDatacurl": function (date, url_path) {
                if (!date || !url_path) {
                    return false;
                }
                var param = {'type': data_type, 'area': area, 'data_impt': data_impt};
                $.ajax({
                    type: "POST",
                    url: url_path,
                    data: {"date": date, 'param': param},
                    dataType: "json",
                    success: function (data) {
                        // console.log(data.economic);
                        //刷新页面
                        //data = JSON.parse(data);

                        $('#economic').html(data.economic);
                        $('#holiday').html(data.holiday);
                        $('#import').html(data.import);
                        typechange();


                    }
                });

            }
        }
        window.CJRL = Object;
    }
)


function typechange() {
    var posg = data_type.indexOf("gold");
    var poso = data_type.indexOf("oil");
    var posd = data_type.indexOf("dollar");


    if (posg == -1 && poso == -1) {
        $(".gold").parent().hide();
    }
    else {
        $(".gold").parent().show();
    }
    if (posg > -1) {
        $(".gold").show();
    }
    else {
        $(".gold").hide();
    }
    if (poso > -1) {
        $(".oil").show();
    }
    else {
        $(".oil").hide();
    }

    if (posd > -1) {
        $(".dollar").show();
    }
    else {
        $(".dollar").hide();
    }

}


function newDate(str) {
    str += ' 00:00:00';
    str1 = str.split(' ');
    str = str1[1].split(':');
    str2 = str1[0].split('-');
    var date = new Date();
    date.setFullYear(str2[0], str2[1] - 1, str2[2]);
    date.setHours(str[0]);
    date.setMinutes(str[1]);
    date.setSeconds(str[2])
    return date;
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//获取指定日期的前后15天所有日期
function MSday_2(date) {
    var now = newDate(date);
    var nowTime = now.getTime();
    var day = now.getDay();
    var oneDayLong = 24 * 60 * 60 * 1000;
    var FirstTime = nowTime - (15) * oneDayLong;
    var LastTime = nowTime + (15) * oneDayLong;
    var firstday = new Date(FirstTime);

    var firstdaytime = FirstTime;
    startDate = firstday;
    endDate = new Date(LastTime);

    var d = {"now": []};

    for (var j = 0; j < 31; j++) {
        var today = new Date(firstdaytime);
        d['now'].push(today.Format('yyyy-MM-dd'));
        firstdaytime += oneDayLong;
    }

    d.today = date;
    return d;
}

function showDay(type, d) {
    var html = "";
    var days = null;
    //不是本周，设置默认第几天
    var default_day = 1;
    if (type == 'now') {
        days = d.now;
    }

    var desc = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];


    for (var i = 0; i < days.length; i++) {
        //days[i] = date('m-d',strtotime(days[i]." 00:00:00"));
        //show = split('-',$days[i]);
        var show = days[i];
        var date = newDate(show);
        var weekd = date.getDay();
        show = date.Format('dd');
        var c = '';
        if (days[i] == d.today) {
            c = 'cur';
        }
        html += "<li class='" + c + " swiper-slide' data-date='" + days[i] + "'><a  href='javascript:;'><span>" + desc[weekd] + "</span><em>" + show + "</em></a></li>";
    }

    $('.main_day ul').html(html);


    //设置月份
    var date1 = d.today.split('-');
    var month = parseInt(date1[1]) + "月";
    $('.main_month span').text(month);

    //rili周日.
    $(".main_day ul li").click(function () {
        //$('body').children().on("click", '.main_day ul li', function(){
        $(".main_day ul li").removeClass("cur");
        $(this).addClass("cur");

        var date1 = $(this).data('date').split('-');
        var month = parseInt(date1[1]) + "月";
        $('.main_month span').text(month);

        var requestDate = new Date($(this).data('date'));
        $("#appDate").scroller('setDate', requestDate, true);

        //获取指定时间的日历数据
        getDatajson($(this).data('date'));
    })
}

// var wH = document.documentElement.clientHeight;
// var mth = wH-$(".side_menu_box").outerHeight()+$(".main_change").outerHeight();
// $(".main_data").css("height",mth)
//筛选
var pd = true;
//$(".main_choose").click(function(){
$('body').children().on("click", '.main_choose', function () {
    $(".opacity3").fadeToggle();
    $(".main_data").slideToggle();
    if (pd) {
        $(".main_te").css("height", "10px");
        $(".main_choose a").addClass("xl");
        pd = false;
    } else {
        $(".main_te").removeAttr("style");
        $(".main_choose a").removeClass("xl");
        pd = true;
    }
});
//筛选取消
$(".main_remove").on("click",function(){
    $(".main_te").removeAttr("style");
    $(".main_data").slideUp();
    $(".opacity3").fadeToggle();
    $(".main_choose a").removeClass("xl");
    pd = true;
})

//重要性
//$("#data_impt li").click(function(){
$('body').children().on("click", '#data_impt li', function () {
    if ($(this).find("a").attr("nature") == "all") {
        if ($(this).hasClass("cur")) {
            false;
        } else {
            $("#data_impt li").removeClass("cur");
            $(this).toggleClass("cur");
        }
    } else {
        var cflag = true;
        if ($(this).hasClass("cur")) {
            $(this).removeClass("cur");
            cflag = false;
        }
        var curs = $("#data_impt li.cur");
        if (curs.length > 1 || curs.length == 0) {
            $("#data_impt li").removeClass("cur");
            $("#data_impt li a[nature=all]").parent().addClass("cur");
        } else {
            $("#data_impt li a[nature=all]").parent().removeClass("cur");
            if (cflag)
                $(this).toggleClass("cur");
        }
    }
    var curs = $("#data_impt li.cur a");
    var data_imptc = new Array();
    for (var i = 0; i < curs.length; i++) {
        data_imptc[i] = $(curs[i]).attr('nature');
    }
    data_impt = data_imptc.join('_');
});

// 数据类型
//$("#data_type li").click(function(){
$('body').children().on("click", '#data_type li', function () {
    if ($(this).find("a").attr("nature") == "all") {
        if ($(this).hasClass("cur")) {
            false;
        } else {
            $("#data_type li").removeClass("cur");
            $(this).toggleClass("cur");
        }
    } else {
        var cflag = true;
        if ($(this).hasClass("cur")) {
            $(this).removeClass("cur");
            cflag = false;
        }
        var curs = $("#data_type li.cur");
        if (curs.length > 1 || curs.length == 0) {
            $("#data_type li").removeClass("cur");
            $("#data_type li a[nature=all]").parent().addClass("cur");
        } else {
            $("#data_type li a[nature=all]").parent().removeClass("cur");
            if (cflag)
                $(this).toggleClass("cur");
        }
    }
    var curs = $("#data_type li.cur a");
    var data_typec = new Array();
    for (var i = 0; i < curs.length; i++) {
        data_typec[i] = $(curs[i]).attr('nature');
    }
    data_type = data_typec.join('_');
})

// 区域选择
$('body').children().on("click", '#data_area li', function () {
    if ($(this).find("a").attr("nature") == "all") {
        if ($(this).hasClass("cur")) {
            false;
        } else {
            $("#data_area li").removeClass("cur");
            $(this).toggleClass("cur");
        }
    } else {
        var cflag = true;
        if ($(this).hasClass("cur")) {
            $(this).removeClass("cur");
            cflag = false;
        }
        var curs = $("#data_area li.cur");
        if (curs.length > $("#data_area li").length-3 || curs.length == 0) {
            $("#data_area li").removeClass("cur");
            $("#data_area li a[nature=all]").parent().addClass("cur");
        } else {
            $("#data_area li a[nature=all]").parent().removeClass("cur");
            if (cflag)
                $(this).toggleClass("cur");
        }
    }
    var curs = $("#data_area li.cur a");
    var area_typec = new Array();
    for (var i = 0; i < curs.length; i++) {
        area_typec[i] = $(curs[i]).attr('nature');
    }
    area = area_typec.join('_');
})

//打开关闭
$(".zy_off span").click(function () {
    $(this).toggleClass("off");
})
//重置按钮按下效果
$(".rest_btn").mousedown(function () {
    $(this).addClass("cl")
})
$(".rest_btn").mouseup(function () {
    $(this).removeClass("cl")
})


$(function () {
    //初始化，显示当日
    var d = new Date();
    var t = d.toLocaleDateString().split('/').join('-');
    t = d.Format('yyyy-MM-dd');
    showDay('now', MSday_2(t));
    var selectedindex = eval($(".cjrl_time li.cur").index() - 3);
    swiperRili = new Swiper('.main_day', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide: selectedindex
    });
});


function analyeffect(type) {
    var span = "";
    var gold = "";
    var oil = "";
    var dollar = "";

    var data_typearr = data_type.split("_");

    if (type == 2) {
        span = '<a href="javascript:void(0);" class="xiao">影响较小</a><span class="ygb">已公布</span>';
    }
    else if (type == 0)//利空金银
    {


        if ($.inArray("gold", data_typearr) > -1)
            gold = '<span class="gold">金银</span>';
        else
            gold = '<span class="gold" style="display:none;">金银</span>';

        if ($.inArray("oil", data_typearr) > -1)
            oil = '<span class="oil">石油</span>';
        else
            oil = '<span class="oil" style="display:none;">石油</span>';

        if ($.inArray("dollar", data_typearr) > -1)
            dollar = '';
        else
            dollar = 'style="display: none;"';


        span = '<a href="javascript:;" class="kong"><span>利空</span> ' + gold + '' + oil + '</a>';
        span += '<a href="javascript:;" class="duo dollar" ' + dollar + ' ><span>利多</span><span>美元</span></a>';
    }
    else { //利多金银


        if ($.inArray("gold", data_typearr) > -1)
            gold = '<span class="gold">金银</span>';
        else
            gold = '<span class="gold" style="display:none;">金银</span>';

        if ($.inArray("oil", data_typearr) > -1)
            oil = '<span class="oil">石油</span>';
        else
            oil = '<span class="oil" style="display:none;">石油</span>';

        if ($.inArray("dollar", data_typearr) > -1)
            dollar = '';
        else
            dollar = 'style="display: none;"';


        var lduo = "";

        if (data_type == "dollar") {
            lduo = 'style="display: none;"';
        }

        span = '<a href="javascript:;" class="duo" ' + lduo + '><span>利多</span>' + gold + '' + oil + '</a>';
        span += '<a href="javascript:;" class="kong dollar" ' + dollar + '><span>利空</span><span>美元</span></a>';
    }
    return span;
}


//页面加载完成之后
$(function () {

    var wsReconnect = function () {

        this.ws = null;
        this.timeInterval;

        var local = this;

        //this.dataHqLoginString = 'ws://114.215.194.79:8182/';   //socket接口地址
        this.dataHqLoginString = 'ws://ws.kx.dyhjw.com/';   //socket接口地址

        this.listenEvent = function () {

            //连接建立时触发
            local.ws.onopen = function (e) {
                //连接成功
                // console.log("socket connect success!");
                setInterval(function () {
                    local.ws.send('');
                }, 1000 * 3);
            };

            //有消息到来时触发
            local.ws.onmessage = function (e) {
                var data = JSON.parse(e.data);
                var effect = analyeffect(data.effecttype);
                var dclass = "";
                if (data.effecttype == 2)
                    dclass = 'class="xiao"';
                else if (data.effecttype == 1)
                    dclass = 'class="red"';
                else
                    dclass = 'class="green"';
                $('[autoid=' + data.autoid + ']').find(".nozhi").html("公布:<span " + dclass + ">" + data['reality'] + "</span>");
                $('[autoid=' + data.autoid + ']').find(".te_time").html(effect + '<span class="ygb">已公布</span>');
            };

            //连接关闭事件
            local.ws.onclose = function (e) {
                setTimeout(function () {
                    location.reload();
                }, 1000 * 60 * 10);
            };

            //异常事件
            local.ws.onerror = function (e) {
                // console.log("error");
            };
        }

        /**
         * 链接socket
         * @param  {string} type 需要获取的内容type
         */
        this.connect = function (type) {

            if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
                local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie("calendar_Token"));
                local.listenEvent();
            }
        }
    }

    //连接快讯websocket
    var wsr = new wsReconnect();
    wsr.connect("kx");


})
