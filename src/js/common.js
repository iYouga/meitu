(function($){
    $(function(){
        // 点击国家码时
        $('.country_code').click(function(){
            $('.info').fadeIn().html('只允许使用中国大陆的手机号码').addClass('info_down');
            setTimeout(function(){
                $('.info').fadeOut(300,function(){
                    $('.info').removeClass('info_down');
                });
            },2000);
        });
        // 账号输入框获取光标时，显示删除账号按钮
        $('.in_username').on('focus',function(event){
            event.stopPropagation();            
            if($('.in_username').val() === ''){                
                $(this).next().css('display','none');
            }else{                
                $(this).next().css('display','inline-block');
            }
        }).on('input',function(event){
            $(this).next().css('display','inline-block');
        }).blur(function(event){
            event.stopPropagation();
            $(this).next().css('display','none');
        });
        // 点击删除按钮，则删除账号
        $('.username .delete_username').click(function(event){
            event.stopPropagation();            
            $('.in_username').val('');
        });
        // 密码输入框获取光标时，显示删除密码按钮
        $('.in_password').on('focus',function(){
            if($('.in_password').val() === ''){
                $(this).next().css('display','none');
            }else{                
                $(this).next().css('display','inline-block');
            }
        }).on('input',function(){
            $(this).next().css('display','inline-block');
        }).blur(function(){
            $(this).next().css('display','none');
        });
        // 点击删除按钮，则删除账号
        $('.password .delete_username').click(function(){
            $('.in_password').val('');
        });
        // 点击显示密码按钮
        $('.password_show').click(function(){
            // 改变按钮的颜色
            if($('.password_show .iconfont').hasClass('iconfont_ckecked')){
                $('.in_password')[0].type ='password';
            } else{                
                $('.in_password')[0].type ='text';            
            }
            $('.password_show .iconfont').toggleClass('iconfont_ckecked');
        });
    });
})(jQuery);