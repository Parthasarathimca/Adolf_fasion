$(document).ready(function (){
show_offer_slides();
show_products();
Load_categories();
});//ready
$('ul #featured_brands li').click(function(e) 
{ 
 //alert($(this).find("span").text());
 var brand=$(this).find("span").text();
 get_product(brand);

}); 
 function get_product(brand){
    $.ajax({
		url : '/brand/product/data/',
        type : "POST",  
        data:{"brand":brand},
		timeout : 10000, 
		async:false, 
	}).done( function(json_data) { 
        datas = JSON.parse(json_data);    
        load_products(datas.vals,"featured_product_space"); 

        //dropDownList(datas.vals,'product_category','category_name');
	});
}
function show_products()
{
    var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),"value":"index"}
	$.ajax(
			{
				url : '/product/data/',
				type : 'POST',
				timeout : 10000, 
				data:data,   
				async:false, 
			}).done(function(json_data)
					{    
						var data = JSON.parse(json_data) 
						if(data.vals)
						 { 
							if (data.status=="all"){  
                                 load_products(data.vals,"product_space");
                        	} 
						}
					});
	return false 
}
function show_offer_slides()
{
    var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),"mode":"index"}
	$.ajax(
			{
				url : '/adolf/offer_slider/data/',
				type : 'POST', 
				timeout : 10000,
				data:data,   
				async:false, 
			}).done(function(json_data)
					{    
						var data = JSON.parse(json_data) 
						if(data.vals)
						 { 
							if (data.status=="index"){  
                                 load_offer_slides(data.vals);
                        	} 
						}
					});
	return false 
}

/* <div class="swiper-slide"><div class="swiperslider-item01 swiperslider-item-4374bee3 relative" id="swiperslider-4374bee3">'+
        '<div class="slide-texts-container"><div class="slide-texts-container"><div class="slide-texts-container"><div class="box-img">'+
        '<a href="#"><img src="'+img_path+offer_res[i].attachment+'"  alt="good shop" /></a></div>'+
        '<div class="box-info-slide texts"><div class="vertical-middle inner container"><div class="adv-info-slide">'+
        ' <h2 class="title animated fadeInLeftBig slide-effect" data-animated="fadeInLeftBig" data-delay="" data-duration="1000">'+offer_res[i].top_subtitle+'</h2>'+
        '<h3 class="sub_title animated flipInX slide-effect" data-animated="flipInX" data-delay="" data-duration="1000">'+offer_res[i].bottom_subtitle+'</h3>'+
        '<a href="#" class="link_text animated has-bottom bounceInLeft slide-effect  main_color-hover-color transition-300" data-animated="bounceInLeft" data-delay="" data-duration="1000">shop now </a>'+
        '</div></div></div></div></div></div>';
         */
