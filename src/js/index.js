(function($){
    $(function(){
        /* ----------------------点击搜索按钮出现搜索框--------------------- */
        $('.search').click(function(){
            // 导航栏字体变小消失
            $('.long li a:not(.logo)').animate({fontSize:'10px','opacity':0},300,function(){
                // 出现搜索部分
                $('.search_box').fadeIn(400);
                // 字体左滑出现
                $('.search_in').animate({'padding-left':0,'opacity':'1'},500);
                $('.quick_link').animate({'padding-left':'40px','opacity':'1'},200);
                $('.recommend_list li:first').stop(true).animate({'padding-left':'40px','opacity':'1'},500).next().stop(true).animate({'padding-left':'40px','opacity':'1'},600).next().stop(true).animate({'padding-left':'40px','opacity':'1'},700).next().stop(true).animate({'padding-left':'40px','opacity':'1'},800);
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
        function searchHide(){            
            // 文字回到原位
            $('.search_in').css({'padding-left':'150px','opacity':'0'});
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
        /* -----------------------------------banner--------------------------------- */
        function setImgWidth(){
            // 动态设置一张图片的宽度
            $('.banner_unit').css({width:$('body').width()});
            // 设置ul的长度
            $('.banner_con').width($('.banner_unit:first').width() * $('.banner_unit').length);
        }
        // 无缝滚动函数
        function carousel(){
            var iImgWidth = $('.banner_unit:first').width();
            if(index >= $('.banner_unit').length){
                $('.banner_con').css({left:0});
                index = 1;
            } else if(index < 0){
                $('.banner_con').css({left:-iImgWidth * ($('.banner_unit').length - 1)});
                index = $('.banner_unit').length - 2;
            }           
        }
        // 底部导航条变色函数
        function dotActive(){
            $('.dot span').removeClass('dot_active');
            index >= $('.banner_unit').length - 1 ? $('.dot span').eq(0).addClass('dot_active') : $('.dot span').eq(index).addClass('dot_active');;            
        }
        // 向左运动函数
        function leftMove(){
            index--;
            carousel();
            $('.banner_con').stop().animate({left:-$('.banner_unit:first').width() * index},1000);        
            dotActive();
        }
        // 向右运动函数
        function rightMove(){
            index++;
            carousel();
            $('.banner_con').stop().animate({left:-$('.banner_unit:first').width() * index},1000);
            dotActive();
        }
        // 自动轮播函数
        function autoMove(){
            iTimer = setInterval(function(){
                rightMove();
                fontDown();
            },5000);
        }
        // 文字下落函数
        function fontDown(){
            $('.banner_ad_img').removeClass('banner_ad_img_down').eq(index).addClass('banner_ad_img_down');
            $('.banner_ad_title').removeClass('banner_ad_title_down').eq(index).addClass('banner_ad_title_down');            
            $('.banner_ad_time').removeClass('banner_ad_time_down').eq(index).addClass('banner_ad_time_down');
            $('.banner_ad_link').removeClass('banner_ad_link_down').eq(index).addClass('banner_ad_link_down');
        }
        // 第一张图片的文字内容随屏幕宽度变化
        function followScreen(){
            if($('body').width() > 768){
                $('.banner_ad_time_center').removeClass('banner_ad_time');
                $('.banner_ad_time_right').addClass('banner_ad_time');
            } else{
                $('.banner_ad_time_center').addClass('banner_ad_time');
                $('.banner_ad_time_right').removeClass('banner_ad_time');
            }
        }
        // 默认显示第一张图片
        var index = 0,iTimer = null;
        // 复制第一张图片到最后
        $('.banner_unit:first').clone().appendTo($('.banner_con'));
        // 初始化图片和ul的宽度
        setImgWidth();
        followScreen();
        fontDown();
        // 自动轮播
        autoMove();
        // 浏览器窗口大小改变时，重新设置一张图片的宽度和轮播图的定位
        $(window).resize(function(){
            clearInterval(iTimer);
            setImgWidth();
            followScreen();                    
            $('.banner_con').css({left:-$('.banner_unit:first').width() * index}); 
            autoMove();
        });
        // 点击上一张
        $('.left_btn').click(function(){
            leftMove();
            fontDown();
        });
        $('.left_btn').mouseenter(function(){
            clearInterval(iTimer);
        }).mouseleave(function(){
            autoMove();
        });
        //  点击下一张
        $('.right_btn').click(function(){
            rightMove();
            fontDown();
        });
        $('.right_btn').mouseenter(function(){
            clearInterval(iTimer);
        }).mouseleave(function(){
            autoMove();
        });
        // 点击导航条切换图片
        $('.dot').on('click','span',function(){
            // 清除定时器
            clearInterval(iTimer);
            index = $(this).index();
            $(this).addClass('dot_active').siblings().removeClass('dot_active');
            $('.banner_con').stop().animate({left:-$('.banner_unit:first').width() * index},1000);
            autoMove();
            fontDown();
        });
        /* -----------------------------link_area----------------------------- */
        // 底部链接区域
        $('.column_title').click(function(){
            $(this).nextAll('.column_item').toggleClass('column_item_down').stop(true).slideToggle(300);
            $(this).find('.link_list_icon_button').toggleClass('link_list_icon_button_down');
        });
        /* 窄屏点击菜单按钮 */
        $('.menu_button').click(function(){
            // 隐藏其他部分
            $('html').toggleClass('html_hidden');
            // 显示黑色底层
            $('.cover').slideToggle(500);
            // 登录头像向右移动隐藏
            $('.user').toggleClass('user_slide');
            // logo向上移动隐藏
            $('.logo').toggleClass('logo_slide');
        });
        // 点击搜索栏
        $('.search_in').click();


    });
})(jQuery);