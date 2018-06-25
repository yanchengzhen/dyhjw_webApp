$(function() {
    //黄金价格走势
    $(".main_tab li:first").addClass('cur');
    $(".main_tab li").hover(function() {
        /*复位品牌复选框*/
        // var pinpai1 = $('select[name=bid1],select[name=bid2]');
        // pinpai1.val(0);
        // pinpai1.next('select').html('');
        if ($(this).hasClass('cur')) {
            return false;
        }
        var bid = $(this).find('a').attr('bid');
        _init_bijia(bid);
        var url = $(this).find('a').attr('data-url');
        $.post(url, {
            'jindian_getBrandPriceScope': {
                'bid': bid
            }
        }, function(data) {
            option = {};
            var n_series = data.jindian_getBrandPriceScope.series;
            var series = [];
            var y_flag = false;
            for(var i in n_series) {
                var temp = {};
                temp.name = n_series[i].name;
                temp.data = [];
                for(var j in n_series[i].data) {
                    temp.data.push(parseFloat(n_series[i].data[j]));
                    if(parseFloat(n_series[i].data[j]) > 5000) {
                        temp.yAxis = 1;
                        y_flag = true;//需要增加一个y坐标轴
                    }
                }
                temp.lineWidth=1.5;
                temp.marker={radius:2};
                series.push(temp);
            }
            option.series = series;
            option.title = {
                text: '',
                x: -20
            }
            option.xAxis = {};
            var categories = [];
            /*for(var i in data.jindian_getBrandPriceScope.categories){
                categories.push(data.jindian_getBrandPriceScope.categories[i]);
            }*/
            for(var i in n_series[0].origin_data){

                categories.push(n_series[0].origin_data[i].date);
            }
            option.xAxis.categories = categories;

            if(y_flag) {
                /*增加一个y轴*/
                option.yAxis = [{
                    title: {
                        text: ''
                    },
                    tickPositioner: function () {
                        var positions = [],
                            tick = Math.floor(this.dataMin),
                            increment = Math.ceil((this.dataMax - this.dataMin) / 8);
                        for (tick; tick - increment <= this.dataMax; tick += increment) {
                            positions.push(tick);
                        }
                        return positions;
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },{
                    title: {
                        text: null
                    },
                    tickPositioner: function () {
                        var positions = [],
                            tick = Math.floor(this.dataMin),
                            increment = Math.ceil((this.dataMax - this.dataMin) / 8);
                        for (tick; tick - increment <= this.dataMax; tick += increment) {
                            positions.push(tick);
                        }
                        return positions;
                    },
                    opposite: true,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#000'
                    }]
                }];
            }else {
                option.yAxis = {
                    title: {
                        text: ''
                    },
                    tickPositioner: function () {
                        var positions = [],
                            tick = Math.floor(this.dataMin),
                            increment = Math.ceil((this.dataMax - this.dataMin) / 8);
                        for (tick; tick - increment <= this.dataMax; tick += increment) {
                            positions.push(tick);
                        }
                        return positions;
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                };
            }
            option.credits = {
                text: '',
                href: 'http://www.dyhjw.com'
            }
            var chart = new Highcharts.Chart('zst_svg', option);

        })
        $(".main_tab li").removeClass('cur');
        $(this).addClass('cur');
    }, function() {})

    // 比价
    $('.bijia').click(function() {
        var url = $(this).attr('data-url');
        var form_data = $('#form_bijia').serializeArray();
        var post_data = {}
        for (i in form_data) {
            post_data[form_data[i].name] = form_data[i].value
        }
        /*如果未选择产品，不比价*/
        if(post_data.vid1 == 0 || post_data.vid1 == undefined || post_data.vid2 == 0 || post_data.vid2 == undefined) {
            return false;
        }
        $.post(url, {
            jindian_getPricesScope: post_data
        }, function(data) {
            option = {};
            var series = data.jindian_getPricesScope.series;
            for(var i in series) {
                series[i].lineWidth = 1.5;
                series[i].marker = {radius:2};
            }
            option.series = series;
            option.title = {
                text: '',
                x: -20
            }
            option.xAxis = {}
            var categories = [];
            /*for(var i in data.jindian_getPricesScope.categories){
                categories.push(data.jindian_getPricesScope.categories[i]);
            }*/
            for(var i in n_series[0].origin_data){


                categories.push(n_series[0].origin_data[i].date);
            }
            option.xAxis.categories = categories;
            //option.xAxis.categories = data.jindian_getPricesScope.categories;

            option.yAxis = {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            };
            option.credits = {
                text: '',
                href: 'http://www.dyhjw.com'
            }

            var chart = new Highcharts.Chart('zst_svg', option);

        }, 'json')

    })

    // 还原
    $('.huanyuan').click(function() {
        var url = $('.main_tab .cur a').attr('data-url');
        var bid = $('.main_tab .cur a').attr('bid');
        if (url && bid) {} else {
            url = $(this).attr('data-url');
            bid = $(this).attr('bid');
        }
        /*复位品牌复选框*/
        // var pinpai1 = $('select[name=bid1],select[name=bid2]');
        // pinpai1.val(0);
        // pinpai1.next('select').html('');
        _init_bijia(bid);

        $.post(url, {
            'jindian_getBrandPriceScope': {
                'bid': bid
            }
        }, function(data) {
            option = {};
            var n_series = data.jindian_getBrandPriceScope.series;
            if(n_series.length<=0) {
                return false;
            }
            var series = [];
            var y_flag = false;

            for(var i in n_series) {
                var temp = {};
                temp.name = n_series[i].name;
                temp.data = [];
                for(var j in n_series[i].data) {
                    temp.data.push(parseFloat(n_series[i].data[j]));
                    if(parseFloat(n_series[i].data[j]) > 5000) {
                        temp.yAxis = 1;
                        y_flag = true;//需要增加一个y坐标轴
                    }
                }
                temp.lineWidth=1.5;
                temp.marker={radius:2};
                series.push(temp);
            }
            option.series = series;
            option.title = {
                text: '',
                x: -20
            }
            option.xAxis = {}
            var categories = [];
            /*for(var i in data.jindian_getBrandPriceScope.categories){
                categories.push(data.jindian_getBrandPriceScope.categories[i]);
            }*/

            for(var i in n_series[0].origin_data){
                categories.push(n_series[0].origin_data[i].date);
            }
            option.xAxis.categories = categories;
            if(y_flag) {
                /*增加一个y轴*/
                option.yAxis = [{
                    title: {
                        text: ''
                    },
                    tickPositioner: function () {
                        var positions = [],
                            tick = Math.floor(this.dataMin),
                            increment = Math.ceil((this.dataMax - this.dataMin) / 8);
                        for (tick; tick - increment <= this.dataMax; tick += increment) {
                            positions.push(tick);
                        }
                        return positions;
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },{
                    title: {
                        text: null
                    },
                    tickPositioner: function () {
                        var positions = [],
                            tick = Math.floor(this.dataMin),
                            increment = Math.ceil((this.dataMax - this.dataMin) / 8);
                        for (tick; tick - increment <= this.dataMax; tick += increment) {
                            positions.push(tick);
                        }
                        return positions;
                    },
                    opposite: true,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#000'
                    }]
                }];
            }else {
                option.yAxis = {
                    title: {
                        text: ''
                    },
                    tickPositioner: function () {
                        var positions = [],
                            tick = Math.floor(this.dataMin),
                            increment = Math.ceil((this.dataMax - this.dataMin) / 8);
                        for (tick; tick - increment <= this.dataMax; tick += increment) {
                            positions.push(tick);
                        }
                        return positions;
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                };
            }



            option.credits = {
                text: '',
                href: 'http://www.dyhjw.com'
            }
            var chart = new Highcharts.Chart('zst_svg', option);
        })
    })

    $('.brand_info_chaxun').click(function() {
        var form_data = $('#form_brand_info_chaxun').serializeArray();
        var post_data = {}
        for (i in form_data) {
            post_data[form_data[i].name] = form_data[i].value
        }
        post_data['stime'] = $('#start').text();
        post_data['etime'] = $('#end').text();

        if(post_data['etime'] == '') {
            /*如果没有结束时间，默认当前时间*/
            var etime_num = new Date().getTime();
            post_data['etime'] = get_format_date(etime_num);
        }

        if(post_data['stime'] == '') {
            /*如果没有开始时间，则往前推一周时间*/
            stime_num = etime_num-86400*30*1000;
            post_data['stime'] = get_format_date(stime_num);
        }

        post_data['row'] = 6;
        post_data['page'] = $(this).attr('data-page');

        //console.log(post_data);
        url = $(this).attr('data-url');
        _hq_chaxun_data(url,post_data);
    });
    if(window.cur_code != undefined) {
        _init_main_price(cur_code);
    }
});

