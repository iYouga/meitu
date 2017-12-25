(function($){
    $(function(){
        
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
        /* ---------------------------------浏览器窗口大小改变时-----------------------------*/
        $(window).resize(function(){
            // 重新设置一张图片的宽度和轮播图的定位
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
        
    });
})(jQuery);