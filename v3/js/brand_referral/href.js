/**
 * Created by Administrator on 2017/4/7.
 */
$(document).ready(function(){
    //灰度状态
    var ys_default = "#c6c6c6";
    var ys_set = "#333";

    $('.main_vs .pinpai,.main_query .pinpai').change(function(){
        var self = $(this);
        var products = self.nextAll('select').eq(0);
        products.html('');
        var val = self.val();
        if(val != 0) {
            $(this).css('color',ys_set);
            for(var i in variety_id) {
                if(val == i) {
                    for(var j in variety_id[i]) {
                        var option = '<option value="'+j+'">'+variety_id[i][j]+'</option>';
                        products.append(option);
                    }
                    break ;
                }
            }
        }
        else{
            $(this).css('color',ys_default);
        }
    });
    // select灰度状态
    $('.main_vs select,.main_query select').change(function(){
        var tt = $(this).val();

        if (tt !== "0") {
            $(this).css("color", "" + ys_set + "");
        }
        else {
            $(this).css("color", "" + ys_default + "");
        }
    })

    init_brand();
});

/**
 * 初始化比价的品牌
 */
function init_brand(){
    var ys_set = "#333";
    for(var i in brand_id) {
        //console.log(i);
        var option = '<option value="'+i+'">'+brand_id[i]+'</option>';
        $('.main_vs .pinpai,.main_query .pinpai').append(option);
    }
    if(window.cur_code != undefined) {
        $('select[name=bid]').val(cur_code).css("color", "" + ys_set + "");
        _init_hqing();
    }
}
/**
 * 初始化行情默认为鸿来福
 * @private
 */
function _init_hqing() {
    var ys_set = "#333";
    var option_36 = '';
    var j = 0, v_id;
    for (var i in variety_id[cur_code]) {
        option_36 += '<option value="' + i + '">' + variety_id[cur_code][i] + '</option>';
        if (j == 1) {
            v_id = i;
        }
        j++;
    }
    $('select[name=vid]').html(option_36).css("color", "" + ys_set + "");
}

function lowPrice(id){
    var res = $('#'+id +' .cur').attr('date');
    $("input[name="+id+"]").val(res);
}