function _init_bijia(code) {
    var ys_set = "#333";
    $('select[name=bid1]').val(code).css("color", "" + ys_set + "");
    var option_36 = '',option_1 = '';
    var j = 0,v_id;
    for(var i in variety_id[code]) {
        option_36 += '<option value="'+i+'">'+variety_id[code][i]+'</option>';
        if(j == 1) {
            v_id = i;
        }
        j++;
    }
    var p_widrth = parseFloat($('.main_vs').width())*0.14;
    $('select[name=vid1]').html(option_36).val(v_id).css("color", "" + ys_set + "").css('width',p_widrth+'px');
    $('select[name=bid2]').val(1).css("color", "" + ys_set + "");
    for(var i in variety_id[1]) {
        option_1 += '<option value="'+i+'">'+variety_id[1][i]+'</option>';
    }
    $('select[name=vid2]').html(option_1).val(1).css("color", "" + ys_set + "").css('width',p_widrth+'px');
}

/*黄金行情的初始化*/
function _init_main_price(code){
    var v_id = 0;
    var j = 0;
    // for(var i in variety_id[code]){
    //     if(j == 1) {
    //         v_id = i;
    //         break;
    //     }
    //     j ++;
    // }
    var etime = new Date().getTime();
    var stime =etime-86400*30*1000;

    stime = get_format_date(stime);
    etime = get_format_date(etime);
    var post_data = {bid:code,vid:v_id,stime:stime,etime:etime,row:6,page:1};
    _hq_chaxun_data('/api/ajax',post_data);

}
/*ie7不支持字符串生成时间对象的兼容方法*/
function NewDate(str) {
    str = str.split('-');
    var date = new Date();
    date.setUTCFullYear(str[0], str[1] - 1, str[2]);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

/**
 * 行情的data设置
 * @param url string post的地址
 * @param post_data object 传的参数
 * @private
 */
function _hq_chaxun_data(url,post_data) {
    //alert(post_data.vid+'---'+post_data.stime+'---'+post_data.etime);
    $.post(url,{
        jindian_getPriceScope:post_data
    },function(data){
        var first_data = data.jindian_getPriceScope.data;
        $('.main_price').html('');
        if(first_data.total>6){
            $('.main_page').html('<div class="page_list"></div>');
        }else{
            $('.main_page').html('');
        }
        laypage({
            cont: $('.page_list'),
            skin: '#1E9FFF',
            pages: Math.ceil(first_data.total/post_data['row']), //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18,
            prev:'<',
            next:'>',
            first:1,
            last:Math.ceil(first_data.total/post_data['row']),
            curr: function() { //通过url获取当前页，也可以同上（pages）方式获取
                var page = location.search.match(/page=(\d+)/);
                $('.main_price').html(chaxun_page(first_data.data));
                return page ? page[1] : 1;
            }(),
            jump: function(e, first) { //触发分页后的回调
                if(!first){ //一定要加此判断，否则初始时会无限刷新
                    //alert(e.curr);
                    post_data['page']=e.curr;
                    chaxun_data(post_data,url);
                }
            }
        });
    },'json');
}

function get_format_date(num) {
    var date = new Date();
    date.setTime(num);
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function chaxun_data(post_data,url) {
    //console.log(post_data);
    $.post(url,{
        jindian_getPriceScope: post_data
    },function(res){
        var n_data=res.jindian_getPriceScope.data.data;
        //console.log(n_data);
        $('.main_price').html(chaxun_page(n_data));
    },'json');
}

/**
 *
 * @param data json数据
 * @returns {string} html字符串
 */
function chaxun_page(data){
    if(data ==undefined || data.length <= 0){
        return '<div class="price_nodata">暂无数据</div>';
    }
    //$('.main_price').html('');
    //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
    var str = '<dl>';
    str += '<dt><span><font>品牌名称</font></span><span><font>产品名称</font></span><span><font>价格单位</font></span><span><font>更新时间</font></span>' +
        '<span><font>涨跌</font></span></dt>';
    for(var i in data){
        var up_or_down = '';
        var class_name = '';
        switch(data[i].swingtype) {
            case '1':
                up_or_down=data[i].swing!=''?(parseFloat(data[i].swing).toFixed(2)):'--';
                class_name= data[i].swing!=''?'r_color':'';
                break;
            case '2':
                up_or_down=data[i].swing!=''?(parseFloat(data[i].swing).toFixed(2)):'--';
                class_name= data[i].swing!=''?'g_color':'';
                break;
            case '3':
                up_or_down='--';
                break;
        }
        str += '<dd class="'+class_name+'"><span><font>'+data[i]['bname']+'</font></span><span><font>'+data[i]['vname']+'</font></span><span><font>'+parseFloat(data[i]['price']).toFixed(1)+data[i]['unit']+'</font></span>' +
            '<span><font>'+data[i]['date']+'</font></span><span><font><a>'+up_or_down+'</a></font></span></dd>';
    }
    str += '</dl>';
    return str;
}