function load_offer_slides(offer_res){

  var offer_str='';
  for(let i=0; i<offer_res.length;i++){
    offer_str+=' <div class="swiper-slide">'+
    '<div class="swiperslider-item01 swiperslider-item-4374bee3 relative" id="swiperslider-4374bee3">'+
      '  <div class="slide-texts-container">'+
            '<div class="slide-texts-container">'+
                '<div class="slide-texts-container">'+
                    '<div class="box-img">'+
                        '<a href="#"><img src="'+img_path+offer_res[i].attachment+'"  alt="good shop" /></a>'+
                    '</div>'+
                    '<div class="box-info-slide texts">'+
                        '<div class="vertical-middle inner container">'+
                            '<div class="adv-info-slide"> '+
                                '<h2 class="title animated fadeInLeftBig slide-effect" data-animated="fadeInLeftBig" data-delay="" data-duration="1000">'+offer_res[i].top_subtitle+'</h2>'+
                                '<h3 class="sub_title animated flipInX slide-effect" data-animated="flipInX" data-delay="" data-duration="1000">'+offer_res[i].bottom_subtitle+'</h3>'+
                                '<a href="#" class="link_text animated has-bottom bounceInLeft slide-effect  main_color-hover-color transition-300" data-animated="bounceInLeft" data-delay="" data-duration="1000">shop now </a></div>'+
                            '</div>'+ 
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
    }
 $("#offer_slider_div").html(offer_str);
}
 function load_products(res,id){
    var str="";
    for(let i=0; i<res.length;i++){
       str+='<div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6"><div class="item product is-product-container product-style01 product-miniature js-product-miniature" data-id-product="5" data-id-product-attribute="19"  itemscope itemtype="https://schema.org/Product">'+
        '<div class="actions product-extra-link"><a rel="nofollow" href="#" class="quick-view main_color-hover-color transition-300 relative show-type-tooltip" data-link-action="quickview"><i class="fa fa-eye" aria-hidden="true"></i><span>Quick View</span></a>'+
        '<a href="javascript:void(0)" class="add-to-favorite box-hidden wishlist favorite-pid-5" data-id_product="5" data-id_product_attribute="0">'+
        '<i class="fa fa-heart" aria-hidden="true"></i><span>Add to favorite</span></a> </div> '+
        '<div class="sale-item transition-300"><span>5%</span></div>';
        // product image here   
        str+='<div class="thumb-product"><a href="home/5-19-printed-summer-dress.html#/1-size-s/16-color-yellow">' +
        '<img class="primary-image first img-responsive transition-500" src="'+img_path+res[i].product_image_id+'" alt="Printed Summer Dress" itemprop="image" /></a>'+
        '</div>';
        //product name here 
        str+='<div class="name-product text-truncate"><h3>'+
        '<a href="home/5-19-printed-summer-dress.html#/1-size-s/16-color-yellow" class="main_color-hover-color">'+res[i].product_name+'</a></h3>'+
        '</div>';
        //proudct price and offer price here 
        str+='<div class="box-cart"><a class="ajax_add_to_cart_button cart main_color-hover-color transition-300" href="module/psframework/cart.html" rel="nofollow" data-id_product_attribute="19" data-id_product="5" data-id_customization="" data-id_address_delivery="" data-qty="1">' +
        '<span>Add to cart</span><i class="fa fa-opencart" aria-hidden="true"></i></a>'+
        '<span class="price main_color-hover-background transition-300"><span class="regular-price">$'+res[i].product_regular_price+'</span>'+
        '<ins class="">$'+res[i].product_selling_price+'</ins></span></div></div></div>';
    }
 $("#"+id).html(str); 
}
function Load_categories(){
    var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),"value":"index"}
	$.ajax(
			{
				url : '/adolf/category/data/',  
				type : 'POST',
				timeout : 10000, 
				data:data,   
				async:false,  
			}).done(function(json_data)
					{    
						var data = JSON.parse(json_data) 
						if(data)
						 { 
                                 show_categories(data.brand,data.category);
                                 //dropDownCategory(data.category)
                                  
						}
					});
	return false 
} 
function dropDownCategory(category){
    
  cat_str='';
  cat_str+='<div class="category-item all active" data-value="0">All Categories 1</div>';
  category.map(function(c){
  cat_str+='<div class="category-item all active" data-value="0" id='+c.category+c.id+'>'+c.category+'</div>';      
  })
//$('#search_categories').html(cat_str);
}

function show_categories(res1,res2){
var cat="";
    for(let i=0;i<res1.length;i++){
        cat+='<div class="psf-megacontent-2c86a13c  col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-md-0 col-sm-12 offset-sm-0 col-xs-12 offset-xs-0" >'+
        '<div class="psf-megacontent-eb452133 " >'+
            '<div class="simple-menu mega-list-cat menu02 ">'+
                '<h2 class="title24 text-uppercase -color"> '+res1[i].brand+'</h2>'+
                '<ul class="menu-tree menu-tree-default tree list-none">';

                for (let j=0;j<res2.length;j++){
                cat+='<li  class="">'+
                    '<a href="#" class=" main_color-hover-color transition-300">'+
                    '<span class="menu-txt none" data-label="">'+res2[j].category+'</span>'+
                    '</a>'+
                    '</li>'; 
                }
             cat+= '</ul>'+
            '</div>'+
        '</div>'+
        '</div>'; 
    }
       $('#category_div').html(cat);
       

    }