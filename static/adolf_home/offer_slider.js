columns = [{title : "ID"},{title : "No."},{title : "Product."},{title : "Offer Slider Top Subtitle"},{title : "Offer Slider Bottom Subtitle"}]
update_id="";
var img_id=0;
var csrf="";
$(document).ready(function (){
// product_category
button_create(1)
slider_datatable_function();
get_product();
});//ready

function dropDownList(data,id,key){
    strAppend = '<option value="0">--Select Product --</option>'
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            strAppend += '<option value="'+data[i].id+'">'+data[i][key]+'</option>'
        }
        $('#'+id).html(strAppend).change(); 
    }else{
		
        $('#'+id).html(strAppend).change();
    }
}  
function get_product(){
    $.ajax({
		url : '/product/data/',
        type : "POST",  
        data:{"mode":"select"}, 
		timeout : 10000,
		async:false,
	}).done( function(json_data) { 
        datas = JSON.parse(json_data);  
        alert(JSON.stringify(datas))
        dropDownList(datas.vals,'product','product_name');
	});
}
function crud_operation(vals){
	alert(JSON.stringify(vals))
	$.ajax({
		type  : 'POST',  
		data : vals,
		url   : '/adolf/offer_slider/crud/', 
		async : false,
	}).done( function(json_data) {    	   
		data = JSON.parse(json_data);
		var res_status = data['status'];
		if(res_status=="ADD"){  
			notify("success","Details Added ")   
			offer_slider_cancel();
			slider_datatable_function();         
		} 
		else if(res_status=="UPDE"){ 
			notify("success","Details Updated ") 
			offer_slider_cancel();
			slider_datatable_function(); 	
		}
		else if(res_status=="RMVE"){ 
			notify("info","Details Removed")
			offer_slider_cancel();
			slider_datatable_function();
		}
	});
}
function get_offer_slider_vals(){
					product_brand=$("#product").val()
				    var product_form_value = getFormValues("#offer_slider_form");
					var    csrf_data = product_form_value.csrfmiddlewaretoken;
					delete product_form_value["csrfmiddlewaretoken"];
					product_form_value['is_active'] = "True";
					product_form_value['top_subtitle'] = $('#top_subtitle').val();
					product_form_value['bottom_subtitle'] = $('#bottom_subtitle').val();
					if (img_id==0){
						img_status_id=saveAttachment(); 
					
						if (img_status_id!=0){  
							
							product_form_value['product_image'] = img_status_id;
						}
						else{
						notify("error","Image Not Uploaded")
						return false;	
						}  
				   }
				   else{
					product_form_value['product_image'] = img_id;
				   }  

    				
					cat_list = [];
					cat_dic = {}; 
					cat_list.push(product_form_value);
					cat_dic['input_data'] = cat_list; 
			return  cat_list  
					 
	}	
function put_offer_slider_vals(res){  
	alert(JSON.stringify(res)) 
	$("#product").val(res[0].product).trigger("change");
   	$("#top_subtitle").val(res[0].top_subtitle);
	$('#bottom_subtitle').val(res[0].bottom_subtitle);
	$('#img-upload').attr('src',img_path+res[0].slider_image_id);
	
	alert(res[0].attachment)
	img_id = res[0].attachment; 
	
} 
	function offer_slider_create(){   
		if(offer_slider_validate())   
		{  
			var payload =get_offer_slider_vals(); 
			console.log("payload",payload)   
			if(payload){
			var vals = {
				'payload' : JSON.stringify(payload),
				'delete_id' : '',    
				'update_id' : "",   
				csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
			}
		  crud_operation(vals);
		}
		}
	}
	function offer_slider_update(){ 
		
		if(offer_slider_validate())  
		{
			if(img_id != 0){
				let update_status=updateAttachment();
				alert("updateAttachment==="+update_status)
			}
			var payload =get_offer_slider_vals();
			if(payload){
			var vals = {  
				'payload' : JSON.stringify(payload),
				'delete_id' : '',
				'update_id' :update_id,
				csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
			}
		  crud_operation(vals); 
		}
		}
	}
	function offer_slider_remove(){ 
		
		if(offer_slider_validate())  
		{
			if (update_id){
			//var payload =get_product_category_vals();
			var vals = {
				'payload' : '',
				'delete_id' :update_id,
				'update_id' :'',
				csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
			}
		}
		  crud_operation(vals);
		} 
	}
    //product cancel function here 
    function offer_slider_cancel() { 
		$('#offer_slider_form').trigger("reset");
		//$('#img-upload').attr('src'," ");
		update_id="";
		button_create(1);
		slider_datatable_function(); 
	}  

