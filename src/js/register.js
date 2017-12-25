(function($){
    $(function(){
        // 密码输入框获取光标时，显示提示信息
        $('.in_password').on('focus',function(){
            $('.switch_login_way').css('opacity','1');
        }).on('input',function(){
            $('.switch_login_way').css('opacity','0');
        }).blur(function(){
            $('.switch_login_way').css('opacity','0');
        });
        // 验证输入
        $('.submit').click(function(){
            var reg = /^1\d{10}$/;
            if($('.in_username').val() === ''){
                $('.info').fadeIn().html('请先输入手机号').addClass('info_down');
            } else if(!reg.test($('.in_username').val())){
                $('.info').fadeIn().html('请输入正确的手机号').addClass('info_down');
            } else if($('.in_password').val() === ''){
                $('.info').fadeIn().html('请设置6-16位的密码').addClass('info_down');
            }
            setTimeout(function(){
                $('.info').fadeOut(300,function(){
                    $('.info').removeClass('info_down');
                });
            },2000);
        });
    });
})(jQuery);