(function($){

    /* -----------------------顶部nav、footer、copyRight公共部分-------------------- */
    /* ----------------------点击搜索按钮出现搜索框--------------------- */
    $('.search').click(function(){
        // 导航栏字体变小消失
        $('.long li a:not(.logo)').animate({fontSize:'10px','opacity':0},300,function(){
            searchShow();
        });
        // 出现遮罩层
        $('.shadow').show().animate({'opacity':0.5},1000);
    });
    // 点击其他地方搜索部分消失
    $('.shadow').click(function(){
        searchHide();
    });
    // 点击关闭按钮
    $('.close_search').click(function(){
        searchHide();
    });
    function searchShow(){
         // 出现搜索部分
         $('.search_box').fadeIn(400);
         // 字体左滑出现
         $('.search_in').animate({'padding-left':0,'opacity':'1'},500);
         $('.quick_link').animate({'padding-left':'40px','opacity':'1'},200);
         $('.recommend_list li:first').stop(true).animate({'padding-left':'40px','opacity':'1'},500).next().stop(true).animate({'padding-left':'40px','opacity':'1'},600).next().stop(true).animate({'padding-left':'40px','opacity':'1'},700).next().stop(true).animate({'padding-left':'40px','opacity':'1'},800);
    }
    function searchHide(){            
        // 文字回到原位
        $('.search_in_right').css({'padding-left':'150px','opacity':'0'});
        $('.quick_link').css({'padding-left':'150px','opacity':'0'});
        $('.recommend_list li').css({'padding-left':'150px','opacity':'0'});
        // 导航栏字体出现
        $('.long li a:not(.logo)').animate({'opacity':1},20);                
        $('.long li a:not(.logo)').animate({fontSize:'14px'},500);
        // 搜索部分消失
        $('.search_box').hide();
        // 遮罩层消失
        $('.shadow').animate({'opacity':0},500).hide();
    }
    
    /* 窄屏点击菜单按钮 */
    $('.menu_button').click(function(){
        // 变形
        $(this).children('span').eq(0).toggleClass('span_top');
        $(this).children('span').eq(1).toggleClass('span_center');
        $(this).children('span').eq(2).toggleClass('span_bottom');
        // 隐藏其他部分
        $('html').toggleClass('html_hidden');
        // 显示黑色底层
        $('.cover').slideToggle(500);
        // 登录头像向右移动隐藏
        $('.user').toggleClass('user_slide');
        // 如果菜单栏选择页隐藏，则显示出来
        if($('.center_search_box').css('display') === 'block'){
            $('.cover_menu').fadeIn();                
        }
        $('.cover_menu').stop(true).fadeToggle();
        $('.cover_recommend_list').children().toggleClass('cover_recommend_list_default').toggleClass('cover_recommend_list_hide');
        // 如果logo隐藏，则显示出来
        if($('.logo').hasClass('logo_slide')){
            $('.logo').removeClass('logo_slide')
        }
        // 隐藏搜索框
        $('.search_box').hide();
    });
    // 点击搜索栏
    $('.search_in_center').click(function(){
        // 菜单栏选择页向上运动隐藏
        $('.cover_menu').slideUp(300,function(){
            // logo向上运动隐藏                
            $('.logo').toggleClass('logo_slide');
            // 向上箭头显示
            $('.close_search_top').addClass('close_search_top_show');
            // 搜索框、文字显示
            searchShow();
            // 隐藏关闭搜索框的按钮
            $('.close_search').hide();
        });
    });
    // 点击向上箭头
    $('.close_search_top').click(function(){
        $('.search_in_right').css({'padding-left':'150px','opacity':'0'});
        $('.quick_link').css({'padding-left':'150px','opacity':'0'});
        $('.recommend_list li').css({'padding-left':'150px','opacity':'0'});
        // 隐藏搜索框
        $('.search_box').hide();
        // 菜单栏选择页向下运动显示
        $('.cover_menu').delay(200).slideDown(300,function(){
             // logo向下运动显示                
             $('.logo').toggleClass('logo_slide');
        });
    });

    /* -----------------------------------点击头像-------------------------------- */
    $('.user').click(function(){
        // 阻止冒泡
        event.stopPropagation();
        // 显示隐藏菜单
        $('.hide_menu_con').toggle();
    });
    // 点击其他地方，隐藏菜单栏消息
    $('body').click(function(){
        $('.hide_menu_con').hide();
    });

    /* -----------------------------link_area----------------------------- */
    // 底部链接区域
    //初始化的时候做判断，如果小于768，则给标题添加事件
    if($('body').width() < 768){
        $('.column_title').click(function(){
            $(this).nextAll('.column_item').toggleClass('column_item_down').stop(true).slideToggle(300);
            $(this).find('.link_list_icon_button').toggleClass('link_list_icon_button_down');
        });
    }

    /* ---------------------------------浏览器窗口大小改变时-----------------------------*/
    $(window).resize(function(){
        // 底部链接区域的事件
        if($('body').width() < 768){
            // 小于768的时候
            //所有的ul隐藏
            $('.column_item').removeClass('column_item_down').hide();
            //所有的+号隐藏
            $('.link_list_icon_button').removeClass('link_list_icon_button_down');
            //原来已经展开的，保持展开
            $('.is_silde_down').nextAll('.column_item').addClass('column_item_down').show();
            //原来已经展开的，+号保持旋转的状态
            $('.is_silde_down').find('.link_list_icon_button').addClass('link_list_icon_button_down');
            // 判断标题上是否绑定了事件
            if(!$._data($('.column_title')[0],"events")){
                //如果标题上没有绑定事件，则绑定事件
                $('.column_title').click(function(){
                    //当前点中的标题下的ul展开
                    $(this).nextAll('.column_item').toggleClass('column_item_down').stop(true).slideToggle(300);
                    //+号旋转
                    $(this).find('.link_list_icon_button').toggleClass('link_list_icon_button_down');
                    //给展开的ul添加class
                    $(this).toggleClass('is_silde_down');
                }); 
            }
            $('.logo').removeClass('logo_hide')
        } else{
            //大于768的时候，移除标题的点击事件
            $('.column_title').off('click');
            //所有的ul展开
            $('.column_item').show();

            // 屏幕宽度大于768px时，窄屏状态下的效果隐藏
            $('.logo').addClass('logo_hide').removeClass('logo_slide');
            $('.cover').hide();
            $('.search_box').hide();
            $('html').removeClass('html_hidden');
            $('.user').removeClass('user_slide');
            $('.menu_button').children('span').removeClass();
            $('.cover_menu').stop(true).fadeOut();
            $('.cover_recommend_list').children().removeClass('cover_recommend_list_default').addClass('cover_recommend_list_hide');
        }                
    });




    /* ------------------------------登录注册公共部分------------------------------- */
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