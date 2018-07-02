columns = [{title : "ID"},{title : "No."},{title : "Product Category Name"},{title : "Product Category Description"	}]
update_id="";
$(document).ready(function (){


//drop down list
var csrf="";
function dropDownList(data,id){
		strAppend = '<option value="0">--Select Organization Unit--</option>'
		if(data.length>0){
			for(var i=0;i<data.length;i++){
				strAppend += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			}
			$('#'+id).html(strAppend).change();
		}else{
			$('#'+id).html(strAppend).change();
		}
}
//drawDataTable('example',[], columns,0);


button_create(1)
category_datatable_function();

});//ready

function crud_operation(vals){
	$.ajax({
		type  : 'POST',
		data : vals,
		url   : '/product/category/crud/',
		async : false,
	}).done( function(json_data) {    	 
		data = JSON.parse(json_data);
		var res_status = data['status'];
		alert(res_status)
		if(res_status=="ADD"){
			notify("success","Details Added ")
			product_category_cancel_button();
		}
		else if(res_status=="UPDE"){
			notify("success","Details Updated ")
			product_category_cancel_button();
			
		}
		else if(res_status=="RMVE"){
			notify("info","Details Removed")
			product_category_cancel_button();
		}
		
	});
}

function get_product_category_vals(){
	
					//product_cat_name=$("#organization").val()
					//product_cat_desc=$("#team_name").val()
					var product_cat_form_value = getFormValues("#product_category");
					var    csrf_data = product_cat_form_value.csrfmiddlewaretoken;
					delete product_cat_form_value["csrfmiddlewaretoken"];
					product_cat_form_value['is_active'] = "True";
					product_cat_form_value['product_cat_name'] = $('#product_cat_name').val();
					product_cat_form_value['product_cat_description'] = $('#product_cat_description').val();
					cat_list = [];
					cat_dic = {};
					cat_list.push(product_cat_form_value);
					cat_dic['input_data'] = cat_list;
			return  cat_list
					 
	}
function put_product_category_vals(res){
	$('#product_cat_name').val(res[0].category_name);
	$('#product_cat_description').val(res[0].category_description)
}
	function product_category_create(){ 
		if(product_category_validation())  
		{
			var payload =get_product_category_vals();
			var vals = {
				'payload' : JSON.stringify(payload),
				'delete_id' : '',
				'update_id' : "",
				csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
			}
		  crud_operation(vals);
		}
	}
	function product_category_update(){ 
		if(product_category_validation())  
		{
			var payload =get_product_category_vals();
			var vals = {
				'payload' : JSON.stringify(payload),
				'delete_id' : '',
				'update_id' :update_id,
				csrfmiddlewaretoken : $("input[name=csrfmiddlewaretoken]").val()
			}
		  crud_operation(vals);
		}
	}
	function product_category_remove(){ 
		if(product_category_validation())  
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
$("#category").on("click", "tr", function() {
	if (!this.rowIndex) return; // skip first row
	id = $('#category').dataTable().fnGetData(this)[0];
	if (id != 0) {
		update_id=id;
		category_datatable_function(id)
		
	}
});	

//Product category data table function here
function category_datatable_function(param)
{
	if(!param && param != undefined){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()}	
	}
	else if(param){
		var data={csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),"value":param}
	}
	$.ajax(
			{
				url : '/product/category/data/',
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
								   drawDataTable('category',data.vals, columns,0);
							} 
							else if (data.status=="select"){
								button_create();
								put_product_category_vals(data.vals)
							}
						  
						}else{
						
							drawDataTable('category',[], columns,0);
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
function product_category_validation()
{
	return $('#product_category').valid();
}
var team_update_id="";
$('#team_details').on('click','tr',function(){
	team_table_id = $('#team_details').dataTable().fnGetData(this)[0];
	button_create()
	$.ajax(
			{
				url : '/hrms_team_table_click/',
				type : 'POST',
				timeout : 10000,
				data:{"table_id":team_table_id,csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()},
				async:false,
			}).done(
					function(json_data)
					{
						var data = JSON.parse(json_data)
						team_cancel_button();
						team_update_id = team_table_id;
						$("#org_unit_id").html("");
						
						$('#organization').val(data.results[0][1]).trigger('change');
						$("#org_unit_id").append("<option value='"+data.results[0][2]+"'>"+data.results[0][3]+"</option>");
						$('#org_unit_id').val(data.results[0][2]).trigger('change');
						$('#team_name').val(data.results[0][4]);
						$('#team_code').val(data.results[0][5]);
						$('#team_description').val(data.results[0][6]);
						
					});
});

//jquery Team validation
jQuery.validator.addMethod('valueNotEquals', function (value) {
  return (value != '0');
}, "Organization required");
//product category 	 cancel function here 
function product_category_cancel_button() {
	$('#product_category').trigger("reset");
	update_id="";
	button_create(1);
	category_datatable_function();
} 

//cancel clear function call button
function cancelEvent(){
	if(team_update_id != '' ){
		orgClearFuncton('cancelEventCall');
	}else{	
		cancelEventCall();
	} 	
	teamCodeGenerate();
	team_datatable_function(null)
}

//button create function here
function button_create(status){
	// var access_for_create = jQuery.inArray( "Department", JSON.parse(localStorage.Create) );
	// var access_for_write = jQuery.inArray( "Department", JSON.parse(localStorage.Write) );
	// var access_for_delete = jQuery.inArray( "Department", JSON.parse(localStorage.Delete) );
	var strAppend = '';
	if(status == 1){
		strAppend = '<button id="product_save_button" class="btn btn-success  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_category_create()"><span>Save</span></button>';
		strAppend += '<button id="product_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_category_cancel_button()"><span>Reset</span></button>';
		$('#button_div').html(strAppend);
	}else{
		
		strAppend = '<button id="product_remoce_button" class="btn btn-danger  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_category_remove()">	<span>Remove</span>	</button>';
		strAppend += '<button id="product_update_button" class="btn btn-info  main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_category_update()"><span>Update</span></button>';
		strAppend += '<button id="product_reset_button" class="btn btn-secondary   main_color-border main_color-hover-color white_color-hover-background transition-300" data-link-action="save-customer" type="button" onclick="product_category_cancel_button()"><span>Reset</span></button>';
		$('#button_div').html(strAppend);
	}
}

$('#product_category').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
    product_cat_name:
	   {
		   required: true,
        
	   },	
	   product_cat_description: {
		   required: true,
		
	   },
   },
   //For custom messages
   messages: {
	   
    product_cat_name:
	   {
    	   required: "Enter Product Category Name",
	   },
	product_cat_description:
	   {
    	   required: "Enter Product Category Description",
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



