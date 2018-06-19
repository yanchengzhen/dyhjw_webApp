/**
 * 传入数组
 * @param  {[type]} codes [description]
 * @return {[type]}       [description]
 */
function hq_connect(codes) {
    $.post('/api/token', {
        type: 'hq',
        codes: codes
    }, function (d) {
        // 实时行情
        //var wsServer = "ws://114.215.194.241:8188/hq?token=" + d.token;
        var wsServer = "ws://ws.hq.dyhjw.com/hq?token=" + d.token;
        var websocket = new WebSocket(wsServer);
        websocket.onopen = function (evt) {
            // 定时发送空字符 防止中断
            setInterval(function () {
                websocket.send('');
            }, 1000 * 3);
        };
        var deforedata;
        websocket.onmessage = function (evt) {
            var data1 = JSON.parse(evt.data);
            var data = null;
            for (var i = 0; i < data1.length; i++) {
                data = data1[i];
                data.code = data.C;
                var defore_Last = $('[code=' + data.code + ']').find('.last').find('font').eq(0).text();
                data.last = parseFloat(data.P);
                data.swing = data.ZD;
                data.swingRange = data.ZDF+"%";
                var swing = parseFloat(data.ZD);
                var swing = data.swing;
                var t = '';
                if (swing > 0) {
                    var t = '+';
                }
                if(data.C == "XAU"){
                    $('.XAU_now').text(data.last);
                    $('.XAU_swing').text(t + swing);
                    $('.XAU_swingRange').text(t + data.swingRange);
                    last = HuanSuan(data.P, 'g');
                    var LC = $('.XAUR_zd').text();
                    swing = (last-LC).toFixed(3);
                    data.swingRange = ((swing/LC)*100).toFixed(3) + '%';
                    $('.XAUR_now').text(last);
                    $('.XAUR_swing').text(t + swing);
                    $('.XAUR_swingRange').text(t + data.swingRange); 
                }else if(data.C == "XAG"){
                    $('.XAG_now').text(data.last);
                    $('.XAG_swing').text(t + swing);
                    $('.XAG_swingRange').text(t + data.swingRange);
                    last = HuanSuan(data.P, 'kg');
                    var LC = $('.XAGR_zd').text();
                    swing = (last-LC).toFixed(3);
                    data.swingRange = ((swing/LC)*100).toFixed(3) + '%';
                    $('.XAGR_now').text(last);
                    $('.XAGR_swing').text(t + swing);
                    $('.XAGR_swingRange').text(t + data.swingRange); 
                }else if(data.C == "XPD"){
                    $('.XPD_now').text(data.last);
                    $('.XPD_swing').text(t + swing);
                    $('.XPD_swingRange').text(t + data.swingRange);
                    last = HuanSuan(data.P, 'g');
                    var LC = $('.XPDR_zd').text();
                    swing = (last-LC).toFixed(3);
                    data.swingRange = ((swing/LC)*100).toFixed(3) + '%';
                    $('.XPDR_now').text(last);
                    $('.XPDR_swing').text(t + swing);
                    $('.XPDR_swingRange').text(t + data.swingRange); 
                }else if(data.C == "XPT"){
                    $('.XPT_now').text(data.last);
                    $('.XPT_swing').text(t + swing);
                    $('.XPT_swingRange').text(t + data.swingRange);
                    last = HuanSuan(data.P, 'g');
                    var LC = $('.XPTR_zd').text();
                    swing = (last-LC).toFixed(3);
                    data.swingRange = ((swing/LC)*100).toFixed(3) + '%';
                    $('.XPTR_now').text(last);
                    $('.XPTR_swing').text(t + swing);
                    $('.XPTR_swingRange').text(t + data.swingRange); 
                }else{
                    $('[code=' + data.code + ']').find('.last').find('font').text(data.last);
                    $('[code=' + data.code + ']').find('.swing').find('font').text(t + swing);
                    $('[code=' + data.code + ']').find('.swingRange').find('font').text(t + data.swingRange);
                }
                if (parseFloat(data.swing) > 0 || parseFloat(swing) > 0) {
                    $('[code=' + data.code + ']').removeClass('green');
                    $('[code=' + data.code + ']').addClass('red');

                    //hqinfo
                    $('.num_1').removeClass('green');
                    $('.num_1').addClass('red');
                    $('.num_2').removeClass('green');
                    $('.num_2').addClass('red');

                } else if (parseFloat(data.swing) < 0 || parseFloat(swing) < 0) {
                    $('[code=' + data.code + ']').removeClass('red');
                    $('[code=' + data.code + ']').addClass('green');

                    //hqinfo
                    $('.num_1').removeClass('red');
                    $('.num_1').addClass('green');
                    $('.num_2').removeClass('red');
                    $('.num_2').addClass('green');
                } else {
                    $('[code=' + data.code + '] .flash_p').removeClass('r_color').removeClass('g_color ');
                    $('[code=' + data.code + '] .flash').removeClass('red').removeClass('green');
                    $('[code=' + data.code + ']').removeClass('red');
                    $('[code=' + data.code + ']').removeClass('green');
                    //hqinfo
                    $('.num_1').removeClass('red');
                    $('.num_1').removeClass('green');
                    $('.num_2').removeClass('red');
                    $('.num_2').removeClass('green');
                }
                //hqinfo
                var fo = $('.num_1 font').text();
                var fn = $('.num_1 font').parent();
                if(fo == "(元/克)"){
                    if(fn.hasClass('XAUR_n') || fn.hasClass('XPDR_n') || fn.hasClass('XPTR_n')){
                        data.last = HuanSuan(data.last, 'g');
                        data.H = HuanSuan(data.H, 'g');
                        data.L = HuanSuan(data.L, 'g');
                        var LC = $('.now_data_li2').find('ul').children("li:last-child").find('span').text();
                        data.LC = HuanSuan(data.LC, 'g');
                        data.P = HuanSuan(data.P, 'g');
                        swing = (data.last-LC).toFixed(3);
                        data.swingRange = ((swing/LC)*100).toFixed(3) + '%';
                        if (swing > 0) {
                            t = '+';
                        }else{
                            t = '';
                        }  
                    }
                }else if(fo == "(元/千克)"){
                    if(fn.hasClass('XAGR_n')){
                        data.last = HuanSuan(data.last, 'kg');
                        data.H = HuanSuan(data.H, 'kg');
                        data.L = HuanSuan(data.L, 'kg');
                        var LC = $('.now_data_li2').find('ul').children("li:last-child").find('span').text();
                        data.LC = HuanSuan(data.LC, 'g');
                        data.P = HuanSuan(data.P, 'kg');
                        swing = (data.last-LC).toFixed(0);
                        data.swingRange = ((swing/LC)*100).toFixed(3) + '%';
                        if (swing > 0) {
                            t = '+';
                        }else{
                            t = '';
                        }
                    }
                }else{
                    swing = data.ZD;
                    data.swingRange = data.ZDF+"%";
                }
                if (parseFloat(data.swing) > 0 || parseFloat(swing) > 0) {
                    //hqinfo
                    $('.num_1').removeClass('green');
                    $('.num_1').addClass('red');
                    $('.num_2').removeClass('green');
                    $('.num_2').addClass('red');
                } else if (parseFloat(data.swing) < 0 || parseFloat(swing) < 0) {
                    //hqinfo
                    $('.num_1').removeClass('red');
                    $('.num_1').addClass('green');
                    $('.num_2').removeClass('red');
                    $('.num_2').addClass('green');
                } else {
                    //hqinfo
                    $('.num_1').removeClass('red');
                    $('.num_1').removeClass('green');
                    $('.num_2').removeClass('red');
                    $('.num_2').removeClass('green');
                }
                $('.num_1 span').text(data.last);
                $('.num_2').text(t+''+swing+' '+t+''+data.swingRange);
                $('.pz_gs ul li').eq(0).find('span').eq(1).text(data.P);

                //根据上一笔跳动
                if(floatSub(data.last,defore_Last) > 0){
                    //console.log(data.code+':'+data.last+'=>='+defore_Last)
                    flashColor($('[code=' + data.code + ']').find('.last').find('font'), 'change_up');
                }else if(floatSub(data.last,defore_Last) < 0) {
                    //console.log(data.code+':'+data.last+'=<='+defore_Last)
                    flashColor($('[code=' + data.code + ']').find('.last').find('font'), 'change_down');
                }

                //最高 最低
                $(".now_data_li2 ul li").eq(0).find('span').text(data.H);
                $(".now_data_li2 ul li").eq(2).find('span').text(data.L);

                if(typeof(leibie) != "undefined")
                {

                    var socketData = JSON.parse(evt.data)[0];
                    if (needhs) {
                        socketData.P = (rate * codef * socketData.P / 31.1035).toFixed(fixf);
                    }
                    if(leibie=='fenshi'){
                        optionDataReset(socketData);
                        option.series[0].markLine.data[0].yAxis = socketData.P.toFixed(4);
                        myChart.setOption(option);
                    }
                    

                   /* var luminute= moment(fdata[fdata.length-1].quotetime).minutes();
                    var lasttimeunix=moment(fdata[fdata.length-1].quotetime).unix();
                    addfcdata(data,luminute);
                    //chart runtime
                    if(typeof(leibie) != "undefined"&&data.code==code)
                    {
                        if(leibie=='fenshi')
                        {
                            updatezoushi(data);
                        }
                        else if(leibie=='candle')
                        {
                            updatecandle(data,interval);
                        }
                    }*/
                }

            }
           

        };
        websocket.onclose = function (evt) {
        };
        websocket.onerror = function (evt, e) {
        };
    }, 'json');
}
//换算
function HuanSuan(n, unit){
    var hl = parseFloat($('.huilv').text());
    m = (n * hl) / 31.1035;
    if(unit == 'g'){
        res = m.toFixed(3);
    }else if(unit == 'kg'){
        m = m*1000;
        res = m.toFixed(0)
    }
    return res;
}
//更新数据闪亮一下
function flashColor(ele, color) {
    ele.addClass(color);
    setTimeout(function() {
        ele.removeClass(color);
    }, 500);
}
//减
function floatSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return parseFloat(((arg1*m-arg2*m)/m).toFixed(n));
}
//除
function floatDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}

    r1=Number(arg1.toString().replace(".",""));

    r2=Number(arg2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
}
function kx_connect(type) {
    $.post('/api/token', {
        type: type
    }, function (d) {
        // 实时行情
        //var wsServer = "ws://114.215.194.79:8182/kx?token=" + d.token;
        var wsServer = "ws://ws.kx.dyhjw.com/kx?token=" + d.token;
        var websocket = new WebSocket(wsServer);
        websocket.onopen = function (evt) {
            // 定时发送空字符 防止中断
            setInterval(function () {
                websocket.send('');
            }, 1000 * 3);
        };
        websocket.onmessage = function (evt) {
            var data = JSON.parse(evt.data);
            //console.log(data);
            if (data.type == 2) {
                $('[autoid=' + data.autoid + ']').find('.reality').text(data.reality);
            }

        };
        websocket.onclose = function (evt) {
        };
        websocket.onerror = function (evt, e) {
        };
    }, 'json');
}

