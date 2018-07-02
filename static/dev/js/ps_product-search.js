/*
 version:1.0.0
 */
$(function() {
    "use strict";
    var popupSearch,
        popupSearchBox,
        popupSearchCategory,
        popupUiW,
        popupSearchResultLeftOffset=0,
        blockSearch,
        blockSearchBox,
        blockSearchCategory,
        blockUiW,
        blockSearchResultLeftOffset=0,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)
    ;
    $.widget('prestashop.PSFrameworkSearchAutocomplete', $.ui.autocomplete, {
        _renderItem: function (ul, product) {
            if(enabled_image_search == '1'){
                return $("<li>")
                    .append($("<div>").addClass("search-product clearfix")
                        .append($("<div>").addClass("p-avatar")
                            .append($("<img>").attr({"src":product.image, "alt":product.pname}))
                        )
                        .append($("<div>").addClass("p-info")
                            .append($("<h4>")
                                .append($("<a>").attr("href", product.plink).html(product.pname))
                            )
                            .append($("<div>").addClass("cat")
                                .append($("<span>").html(txt_category))
                                .append($("<a>").attr("href", product.clink).html(product.cname))
                            )
                            .append($("<div>").addClass("price")
                                .append($("<span>").html(txt_price))
                                .append($("<span>").html(product.price))
                            )
                        )
                    ).appendTo(ul);
            }else{
                return $("<li>")
                    .append($("<div>").addClass("search-product noavatar")
                        .append($("<h4>")
                            .append($("<a>").attr("href", product.plink).html(product.pname))
                        )
                    ).appendTo(ul);
            }

        }
    });
    if(!_ismobile && enabled_ajax_search == '1'){
        if($('.frm-popupsearch').length >0){
            popupSearch = $('.frm-popupsearch');
            popupSearchBox    = popupSearch.find('.keyword');
            popupUiW = popupSearch.find('.popupUiW').actual( 'width' );
            if(popupSearch.find('.search-drop-down').length >0){
                var relative = popupSearch.find('.search-drop-down').attr('data-relative');
                if(relative == 'left'){
                    popupSearchResultLeftOffset = 2 + parseInt(popupSearch.find('.search-drop-down').actual( 'width'));
                }else{
                    popupSearchResultLeftOffset = 0;
                }

            }else
                popupSearchResultLeftOffset = 0;
            if(popupSearch.find('.category_id').length >0){
                popupSearchCategory = popupSearch.find('.category_id');
            }else
                popupSearchCategory = null;
            psf_popup_product_search();
        }
        if($('.frm-blocksearch').length >0) {
            blockSearch = $('.frm-blocksearch');
            blockSearchBox    = blockSearch.find('.keyword');
            blockUiW = blockSearch.find('.blockUiW').actual( 'width' );
            if(blockSearch.find('.search-drop-down').length >0){
                var relative = blockSearch.find('.search-drop-down').attr('data-relative');
                if(relative == 'left'){
                    blockSearchResultLeftOffset = 2 + parseInt(blockSearch.find('.search-drop-down').actual( 'width'));
                }else{
                    blockSearchResultLeftOffset = 0;
                }
            }else
                blockSearchResultLeftOffset = 0;
            if(blockSearch.find('.category_id').length >0){
                blockSearchCategory = blockSearch.find('.category_id');
            }else
                blockSearchCategory = null;
            psf_block_product_search();
        }
        $('.frm-blocksearch .category-item').on('click', function(){
            var thisDropDown = $(this).closest('.search-drop-down');
            thisDropDown.removeClass('active').find('.title span').text($(this).text());
            //thisDropDown.find('.title span').text($(this).text());
            blockSearchBox.val('');
            blockSearchCategory.val($(this).data('value'));
        });
        $('.frm-popupsearch .category-item').on('click', function(){
            var thisDropDown = $(this).closest('.search-drop-down');
            thisDropDown.removeClass('active');
            thisDropDown.find('.title span').text($(this).text());
            popupSearchBox.val('');
            popupSearchCategory.val($(this).data('value'));
        });
    }

    function psf_block_product_search(){
        blockSearchBox.PSFrameworkSearchAutocomplete({
            source: function (query, response) {
                $.get(psframeworkProductSearchUrl, {
                    search_query: blockSearchBox.val(),
                    id_category: (blockSearchCategory !== null ? blockSearchCategory.val() : 0),
                    limit: ajax_search_count,
                    ajax:1,
                    task:'searchProduct',
                }, null, 'json')
                    .then(function (resp) {
                        response(resp);
                    })
                    .fail(response);
            },
            minLength: 3,
            open: function() {
                $(".ui-autocomplete:visible").removeClass('ui-corner-all').css({'width': blockUiW, 'z-index': 1002, left:"-="+blockSearchResultLeftOffset});
            },
            select: function (event, ui) {
                var url = ui.item.plink;
                window.location.href = url;
            },
        });
    }
    function psf_popup_product_search(){
        popupSearchBox.PSFrameworkSearchAutocomplete({
            source: function (query, response) {
                $.get(psframeworkProductSearchUrl, {
                    search_query: popupSearchBox.val(),
                    id_category: (popupSearchCategory !== null ? popupSearchCategory.val() : 0),
                    limit: ajax_search_count,
                    ajax:1,
                    task:'searchProduct',
                }, null, 'json')
                    .then(function (resp) {
                        response(resp);
                    })
                    .fail(response);
            },
            minLength: 3,
            open: function() {
                $(".ui-autocomplete:visible").removeClass('ui-corner-all').css({'width': popupUiW, 'z-index': 1002, left:"-="+popupSearchResultLeftOffset});
            },
            classes: {
                "ui-autocomplete": "your-custom-class",
            },
            select: function (event, ui) {
                var url = ui.item.plink;
                window.location.href = url;
            },
        });
    }
});
