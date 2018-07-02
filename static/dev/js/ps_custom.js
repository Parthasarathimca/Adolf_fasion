/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */
(function($){
"use strict"; // Start of use strict
function animated(){
	$('.box-slider .owl-item').each(function(){
		var check = $(this).hasClass('active');
		if(check==true){
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).addClass(anime);
			});
		}else{
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).removeClass(anime);
			});
		}
	});
}
//Tag Toggle
function toggle_tab(){
	if($('.toggle-tab').length>0){
		$('.toggle-tab').each(function(){
			$(this).find('.item-toggle-tab').first().find('.toggle-tab-content').show();
			$('.toggle-tab-title').on('click',function(){
				$(this).parent().siblings().removeClass('active');
				$(this).parent().toggleClass('active');
				$(this).parents('.toggle-tab').find('.toggle-tab-content').slideUp();
				$(this).next().stop(true,false).slideToggle();
			});
		});
	}
}	
//menu responsive
function rep_menu(){
	$('.toggle-mobile-menu').on('click',function(event){
		event.preventDefault();
		$(this).parents('.main-nav').toggleClass('active');
	});
	$('.main-nav li.menu-item-has-children>a').on('click',function(event){
		if($(window).width()<768){
			event.preventDefault();
			$(this).next().not('.mega-menu').slideToggle();
		}
	});
}
//Offset Menu
function offset_menu(){
	if($(window).width()>767){
		$('.main-nav .sub-menu').each(function(){
			var wdm = $(window).width();
			var wde = $(this).width();
			var offset = $(this).offset().left;
			var tw = offset+wde;
			if(tw>wdm){
				$(this).addClass('offset-right');
			}
		});
	}else{
		return false;
	}
}
//Document Ready
jQuery(document).ready(function(){
	//back to top
	// if ($('#back-to-top').length>0) {
	// 	$('#back-to-top').on('click', function (e) {
	// 		e.preventDefault();
	// 		$('html,body').animate({
	// 			scrollTop: 0
	// 		}, 700);
	// 	});
	// 	$(window).scroll(function(){
	// 		if ($(this).scrollTop() > 300) {
	// 			$('#back-to-top').fadeIn();
	// 		} 
	// 		else {
	// 		$('#back-to-top').fadeOut();
	// 		}
	// 	});
	// }
	//time circles
	if($('.content-deal-countdown').length>0){
		$('.content-deal-countdown').TimeCircles({
			fg_width: 0.03,
			bg_width: 1.2,
			text_size: 0.07,
			circle_bg_color: "#000000",
			time: {
				Days: {
					show: true,
					text: "day",
					color: "#000000"
				},
				Hours: {
					show: true,
					text: "hou",
					color: "#000000"
				},
				Minutes: {
					show: true,
					text: "min",
					color: "#000000"
				},
				Seconds: {
					show: true,
					text: "sec",
					color: "#000000"
				}
			}
		}); 
	}
	//filter
	if($('.box-has-filter').length>0){
		$('.box-has-filter .title .filter').on('click',function(){
			event.preventDefault();
			$('.dropdown-box').slideToggle()
		});
	}
	//widget-size
	if($('.widget-size').length>0){
		$('.widget-size ul li >a').on('click',function(){
			event.preventDefault();
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$(this).addClass('active');
			}
		});
	}
	//detail-product
	if ($(".widget-detail .carousel-detail").length>0){
		$(".widget-detail .carousel-detail").jCarouselLite({
			speed: 800,
			vertical: true,
			visible: 4,
		}); 
	}
	$(".widget-detail img").on('click',function() {
		$(".widget-detail .mid img").attr("src", $(this).attr("src"));
	})
	$('.custom-container .carousel-detail ul li>a').on('click',function(event){
		event.preventDefault();
		$('.custom-container .carousel-detail ul li').removeClass('active');
		$(this).parent().addClass('active');
	});
	//check-box 
	if($('.check-box').length>0){
		$('.check-box >a').on('click',function(){
		event.preventDefault();
			$(this).addClass('active');
		});
	}
	/* range */
	if($("#slider-range").length>0){
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 5, 283 ],
			slide: function( event, ui ) {
				$( "#amount" ).html( "$ <span class='first-price'><span>"+ ui.values[ 0 ]+"</span></span>" + " - " + "$ <span class='last-price'><span>"+ ui.values[ 1 ] +"</span></span>");
				$('#slider-range').find('.ui-slider-handle').first().html($('.first-price').html());
				$('#slider-range').find('.ui-slider-handle').last().html($('.last-price').html());
			}
		});
		$( "#amount" ).html( "$ <span class='first-price'><span>"+ $( "#slider-range" ).slider( "values", 0 )+"</span></span>" + " - " + "$ <span class='last-price'><span>"+ $( "#slider-range" ).slider( "values", 1 )+"</span></span>" );	
		$('#slider-range').find('.ui-slider-handle').first().html($('.first-price').html());
		$('#slider-range').find('.ui-slider-handle').last().html($('.last-price').html());
	}
	/* menu home v2 */
	if($('.main-nav-2').length>0){
		if($(window).width()>=768){
			$('.toggle-mobile-menu').on('click',function(){
				event.preventDefault();
				event.stopPropagation();
				$(this).next().slideToggle();
			});
		}
	} 
	/* list product */
	if($('.list-product').length>0){
		$('.list-product >ul >li').on('click',function(){
			$(this).find('ul').slideToggle()
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$(this).addClass('active');
			}
		});
	}
	//Video Custom
	if($('.box-player').length > 0){
		$('.box-player').each(function(){
			var self = $(this);
			self.find('.video-button').on('click', function (event) {
			event.preventDefault();
			self.addClass('clicked');
			var video = $('.video-custom').get(0);
			$(this).toggleClass('active');
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
		});
	});
	}
	//Qty Up-Down
	$('.info-qty').each(function(){
		var qtyval = parseInt($(this).find('.qty-val').text(),10);
		$(this).find('.qty-up').on('click',function(event){
			event.preventDefault();
			qtyval=qtyval+1;
			$('.qty-val').text(qtyval);
		});
		$(this).find('.qty-down').on('click',function(event){
			event.preventDefault();
			qtyval=qtyval-1;
			if(qtyval>0){
				$('.qty-val').text(qtyval);
			}else{
				qtyval=0;
				$('.qty-val').text(qtyval);
			}
		});
	});
	//check customize
	if($('.box-item').length>0){
		$('.box-item >a').on('click',function(){
			event.preventDefault();
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{r
				$(this).addClass('active');
			}
		});
	}
	//
	if($('.services .wrap-box').length>0){
		$('.services .wrap-box').on('mouseover',function(){
			var self = $(this);
			var color = self.attr('data-color');
			self.parents('.box-service').css('background',color);
		});
	}
	//popup 
	$(".various").fancybox({
		maxWidth	: 900,
		maxHeight	: 680,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	//Elevate Zoom
	if($('.detail-product').length>0){
		if($(window).width()>1024){
			$('.widget-detail').first().find('.mid img').elevateZoom({scrollZoom : true});
		}
		$(this).find(".carousel-detail a").on('click',function(event) {
			event.preventDefault();
			$(this).parents('.widget-detail').find(".carousel-detail a").removeClass('active');
			$(this).addClass('active');
			var z_url =  $(this).find('img').attr("src");
			$(this).parents('.widget-detail').find(".mid img").attr("src", z_url);
			$('.zoomWindow').css('background-image','url("'+z_url+'")');
		});
	}
	//Menu Responsive 
	rep_menu();
	//Offset Menu
	offset_menu();
	//Toggle Tab
	toggle_tab();
});
//Window Resize
jQuery(window).on('resize',function(){
	offset_menu();
	$('.main-nav').slideDown('slow');
	$('.main-nav-2 .menu-before-rep').removeClass('active');
	$('.main-nav-2>ul').removeClass('active');
});

