(function($){
    $(function(){        
        // 验证输入
        $('.submit').click(function(){
            var reg = /^1\d{10}$/;
            if($('.in_username').val() === ''){
                $('.info').fadeIn().html('请输入手机号').addClass('info_down');
            } else if(!reg.test($('.in_username').val())){
                $('.info').fadeIn().html('请输入正确的手机号').addClass('info_down');
            } else if($('.in_password').val() === ''){
                $('.info').fadeIn().html('请输入登录密码').addClass('info_down');
            }
            setTimeout(function(){
                $('.info').fadeOut(300,function(){
                    $('.info').removeClass('info_down');
                });
            },2000);
        });
    });
})(jQuery);