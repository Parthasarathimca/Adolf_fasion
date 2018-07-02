columns = [{title : "ID"},{title : "No."},{title : "Product Category Name"},{title : "Product Category Description"	}]
update_id="";
$(document).ready(function (){
var csrf="";
button_create(1)
brand_datatable_function();

});//ready

function crud_operation(vals){
	$.ajax({
		type  : 'POST',
		data : vals,
		url   : '/product/brand/crud/',
		async : false,
	}).done( function(json_data) {    	 
		data = JSON.parse(json_data);
		var res_status = data['status'];
		alert(res_status)
		if(res_status=="ADD"){
			notify("success","Details Added ")
			brand_cancel_button();
		}   
		else if(res_status=="UPDE"){
			notify("success","Details Updated ")
			brand_cancel_button();
			
		}
		else if(res_status=="RMVE"){
			notify("info","Details Removed")
			brand_cancel_button();
		}
		
	});
}

function get_brand_vals(){
	
					var brand_form_value = getFormValues("#brand_form");
					var    csrf_data = brand_form_value.csrfmiddlewaretoken;
					delete brand_form_value["csrfmiddlewaretoken"];
					brand_form_value['is_active'] = "True";
					brand_form_value['brand_name'] = $('#brand_name').val();
					brand_form_value['brand_description'] = $('#brand_description').val();
					brand_list = [];
					cat_dic = {};
					brand_list.push(brand_form_value);
					cat_dic['input_data'] = brand_list;
			return  brand_list
					 
	}
function put_brand_vals(res){
	$('#brand_name').val(res[0].brand_name);
	$('#brand_description').val(res[0].brand_description)
}
	function brand_create(){ 
		if(brand_validation())  
		{
			var payload =get_brand_vals();
			var vals = {
				'payload' : JSON.stringify(payload),
				'delete_id' : '',
				'update_id' : "",
				csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
			}
		  crud_operation(vals);
		}
	}
	function brand_update(){ 
		if(brand_validation())  
		{
			var payload =get_brand_vals();
			var vals = {
				'payload' : JSON.stringify(payload),
				'delete_id' : '',
				'update_id' :update_id,
				csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
			}
		  crud_operation(vals);
		}
	}
	function brand_remove(){ 
		if(brand_validation())  
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
//table row click get id 
$("#brand_table").on("click", "tr", function() {
	if (!this.rowIndex) return; // skip first row
	id = $('#brand_table').dataTable().fnGetData(this)[0];
	if (id != 0) {
		update_id=id;
		brand_datatable_function(id)
	}
});	

//Product category data table function here
function brand_datatable_function(param)
{
	if(!param && param != undefined){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()}	
	}
	else if(param){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),"value":param}
	}
	$.ajax(
			{
				url : '/product/brand/data/',
				type : 'POST',
				timeout : 10000,
				data:data,  
				async:false,
			}).done(
					function(json_data)
					{    
					    var data = JSON.parse(json_data)
						if (data.vals){
							
							if (data.status=="all"){
								   drawDataTable('brand_table',data.vals, columns,0);
							} 
							else if (data.status=="select"){ 
								button_create();
								put_brand_vals(data.vals)
							}
						} else{ 
						     drawDataTable('brand_table',[], columns,0);
						}

						table_data=data.value;
						team_code=data.code
						if(team_code){
							team_code=team_code[0].code;
						}
						
					});
	return false
}
//team form validations here
function brand_validation()
{
	return $('#brand_form').valid(); 
}
var team_update_id="";
//jquery Team validation
jQuery.validator.addMethod('valueNotEquals', function (value) {
  return (value != '0'); 
}, "Organization required");
//product category 	 cancel function here 
function brand_cancel_button() {
	$('#brand_form').trigger("reset");
	update_id="";
	button_create(1);
	brand_datatable_function();
} 
//button create function here
function button_create(status){
	// var access_for_create = jQuery.inArray( "Department", JSON.parse(localStorage.Create) );
	// var access_for_write = jQuery.inArray( "Department", JSON.parse(localStorage.Write) );
	// var access_for_delete = jQuery.inArray( "Department", JSON.parse(localStorage.Delete) );
	var strAppend = '';
	if(status == 1){
		strAppend = '<button id="brand_save_button" class="btn btn-success  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="brand_create()"><span>Save</span></button>';
		strAppend += '<button id="brand_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="brand_cancel_button()"><span>Reset</span></button>';
		$('#brand_button_div').html(strAppend);
	}else{
		
		strAppend = '<button id="brand_remoce_button" class="btn btn-danger  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="brand_remove()">	<span>Remove</span>	</button>';
		strAppend += '<button id="brand_update_button" class="btn btn-info  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="brand_update()"><span>Update</span></button>';
		strAppend += '<button id="brand_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="brand_cancel_button()"><span>Reset</span></button>';
		$('#brand_button_div').html(strAppend);
	}
}

$('#brand_form').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
    brand_name:
	   {
		   required: true,
        
	   },	
	   brand_description: {
		   required: true,
		
	   },
   },
   //For custom messages
   messages: {
	   
    brand_name:
	   {
    	   required: "Enter Brand Name",
	   },
       brand_description:
	   {
    	   required: "Enter Brand Description",
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