function browser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }
    ; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }
    ; //判断是否IE浏览器
}
/**
 * 倒计时
 * @param  {[type]} y       [description]
 * @param  {[type]} m       [description]
 * @param  {[type]} d       [description]
 * @param  {[type]} h       [description]
 * @param  {[type]} i       [description]
 * @param  {[type]} s       [description]
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function timer(y, m, d, h, i, s, element, fun) {
    m = m - 1;
    var ts = (new Date(y, m, d, h, i, s)) - (new Date()); //计算剩余的毫秒数
    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
    var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
    var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
    var _s = ss;
    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);
    var str = '';
    if (dd != '00') {
        str += dd + "天";
    }
    if (hh != '00') {
        str += hh + "时";
    }
    if (mm != '00') {
        str += mm + "分";
    }
    str += ss + "秒";

    if (parseFloat(ts) < 0) {
        document.getElementById(element).innerHTML = '公布中';
        // eval(fun+'()');
    } else {
        document.getElementById(element).innerHTML = str;
    }

}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

/**
 * 获取GET参数
 * @param {[type]} name [description]
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/**
 * 字符串转dom
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE;
};

//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可是范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}


function hq_connect_index(codes) {
    $.post('/api/token', {
        type: 'hq',
        codes: codes
    }, function (d) {
        // 实时行情
        //var wsServer = "ws://114.215.194.241:8188/hq?token=" + d.token;
        var wsServer = "ws://ws.hq.dyhjw.com/hq?token=" + d.token;
        var websocket = new WebSocket(wsServer);
        websocket.onopen = function (evt) {
            // 定时发送空字符 防止中断
            setInterval(function () {
                websocket.send('');
            }, 1000 * 3);
        };
        //var deforedata;
        websocket.onmessage = function (evt) {
            var data1 = JSON.parse(evt.data);
            var data = null;
            for (var i = 0; i < data1.length; i++) {
                data = data1[i];
                data.code = data.C;
                data.last = parseFloat(data.P);
                data.ZD = parseFloat(data.ZD);
                if(typeof(jsonQuote) != "undefined"){
                    for (var i in jsonQuote){
                        if(jsonQuote[i].Code==data.code){
                            var defore_Last = $('[code=' + data.code + ']').find('.last').text();
                            //deforedata = jsonQuote[i];
                            break;
                        }
                    }
                    $('[code=' + data.code + '] .last').text(data.P);

                    if(data.ZD > 0){
                        $('[code=' + data.code + '] .last').parent().addClass('r_color');
                        $('[code=' + data.code + '] .last').parent().removeClass('g_color');
                        $('[code=' + data.code + '] .swing').text("+"+data.ZD);
                        $('[code=' + data.code + '] .swingRange').text("+"+data.ZDF+"%");

                        $('[code=' + data.code + '] .swing').addClass('red').removeClass('green');
                        $('[code=' + data.code + '] .swingRange').addClass('red').removeClass('green');
                    }
                    else
                    {
                        if(data.ZD<0)
                        {
                            $('[code=' + data.code + '] .last').parent().addClass('g_color');
                            $('[code=' + data.code + '] .swing').addClass('green').removeClass('red');
                            $('[code=' + data.code + '] .swingRange').addClass('green').removeClass('red');
                        }
                        else
                        {
                            $('[code=' + data.code + '] .last').parent().removeClass('g_color');
                            $('[code=' + data.code + '] .swing').removeClass('green').removeClass('red');
                            $('[code=' + data.code + '] .swingRange').removeClass('green').removeClass('red');
                        }
                        $('[code=' + data.code + '] .last').parent().removeClass('r_color');
                       
                        $('[code=' + data.code + '] .swing').text(data.ZD);
                        $('[code=' + data.code + '] .swingRange').text(data.ZDF+"%");
                    }
                    
                    
                    //根据上一笔跳动
                    if(floatSub(data.last, defore_Last) > 0){
                        flashColor($('[code=' + data.code + ']'), 'change_up');
                        
                    }else{
                        flashColor($('[code=' + data.code + ']'), 'change_down');
                       
                    }
                }
            }
            if(typeof(jsonQuote) != "undefined"){
                for (var i in jsonQuote){
                    if(jsonQuote[i].Code==data1[0].C){
                        jsonQuote[i].Code = data1[0].C;
                        jsonQuote[i].Last = data1[0].P;
                        break;
                    }
                }
            }

        };
        websocket.onclose = function (evt) {
        };
        websocket.onerror = function (evt, e) {
        };
    }, 'json');
}