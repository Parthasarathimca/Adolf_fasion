columns = [{title : "ID"},{title : "No."},{title : "Product Category"},{title : "Product"},{title : "Product Description"},{title : "Regular Price "},{title : "Selling Price"},{title : "Stock"}]
update_id="";
var img_id=0;
var csrf="";
$(document).ready(function (){
// product_category
button_create(1)
product_datatable_function();
get_product_category();
get_product_brand();
});//ready
function dropDownList(data,id,key){
    strAppend = '<option value="0">--Select Product Category--</option>'
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            strAppend += '<option value="'+data[i].id+'">'+data[i][key]+'</option>'
        }
        $('#'+id).html(strAppend).change(); 
    }else{
		
        $('#'+id).html(strAppend).change();
    }
}  
function get_product_category(){  
    $.ajax({
		url : '/product/category/data/',
        type : "POST",  
        data:{"mode":"select"},
		timeout : 10000,
		async:false,
	}).done( function(json_data) { 
        datas = JSON.parse(json_data);
        dropDownList(datas.vals,'product_category','category_name');
	});
}
function get_product_brand(){  
    $.ajax({
		url : '/product/brand/data/',
        type : "POST",  
        data:{"mode":"select"},
		timeout : 10000, 
		async:false,
	}).done( function(json_data) { 
		datas = JSON.parse(json_data);
		dropDownList(datas.vals,'product_brand','brand_name');
	});
}
function crud_operation(vals){
	alert(JSON.stringify(vals))
	$.ajax({
		type  : 'POST',
		data : vals,
		url   : '/product/crud/',
		async : false,
	}).done( function(json_data) {    	  
		data = JSON.parse(json_data);
		var res_status = data['status'];
		if(res_status=="ADD"){
			notify("success","Details Added ")   
			product_cancel_button();
			product_datatable_function();     
		} 
		else if(res_status=="UPDE"){ 
			notify("success","Details Updated ")
			product_cancel_button();
			product_datatable_function(); 	
		}
		else if(res_status=="RMVE"){ 
			notify("info","Details Removed")
			product_cancel_button();
			product_datatable_function();
		}
	});
}
function get_product_vals(){
					product_brand=$("#product_brand").val()
				    product_category=$("#product_category").val()
					var product_form_value = getFormValues("#product_form");
					var    csrf_data = product_form_value.csrfmiddlewaretoken;
					delete product_form_value["csrfmiddlewaretoken"];
					product_form_value['is_active'] = "True";
					product_form_value['product_name'] = $('#product_name').val();
					product_form_value['product_description'] = $('#product_description').val();

					product_form_value['product_regular_price'] = $('#product_regular_price').val();
					product_form_value['product_selling_price'] = $('#product_selling_price').val();
					product_form_value['product_stock'] = $('#product_stock').val();
  
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
    				//product_form_value['product_image'] = $('#product_image').val();
					cat_list = [];
					cat_dic = {}; 
					cat_list.push(product_form_value);
					cat_dic['input_data'] = cat_list; 
			return  cat_list  
					 
	}	
function put_product_vals(res){  
	alert(JSON.stringify(res))
	$("#product_brand").val(res[0].product_brand).trigger("change");
   	$("#product_category").val(res[0].product_category).trigger("change");
	$('#product_name').val(res[0].product_name);
	$('#product_description').val(res[0].product_descrtiption);
	$('#product_regular_price').val(res[0].product_regular_price);
	$('#product_selling_price').val(res[0].product_selling_price);
	$('#product_stock').val(res[0].product_stock);
	$('#product_cat_name').val(res[0].category_name);
	$('#product_cat_description').val(res[0].category_description)
	$('#img-upload').attr('src',img_path+res[0].product_image_id);
	img_id = res[0].attachment_id; 
	
} 
	function product_create(){ 
		if(product_validation())   
		{  
			var payload =get_product_vals(); 
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
	function product_update(){ 
		
		if(product_validation())  
		{
			if(img_id != 0){
				let update_status=updateAttachment();
				alert("updateAttachment==="+update_status)
			}
			var payload =get_product_vals();
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
	function product_remove(){ 
		
		if(product_validation())  
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
    function product_cancel_button() { 
		$('#product_form').trigger("reset");
		//$('#img-upload').attr('src'," ");
		update_id="";
		button_create(1);
		product_datatable_function(); 
	}  

//table row click get id 
$("#product_table").on("click", "tr", function() {
	if (!this.rowIndex) return; // skip first row 
	id = $('#product_table').dataTable().fnGetData(this)[0];
	if (id != 0) {
		update_id=id;
		product_datatable_function(id) 
		
	}
});	
//Product  data table function here
function product_datatable_function(param)
{
	if(!param && param != undefined){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()}	
	}
	else if(param){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),"value":param}
	}
	$.ajax(
			{
				url : '/product/data/',
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
								   drawDataTable('product_table',data.vals, columns,0);
							} 
							else if (data.status=="select"){
								
								button_create();
								put_product_vals(data.vals)
							}
						  
						}
						else{
							drawDataTable('product_table',[], columns,0);
						}

					});
	return false
}
//team form validations here
function product_validation()
{
	return $('#product_category').valid();
}
//button create function here
function button_create(status){
	// var access_for_create = jQuery.inArray( "Department", JSON.parse(localStorage.Create) );
	var strAppend = '';
	if(status == 1){
		strAppend = '<button id="product_save_button" class="btn btn-success  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="submit" onclick="product_create()"><span>Save</span></button>';
		strAppend += '<button id="product_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_cancel_button()"><span>Reset</span></button>';
		$('#button_div').html(strAppend);
	}else{
		
		strAppend = '<button id="product_remoce_button" class="btn btn-danger  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_remove()">	<span>Remove</span>	</button>';
		strAppend += '<button id="product_update_button" class="btn btn-info  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_update()"><span>Update</span></button>';
		strAppend += '<button id="product_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_cancel_button()"><span>Reset</span></button>';
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
	console.log("######",image_data)
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

$('#product_form').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	product_brand:
	{
		required: true,
		valueNotEquals:true,  
	},
	product_category:
	{
		required: true,
		valueNotEquals:true,  
	},
    product_name:
	   {
		   required: true,
        
	   },	
	   product_description: {
		   required: true,
		
	   },
	   product_regular_price:
	   {
		   required: true,
        
	   },
	   product_selling_price:
	   {
		   required: true,
        
	   },
	   product_stock:
	   {
		   required: true,
        
	   },
	   
   },
   //For custom messages
   messages: {
	product_brand:
	{
		required: "Select Product Brand"  ,
		valueNotEquals: "Select Vaild Product Brand"  
	},
	product_category:
	{
		required: "Select Product Category"  ,
		valueNotEquals: "Select Vaild Product Category"  
	},
    product_name:
	   {
    	   required: "Enter Product  Name",
	   },
	   product_description:
	   {
    	   required: "Enter Product  Description",
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



