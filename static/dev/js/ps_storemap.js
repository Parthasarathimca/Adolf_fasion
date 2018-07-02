/*
 version:1.0.0
 */
var storemap_map = null, storemap_markers = new Array(), storemap_infoWindow = null, pin_icon='', store_info_type='';
$(document).ready(function(){
	if($("#storemap_map").length >0){
	    pin_icon = $("#storemap_map").data('pin_icon');
        store_info_type = $("#storemap_map").data('info_type');
		storemap_map = new google.maps.Map(document.getElementById('storemap_map'), {
			center: new google.maps.LatLng(latitude, longitude),
			zoom: 10,
			mapTypeId: 'roadmap',
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
		});
		storemap_infoWindow = new google.maps.InfoWindow();
		storemap_init_markers();
	}

});

function storemap_init_markers() {
    var data={'task':'getStores'};
    $.ajax({
        type: "POST",
        cache: false,
        url: psframeworkAjaxUrl,
        dataType : "json",
        data: data,
        complete: function(){},
        success: function (stores){
        	if(stores.length >0){
                for (store of stores) {
                    storemap_create_marker(store);
                }
			}
        }
    });
}
function storemap_create_marker(store)
{
	var marker,
		store_position = new google.maps.LatLng(parseFloat(store.latitude), parseFloat(store.longitude)),
		store_info='',
        store_logo = {
            url: store.image,
            scaledSize: new google.maps.Size(32, 32),
        };
	if(store_info_type == 'yt02'){
        store_info = renderStoreInfo_yt02(store);
        if(pin_icon != ''){
            marker = new google.maps.Marker({ map: storemap_map, icon: pin_icon,position: store_position });
        }else{
            marker = new google.maps.Marker({ map: storemap_map, position: store_position });
        }
    }else{
        store_info = renderStoreInfo_yt01(store);
        if(pin_icon != ''){
            marker = new google.maps.Marker({ map: storemap_map, icon: pin_icon,position: store_position });
        }else{
            marker = new google.maps.Marker({ map: storemap_map, icon: store_logo, position: store_position });
        }

    }
	google.maps.event.addListener(marker, 'click', function() {
		storemap_infoWindow.setContent(store_info);
        storemap_infoWindow.setOptions({maxWidth:400});
        storemap_infoWindow.open(storemap_map, marker);
	});
    storemap_markers.push(marker);
}
function renderStoreInfo_yt01(store) {
    var store_info='';
    store_info += '<div class="store-map-info">';
    store_info += '<h3>'+store.name+'</h3>';
    if(store.address1)
        store_info += '<div class="store-address address1"><span class="lab">'+txt_address1+': </span><span class="val">'+store.address1+'</span></div>';
    if(store.address2)
        store_info += '<div class="store-address address2"><span class="lab">'+txt_address2+': </span><span class="val">'+store.address2+'</span></div>';
    if(store.country)
        store_info += '<div class="store-address country"><span class="lab">'+txt_country+': </span><span class="val">'+store.country+'</span></div>';
    if(store.city)
        store_info += '<div class="store-address city"><span class="lab">'+txt_city+': </span><span class="val">'+store.city+'</span></div>';
    if(store.days_datas.length >0){
        store_info += '<h4 class="working_days_title">'+txt_working_days+'</h4>';
        store_info += '<div class="working_days">';
        for (days_data of store.days_datas) {
            store_info += '<div>';
            store_info += '<div>'+days_data.day+'</div>'
            if(days_data.hours.length >0){
                for (hour of days_data.hours) {
                    store_info += '<div class="hour">'+hour+'</div>';
                }
            }
            store_info += '</div>';
        }
        store_info += '</div>';
    }
    store_info += '</div>';
    return store_info;
}
function renderStoreInfo_yt02(store) {
    var store_info='';
    store_info += '<div class="store-map-info store-map-info-ty02">';
    store_info += '<h3>'+store.name+'</h3>';
    if(store.image)
        store_info += '<div class="store-logo"><img src="'+store.image+'" alt="'+store.name+'" /></div>';

    if(store.address1)
        store_info += '<div class="store-address address1"><span class="lab">'+txt_address1+': </span><span class="val">'+store.address1+'</span></div>';
    if(store.address2)
        store_info += '<div class="store-address address2"><span class="lab">'+txt_address2+': </span><span class="val">'+store.address2+'</span></div>';
    if(store.country)
        store_info += '<div class="store-address country"><span class="lab">'+txt_country+': </span><span class="val">'+store.country+'</span></div>';
    if(store.city)
        store_info += '<div class="store-address city"><span class="lab">'+txt_city+': </span><span class="val">'+store.city+'</span></div>';
    store_info += '</div>';
    return store_info;
}