//table row click get id 
$("#offer_slider_table").on("click", "tr", function() {
	if (!this.rowIndex) return; // skip first row 
	id = $('#offer_slider_table').dataTable().fnGetData(this)[0];
	if (id != 0) {
		update_id=id;
		slider_datatable_function(id) 
		
	}
});	
//Product  data table function here
function slider_datatable_function(param)
{
	if(!param && param != undefined){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()}	
	}
	else if(param){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),"value":param}
	}
	$.ajax(
			{
				url : '/adolf/offer_slider/data/',
				type : 'POST',
				timeout : 10000,
				data:data,   
				async:false,
			}).done(
					function(json_data)
					{    
						var data = JSON.parse(json_data)
						if(data.vals)
						 { 
							if (data.status=="all"){ 
								   drawDataTable('offer_slider_table',data.vals, columns,0);
							} 
							else if (data.status=="select"){
								
								button_create();
								put_offer_slider_vals(data.vals)
							}
						} 
						else{
							drawDataTable('offer_slider_table',[], columns,0);
						}

					});
	return false
}
//offer_slider  form validations here
function offer_slider_validate()
{
	return $('#offer_slider_form').valid();
}
//button create function here
function button_create(status){
	// var access_for_create = jQuery.inArray( "Department", JSON.parse(localStorage.Create) );
	var strAppend = ''; 
	if(status == 1){
		strAppend = '<button id="offer_save_button" class="btn btn-success  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="submit" onclick="offer_slider_create()"><span>Save</span></button>';
		strAppend += '<button id="product_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="offer_slider_cancel()"><span>Reset</span></button>';
		$('#button_div').html(strAppend);
	}else{
		
		strAppend = '<button id="product_remoce_button" class="btn btn-danger  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="offer_slider_remove()">	<span>Remove</span>	</button>';
		strAppend += '<button id="product_update_button" class="btn btn-info  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="offer_slider_update()"><span>Update</span></button>';
		strAppend += '<button id="product_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="offer_slider_cancel()"><span>Reset</span></button>';
		$('#button_div').html(strAppend);
	}
}

//image validation
function validate() {
	var ext = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '').split('.')[1].toLowerCase();
	if($.inArray(ext, ['png','jpg','jpeg']) == -1) {
		alert("validate error", "Invalid image extension. Please upload a image in .jpg, .jpeg or .png");
		return false
	}else{
		return true
	}
}
var image_data = {}
//image encode function here 
function encodeImageToString(element) {
	if(element){
		var FileSize = element.files[0].size / 1024 / 1024; // in MB
		if (FileSize > 1) {
			notify("error", "Image size exceeds 1 MB. Please upload a valid image.");
			return false;
			// $(file).val(''); //for clearing with Jquery
		} else {
			if(validate()){
				if($('input[type=file]').val().replace(/C:\\fakepath\\/i, '')){
					image_data = {}
					image_data['img_name'] = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')
					var file = element.files[0];
					var reader = new FileReader();
					reader.onloadend = function() {
						var img_str = reader.result
						image_data['img_str'] =img_str.split(',')[1] 
						image_data['img_format'] = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '').split('.')[1];
						
					}
					reader.readAsDataURL(file);
				}
			}else{
				image_data = {};
				//$('.fileinput-exists').trigger('click'); 
			}}}else{  
				notify("info", "Image upload error.");
			}
			console.log("@@@",image_data)			
			
			
		  
  }
  
  
//attachment save in server
function saveAttachment(){
	alert("in save attachment")
  console.log(image_data)
	val = 0;
	if(image_data['img_str']){
		$.ajax({
			url : "/product/image/crud/",
			type : "POST",
			data : image_data,
			timeout : 10000,
			async:false,
		}).done( function(json_data) {
			data = JSON.parse(json_data);
			if(data['id'] != 0){ 
				val = data['id'];
				val_status = 1;
				image_data = {}
			}else{
				notify("error"," errir in save attchemnt");
				val = 0;
			}
		});
	}else{
		val = 0;
	}
	return val

}
//attachment update in server
function updateAttachment(){
	val = img_id;
	alert(img_id)
	console.log("######3",image_data)
	if(image_data['img_str'] && img_id != 0){
		image_data['attachment_id'] = img_id;
		$.ajax({
			url : "/product/image/crud/",
			type : "POST",
			data : image_data,
			timeout : 10000, 
			async:false, 
		}).done( function(json_data) {
			data = JSON.parse(json_data);
			if(data['id'] != 0){  
				image_data = {}
				val == data['id'];
//			    $('.fileinput-preview').html("<img src='/static/ui/images/avatar.png' alt='Imgae' />").trigger('click');
			}else{
				alert_lobibox("error");
				val = img_id;
			}

		});
	}else{
		val = img_id;
	}
	return val
}



//jquery Team validation
jQuery.validator.addMethod('valueNotEquals', function (value) {
	return (value != '0');
  }, "Product Category required");

$('#offer_slider_form').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	product:
	{
		required: true,
		valueNotEquals:true,  
	},
    top_subtitle:
	   {
		   required: true,
	   },	
	   bottom_subtitle:
	   {
		   required: true,
	   },	
   },
   //For custom messages
   messages: {
	product:
	{
		required: "Select Product "  ,
		valueNotEquals: "Select Vaild Product "  
	},
	
    top_subtitle:
	   {
    	   required: "Enter Top Subtitle",
	   },
	   bottom_subtitle:
	   {
    	   required: "Enter Bottom Subtitle",
	   },	   
	   product_regular_price:
	   {
    	   required: "Enter Product Regualar Price ",
	   },	   
	   product_selling_price:
	   {
    	   required: "Enter Product Selling Price ",
	   },	   
	   product_stock:
	   {
    	   required: "Enter Product  Stock",
	   },	   
	   

   },
   errorElement: 'div',
   errorPlacement: function(error, element) {
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
   ignore: []
});