//Window Load
jQuery(window).on('load',function(){ 
	if($('.about-client-slider .wrap-item').length>0){
		$('.about-client-slider .wrap-item').each(function(){
			var data = $(this).data();
			$(this).owlCarousel({
				items: 3,
				addClassActive:true,
				stopOnHover:true,
				itemsCustom:[[0,1],[560,2],[990,3]],
				autoPlay:true,
				transitionStyle:data.transition, 
				pagination: false,
				paginationNumbers:false,
				/* beforeInit:background, */
				afterAction:animated,
				navigationText:['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>','<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'],
			});	
		});
	}
});

// Window Load
jQuery(window).on('load',function(){ 
	if($('.wrap-item').length>0){
		$('.wrap-item').each(function(){
			var data = $(this).data();
			$(this).owlCarousel({
				addClassActive:true,
				stopOnHover:true,
				itemsCustom:data.itemscustom,
				autoPlay:data.autoplay,
				transitionStyle:data.transition, 
				paginationNumbers:data.paginumber,
			 	// beforeInit:background, 
				afterAction:animated,
				navigationText:['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>','<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'],
			});	
		});
	}
	//Blog Masonry 
	if($('.masonry-list-post').length>0){
		$('.masonry-list-post').masonry({
			// options
			itemSelector: '.item-post-masonry',
		});
	}
});
})(jQuery); // End of use strict