/*
 version:1.0.0
 */
var 
    winW=$(window).width(),
    winH=$(window).height(),
    winScr, 
    swipers = [], 
    players=[], 
    swipersliders = [], 
    swiperInitIterator=0,
    specialsSwipers = [], 
    timeCircles = [], 
    search_product_category_id, 
    inputSearch, 
    popup_search_product_category_id, 
    popup_inputSearch, 
    pageName, 
    _isresponsive = true,
    _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
if (typeof product_list_view === 'undefined' || product_list_view === null) {
    var product_list_view = 'grid';
}
$(function() {
    "use strict";
    $('a[href="' + window.location.href + '"]').addClass('active');
    if(!_ismobile){
        if($("#main_sticky").length >0 && $(".clone-to-sticky").length >0){
            $("#main_sticky").find('.sticky-append-to').each(function () {
                var el = $(this).data('elappend');
                if($("#"+el).length >0){
                    $("#"+el).appendTo($(this));
                }
            });
            $("#main_sticky").find(".sticky-clone").each(function () {
                var el = $(this).data('elclone');
                if($("#"+el).length >0){
                    $(this).append($("#"+el).clone().removeAttr("id"));
                    $(this).find('.main-megamenu-clone').removeAttr("id").removeClass('main-megamenu-clone');
                    $(this).find('.megamenu-vertical-container').addClass('hide-always');
                }
            });
        }
    }
    /*$('#header').css({'min-height':$('#header').outerHeight(true)});*/
    initPSFSwiperSlider();
    scrollCalculations();
    $(window).load(function(){
        // $('#header').css({'min-height':$('#header').outerHeight(true)});
        $('#loader-wrapper').fadeOut();
        $('body').addClass('loaded');
        pageCalculations();
    });
    function resizeCall(){
        pageCalculations();
        megamenuCalculations();
        destroyTimeCircles();
        initTimeCircles();
        equalHeight();
        $(".megamenu-item.lg-other, .megamenu-item.xl-other, .megamenu-item.md-order").attr('style', '');
    }
    if(!_ismobile){
        $(window).resize(function(){
            resizeCall();
        });
    } else{
        window.addEventListener("orientationchange", function() {
            resizeCall();
        }, false);
    }
    $(window).scroll(function(){
        scrollCalculations();
        if( $(window).scrollTop() == 0 ) {
            $('.scroll_top').stop(false,true).fadeOut(600);
        }else{
            $('.scroll_top').stop(false,true).fadeIn(600);
        }
    });
});
function scrollCalculations(){
    winScr = $(window).scrollTop();
    var headerComp = ($('header').outerHeight()<=200)?$('header').outerHeight():200;
    if($("#main_sticky").length >0){
        if(winScr>=headerComp && winW >= 1200) {
            if(!$('#main_sticky').hasClass('open')){
                $('#main_sticky').animate({top: "0"}, 300).addClass('open');
                if(!_ismobile) closePopups();
            }
        }else {
            if($('#main_sticky').hasClass('open')){
                $('#main_sticky').animate({top: "-100"}, 300).removeClass('open');
                $("#main_sticky").find('.megamenu-vertical-container').each(function(){
                    if(!$(this).is(':hidden')){
                        $(this).slideUp().prev().removeClass('active');
                    }
                });
                if(!_ismobile) closePopups();
            }
        }
    }else{
        if(winScr>=headerComp && winW >= 1200) {
            if(!$('header').hasClass('fixed-header')){
                $('header').addClass('fixed-header');
                if(!_ismobile) closePopups();
            }
        }else {
            if($('header').hasClass('fixed-header')){
                $('header').removeClass('fixed-header');
                if(!_ismobile) closePopups();
            }
        }
    }
    $('nav').addClass('disable-animation');
}
function initPlyr(){
    if($(".plyr_player").length >0){
        $(".plyr_player").each(function () {
            var index = $(this).attr('id');
            players[index] = plyr.setup('#'+index);
        });
        $('.plyr_player').on('ready', function(event) {
            $(this).addClass('plyr-ready');
        }).on('play', function(event) {
            $(this).removeClass('plyr-ready plyr-pause').addClass('plyr-playing');
        }).on('pause', function(event) {
            $(this).removeClass('plyr-playing').addClass('plyr-pause');
        })
    }
    /*var plyrs = document.querySelectorAll('.plyr_player');
    if(plyrs.length >0){
        Array.prototype.forEach.call(plyrs, function(element, i) {
            var index = element.getAttribute('id');
            players[index] = plyr.setup('#'+index);
        });
    }*/
}
function scrollaInit() {
    $('.animate').scrolla({
        mobile: false,
        once: true
    });
}
function dropDown(){
    var elementClick = '.toogler .current', elementSlide =  '.toogle_content', activeClass = 'active';
    $(elementClick).on('click', function(e){
        e.stopPropagation();
        var subUl = $(this).next(elementSlide);
        if(subUl.is(':hidden'))
        {
            subUl.slideDown();
            $(this).addClass(activeClass);
        }
        else
        {
            subUl.slideUp();
            $(this).removeClass(activeClass);
        }
        $(elementClick).not(this).next(elementSlide).slideUp();
        $(elementClick).not(this).removeClass(activeClass);
        e.preventDefault();
    });
    $(elementSlide).on('click', function(e){e.stopPropagation();});
    $(document).on('click', function(e){
        e.stopPropagation();
        var elementHide = $(elementClick).next(elementSlide);
        $(elementHide).slideUp();
        $(elementClick).removeClass('active');
    });
}
function megaMenuResponsive(){
    var elementClick = '.responsive-menu-toggle',
        elementSlide =  '.responsive-menu.hide-always',
        activeClass = 'active';
    $(elementClick).on('click', function(e){
        e.stopPropagation();
        var subUl = $(this).parent().find(elementSlide);
        if(subUl.is(':hidden'))
        {
            subUl.slideDown();
            $(this).addClass(activeClass);
        }
        else
        {
            subUl.slideUp();
            $(this).removeClass(activeClass);
        }
        if(winW < 1200){
            $(elementClick).not(this).next(elementSlide).slideUp();
        }
        $(elementClick).not(this).removeClass(activeClass);
        e.preventDefault();
    });

    $(elementSlide).on('click', function(e){
        e.stopPropagation();
    });
}
function fixHeaderInit() {
    if($(".fixed-header-margin").length >0){
        if($(window).width() >= 992){
            if($("body").hasClass("page-index")){
                if(!$("header").hasClass("header-on-slide")){
                    $('.fixed-header-margin').css({'padding-top':$('header').outerHeight(true)});
                }
            }else{
                $('.fixed-header-margin').css({'padding-top':$('header').outerHeight(true)});
            }
        }else{
            $('.fixed-header-margin').attr('style', '');
        }
    }
}
function megamenuCalculations() {
    if(winW>=992){
        if($("main .megamenu.vertical").length >0){
            $("main .megamenu.vertical").each(function(){
                if ($(this).closest('.container').length > 0) {
                    var a=$(this).closest('.container').actual('width');
                }
                else {
                    var a = 1200;
                }
                var b=$(this).actual('width'),
                c=a-b;
                $(this).find('.megacontent.fullcontainer, .megacontent.fullwidth').css({'width':c});
                $(this).find('.megacontent-default').each(function () {
                    var w = parseInt($(this).data('width'));
                    if(w >0 && w <= 12)
                        $(this).css({'width':(c * w)/12});
                    else
                        $(this).css({'width':c});
                });
            });
        }
        if($("main .horizontal-list-menus .fullcontainer").length >0){
            $("main .horizontal-list-menus .fullcontainer").each(function(){
                var c=$(this).closest('.container'),
                    m=$(this).closest('.megamenu'),
                    offset = parseInt(m.offset().left) - parseInt(c.offset().left) - parseInt(c.css('padding-left')),
                    w=c.actual('width');
                $(this).css({'width':w, 'left':'-'+offset+'px'});
            });
        }
        if($("main .horizontal-list-menus .megacontent-default").length >0){
            $("main .horizontal-list-menus .megacontent-default").each(function(){
                var m=$(this).closest('.horizontal-list-menus'),
                    a = parseInt(m.actual('outerWidth')),
                    col = parseInt($(this).data('width')),
                    theWidth=(a * col)/12,
                    parent = $(this).closest(".parent"),
                    parentWidth = parent.actual('outerWidth'),
                    parentLeft = parent.position().left,
                    parentOffsetLeft = parentLeft-m.position().left + parentWidth/2,
                    parentOffsetRight = a - parentOffsetLeft,
                    theLeft=0;
                if(col == 15)
                    theWidth = (a * 2.4)/12;
                if((col >0 && col <12) || col == 15){
                    theLeft = parentLeft + parentWidth/2 - theWidth/2;
                    if((theWidth/2) >= parentOffsetLeft){
                        $(this).css({'width':theWidth, 'left':0});
                    }else{
                        if((theWidth/2) >= parentOffsetRight){
                            $(this).css({'width':theWidth, 'left':'auto', 'right':0});
                        }else {
                            $(this).css({'width':theWidth, 'left':theLeft});
                        }
                    }
                }
                else{
                    $(this).attr('style', '');
                }
            });
        }
        /* submenus */
        if($(".submenus").length >0){
            $(".submenus").each(function(){
                var l =  parseInt($(this).offset().left), w= parseInt($(this).actual('outerWidth'));
                if(l+w >= winW){
                    if($(this).hasClass('submenus-0')){
                        $(this).css({'left':'auto', 'right':'0'});
                    }else{
                        $(this).css({'left':'auto', 'right':'100%'});
                    }

                }
            });
        }
    }else{
        $("main .megacontent.fullcontainer, main .megacontent.fullwidth, main .megacontent-default").attr('style', '');
    }
}
function jqueryParallax(){
    if(!_ismobile){
        $('.psf-parallax').each(function(i){
            var speed = parseFloat($(this).data('stellar-background-ratio')), offset = $(this).data('stellar-horizontal-offset'), index='psf-parallax-'+i;
            if(offset === '')
                offset = '50%';
            else
                offset += 'px';
            $(this).attr('id', 'psf-parallax-'+i);
            $("#"+index).parallax(offset, speed);
        });
    }else{
        $(".psf-parallax").css("background-attachment", "fixed")
    }
}
function reload_product_favorite() {
    var data={'task':'reload_product_favorite'};
    $.ajax({
        type: "POST",
        cache: false,
        url: psframeworkAjaxUrl,
        dataType : "json",
        data: data,
        complete: function(){},
        success: function (result){
            if(result.class_name){
                $(result.class_name).addClass('checked');
            }
        }
    });
}
function reload_product_compare() {
    var data={'task':'reload_product_compare'};
    $.ajax({
        type: "POST",
        cache: false,
        url: psframeworkAjaxUrl,
        dataType : "json",
        data: data,
        complete: function(){},
        success: function (result){
            if(result.class_name){
                $(result.class_name).addClass('checked');
            }
        }
    });
}
function initTimeCircles(){
    timeCircles = new Array();
    $('.main-time-circles').each(function(){
        var $t = $(this), 
            options = $t.data('options'), 
            txtdays=$t.data('txt_days'),
            txthours=$t.data('txt_hours'),
            txtminutes=$t.data('txt_minutes'),
            txtseconds=$t.data('txt_seconds');
        if(options !== 'undefined'){

            if(txtdays !== 'undefined')
                options.time.Days.text = txtdays;
            else
                options.time.Days.text = txt_days;

            if(options.time.Days.color == 'main_color')
                options.time.Days.color = main_color;
            else if(options.time.Days.color == 'second_color')
                options.time.Days.color = second_color;


            if(txthours !== 'undefined')
                options.time.Hours.text = txthours;
            else
                options.time.Hours.text = txt_hours;

            if(options.time.Hours.color == 'main_color')
                options.time.Hours.color = main_color;
            else if(options.time.Hours.color == 'second_color')
                options.time.Hours.color = second_color;


            if(txtminutes !== 'undefined')
                options.time.Minutes.text = txtminutes;
            else
                options.time.Minutes.text = txt_minutes;

            if(options.time.Minutes.color == 'main_color')
                options.time.Minutes.color = main_color;
            else if(options.time.Minutes.color == 'second_color')
                options.time.Minutes.color = second_color;


            if(txtseconds !== 'short_sec')
                options.time.Seconds.text = txtseconds;
            else
                options.time.Seconds.text = txt_seconds;

            if(options.time.Seconds.color == 'main_color')
                options.time.Seconds.color = main_color;
            else if(options.time.Seconds.color == 'second_color')
                options.time.Seconds.color = second_color;

            if(options.circle_fill_color == 'main_color')
                options.circle_fill_color = main_color;
            else if(options.circle_fill_color == 'second_color')
                options.circle_fill_color = second_color;

            if (options.circle_core_bg_color != 'undefined'){
                if(options.circle_core_bg_color == 'main_color')
                    options.circle_core_bg_color = main_color;
                else if(options.circle_core_bg_color == 'second_color')
                    options.circle_core_bg_color = second_color;
            }else{
                options.circle_core_bg_color = '';
            }
            if (options.circle_inner_bg_color != 'undefined'){
                if(options.circle_inner_bg_color == 'main_color')
                    options.circle_inner_bg_color = main_color;
                else if(options.circle_inner_bg_color == 'second_color')
                    options.circle_inner_bg_color = second_color;
            }else{
                options.circle_inner_bg_color = '';
            }
            timeCircles.push($t.TimeCircles(options));
        }
    });
}
function destroyTimeCircles() {
    if(timeCircles.length >0){
        for (var i = 0; i < timeCircles.length; i++) {
            var timeCircle = timeCircles[i];
            timeCircle.destroy();
        }
    };
}
function initPSFSwiperSlider(){
    $('.psfswiperslider-container:not(.initialized)').each(function(){
        var $t = $(this), p=$(this).closest('.main-swiper'), index = $t.attr('id'), swiper_settings = $t.data('swiper_settings');
        $t.addClass('initialized');
        if(swiper_settings.hasOwnProperty('lazyLoading')){
            if(swiper_settings.lazyLoading == true){
                swiper_settings.preloadImages = false;
            }
        }
        if(swiper_settings.hasOwnProperty('backNextButton')){
            if(swiper_settings.backNextButton == '1'){
                p.find(swiper_settings.nextButton).attr('id', index+'-next');
                swiper_settings.nextButton = '#'+index+'-next';
                p.find(swiper_settings.prevButton).attr('id', index+'-prev');
                swiper_settings.prevButton = '#'+index+'-prev';
            }else{
                p.find('.swiper-next').remove();
                p.find('.swiper-prev').remove();
                swiper_settings.prevButton = '';
                swiper_settings.nextButton = '';
            }
            delete swiper_settings.backNextButton;
        }
        if(swiper_settings.hasOwnProperty('showScrollbar')){
            if(swiper_settings.scrollbar == '1' ){
                p.find('.swiper-scrollbar').attr('id', index+'-scrollbar');
                swiper_settings.scrollbar = '#'+index+'scrollbar';
            }else{
                p.find('.swiper-scrollbar').remove();
                swiper_settings.scrollbar = '';
            }
            delete swiper_settings.showScrollbar;
        }
        if(swiper_settings.hasOwnProperty('paginationType')){
            if(swiper_settings.paginationType == 'bullets' ){
                if(swiper_settings.hasOwnProperty('pagination')){
                    if($t.hasClass('pagination-thumbs')){
                        swiper_settings.paginationBulletRender = function (swiper, swiper_index, className) {
                            var s = $("."+this.wrapperClass).find('[data-src]')[swiper_index], src = $(s).attr('data-src');
                            return '<span class="' + className + '"><img src="'+src+'" alt="slide item '+swiper_index+'" /></span>';
                        }
                    }else if($t.hasClass('pagination-number')){
                        swiper_settings.paginationBulletRender = function (swiper, swiper_index, className) {
                            return '<span class="' + className + '">'+(swiper_index + 1)+'</span>';
                        }
                    }
                }
            }
        }

        swiper_settings.onInit = function (swiper) {
            $t.addClass('swiper_loaded');
            $t.find('.slide-effect').each(function(){
                $(this).css('opacity', 0);
            });
            $t.find(".slide-effect").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                $(this).css('opacity', 1);
            });
        }
        swiper_settings.onSlideChangeStart = function (swiper) {
            if($t.hasClass('swiper_loaded')){
                $t.find('.swiper-slide-prev .slide-effect, .swiper-slide-next .slide-effect').each(function(){
                    $(this).css('opacity', 0);
                });
            }

        }
        swiper_settings.onSlideChangeEnd = function (swiper) {
            if($t.hasClass('swiper_loaded')){
                $t.find('.swiper-slide-active .slide-effect').each(function(){
                    $(this).animate({opacity: 0}, parseInt($(this).data('delay'))).animate({opacity: 1}, 1);
                });
            }
        }
        swipersliders[index] = new Swiper('#'+index, swiper_settings);
    });
    return true;
}
function initPSFSwiper(){
    $('.psfswiper-container:not(.initialized)').each(function(i){
        var $t = $(this),
            p=$(this).closest('.main-swiper'),
            index = 'swiper'+swiperInitIterator+$t.attr('id'),
            swiper_settings = $t.data('swiper_settings');
        $t.attr('id', index).addClass('initialized');
        p.attr('data-swiper_id', index);
        if(swiper_settings.hasOwnProperty('lazyLoading')){
            if(swiper_settings.lazyLoading == true){
                swiper_settings.preloadImages = false;
            }
        }
        if(swiper_settings.hasOwnProperty('backNextButton')){
            if(swiper_settings.backNextButton == '1'){
                p.find(swiper_settings.nextButton).attr('id', index+'-next');
                swiper_settings.nextButton = '#'+index+'-next';
                p.find(swiper_settings.prevButton).attr('id', index+'-prev');
                swiper_settings.prevButton = '#'+index+'-prev';
            }else{
                p.find('.swiper-next').remove();
                p.find('.swiper-prev').remove();
                swiper_settings.prevButton = '';
                swiper_settings.nextButton = '';
            }
            delete swiper_settings.backNextButton;
        }
        if(swiper_settings.hasOwnProperty('showScrollbar')){
            if(swiper_settings.scrollbar == '1' ){
                p.find('.swiper-scrollbar').attr('id', index+'-scrollbar');
                swiper_settings.scrollbar = '#'+index+'scrollbar';
            }else{
                p.find('.swiper-scrollbar').remove();
                swiper_settings.scrollbar = '';
            }
            delete swiper_settings.showScrollbar;
        }
        if($t.hasClass('equal-height'))
            swiper_settings.autoHeight = true;
        swipers[index] = new Swiper('#'+index, swiper_settings);
        swiperInitIterator++;
    });
    return true;
}
function showProductSelect(id_order) {
    $('.product_select').hide().prop('disabled', 'disabled').parent('.selector').hide();
    $('.product_select').parents('.form-group').find('label').hide();
    if ($('.' + id_order + '_order_products').length > 0)
    {
        $('.' + id_order + '_order_products').removeProp('disabled').show().parent('.selector').removeClass('disabled').show();
        $('.product_select').parents('.form-group').show().find('label').show();
    }
}
function closePopups(){
    $('.popup.active').animate({'opacity':'0', 'visibility':'hidden'}, 300, function(){
        $(this).removeClass('active').parent().removeClass('opened').find('.active').removeClass('active');
    });
}
function showPopup(id){
    id.addClass('visible active');
}
function equalHeight(){
    if($(".equal-height-container").length >0){
        /*setTimeout(function () {*/
            $(".equal-height-container").find('.equal-height-item').css('height', 'auto');
            $(".equal-height-container").each(function () {
                var max_height = 0;
                $(this).find(".equal-height-item").each(function () {
                    if($(this).actual('outerHeight') > max_height)
                        max_height = $(this).actual('outerHeight');
                });
                $(this).find('.equal-height-item').css('height', max_height);
            });
        /*}, 1000);*/

    }
    return true;
}
function clampInit(){
    if($(".clamp-1").length >0){
        $(".clamp-1").each(function (index, element) {
            $clamp(element, {clamp: 1, useNativeClamp: false, element_height: $(this).actual('height')});
        })
    }
    if($(".clamp-2").length >0){
        $(".clamp-2").each(function (index, element) {
            $clamp(element, {clamp: 2, useNativeClamp: false});
        })
    }
    if($(".clamp-3").length >0){
        $(".clamp-3").each(function (index, element) {
            $clamp(element, {clamp: 3, useNativeClamp: false});
        })
    }
}
function pageCalculations(){
    pageName = $('body').attr('id');
    winW = $(window).width();
    winH = $(window).height();
    if(winW < 1200){
        $('body').addClass('mobile');
        if($(".header #main-megamenu-vertical").length >0){
            $(".header #main-megamenu-vertical").find(".responsive-menu").addClass('hide-always');
        }
    }else{
        $('body').removeClass('mobile');
        if($(".header #main-megamenu-vertical").length >0){
            $(".header #main-megamenu-vertical").find(".responsive-menu").each(function () {
                if($(this).hasClass('only-index-showed') && pageName == 'index'){
                    $(this).removeClass('hide-always');
                }
            });
        }
    }
}