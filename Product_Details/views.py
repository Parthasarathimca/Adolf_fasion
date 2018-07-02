# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http.response import HttpResponse
from django.shortcuts import render
from Product_Details.models import ProductCategory,Product
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json


# Create your views here.
def product_category(request):#product category page
   return render(request,"product_category.html")

def product(request):#product page
   return render(request,"product.html")

def product_category_crud(request):#product category page
    ''' 
    15-jun-2018 PAR To  product  CRUD operaitons
    @param request: Request Object 
    @type request : Object
    @return:   HttpResponse  
    @author: PAR
    '''
    try:
        post=request.POST 
        print "===========>",post
        json_data={}
        uid=request.user.id
        input_data = request.POST.get("payload")
        delete_id = request.POST.get("delete_id")  
        update_id=request.POST.get("update_id") 
        if input_data:
            input_data = json.loads(input_data)
        if not delete_id and not update_id:
            status = ProductCategory(category_name=input_data[0].get("product_cat_name"),category_description=input_data[0].get("product_cat_description"),is_active=True,created_by_id=int(uid))
            status.save()
            json_data['status']="ADD"
        if update_id and not delete_id:
            status = ProductCategory.objects.filter(id=update_id).update(category_name=input_data[0].get("product_cat_name"),category_description=input_data[0].get("product_cat_description"),is_active=True,modified_by_id=int(uid))
            json_data['status']="UPDE"
            
        if delete_id and not update_id:
            status = ProductCategory.objects.filter(id=delete_id).update(is_active=False,modified_by_id=int(uid))
            json_data['status']="RMVE" 
    except Exception as e:
        json_data["error"]=e
            
    return HttpResponse(json.dumps(json_data))  

@csrf_exempt
def product_category_data(request):#product category data 
    ''' 
    18-jun-2018 PAR To  product category Data retrival
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse 
    @author: PAR
    '''
    try:
        '''uid=request.user.id   
        input_data = request.POST.get("payload")
        delete_id = request.POST.get("delete_id")  
        update_id=request.POST.get("update_id")
        result=ProductCategory.objects.values_list()
        values=json.dumps(list(result))  
        '''
        post=request.POST 
        values=[]
        dic={}
        dictt={}
        cursor = connection.cursor()
        print "===========>",post 
        mode=post.get("mode")
        option=post.get("value")
        if mode=="select":
            cursor.execute(" select id,COALESCE(category_name, '')as category_name from product_category where is_active")
            values = dictfetchall(cursor)
            dic["vals"]=values
            
        if option:
            cursor.execute(" select id,id  AS  row_no, COALESCE(category_name, '')  as category_name,category_description from product_category where is_active and id=%s",[option])
            values = cursor.fetchall()
            if values:
                keys=['id','row_number','category_name','category_description']
                dictt = list(dict(zip(keys,j)) for j in values)
                dic["vals"]=dictt 
                dic["status"]="select" 
        elif not mode:  
            #cursor.execute("SELECT * FROM accounts_account where id=%s",[self.id])
            cursor.execute(" select id,id  AS  row_no, COALESCE(category_name, '')as category_name,category_description from product_category where is_active")
            values = cursor.fetchall() 
            values=list(values) 
            print " ****************  *********************",type(values)
            print " ****************  *********************",values 
            if values:
                dic["vals"]=values
                dic["status"]="all"
           # keys=['id','row_number','category_name','category_description']
           # dic = list(dict(zip(keys,j)) for j in values)
        
    except Exception as e: 
        values=e
    return HttpResponse(json.dumps(dic))   
  
     
#Returns all rows from a cursor as a dictionary
def dictfetchall(cursor):
    "Returns all rows from a cursor as a dictionary."
    """
            Returns all rows from a cursor as a dictionary
            @param cursor:cursor object
            @return: dictionary contains the details fetch from the cursor object
            @rtype: dictionary
    """
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]
######## ############################### product details ################################################

def product_crud(request):#product category page
    ''' 
    21-jun-2018 PAR To  product  CRUD operaitons
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse  
    @author: sarathi
    '''
    try:
        post=request.POST 
        print "product===========> ",post
        json_data={}
        uid=request.user.id
        input_data = request.POST.get("payload") 
        delete_id = request.POST.get("delete_id")  
        update_id=request.POST.get("update_id") 
        if input_data:
            input_data = json.loads(input_data)
        if not delete_id and not update_id:
  
            status = Product(product_brand_id=input_data[0].get("product_brand"),product_category_id=input_data[0].get("product_category"),product_name=input_data[0].get("product_name"),
            product_descrtiption=input_data[0].get("product_description"),
            product_regular_price=input_data[0].get("product_regular_price"),
            product_selling_price=input_data[0].get("product_selling_price"),
            product_stock=input_data[0].get("product_stock"), 
            product_image_id=input_data[0].get("product_image"),    
            is_active=True,created_by_id=int(uid)) 
            status.save()    
            json_data['status']="ADD" 
        if update_id and not delete_id: 
            status = Product.objects.filter(id=update_id).update(product_brand_id=input_data[0].get("product_brand"),product_category_id=input_data[0].get("product_category"),product_name=input_data[0].get("product_name"),
            product_descrtiption=input_data[0].get("product_description"),
            product_regular_price=input_data[0].get("product_regular_price"),
            product_selling_price=input_data[0].get("product_selling_price"),
            product_stock=input_data[0].get("product_stock"),is_active=True,modified_by_id=int(uid))
            json_data['status']="UPDE"

        if delete_id and not update_id:
            status = Product.objects.filter(id=delete_id).update(is_active=False,modified_by_id=int(uid))
            json_data['status']="RMVE" 
    except Exception as e:
        json_data["error"]=e 
        print "EEeeeeeeee+++++++++++",e    
    print "JSON DATA +_+_+_+_",json_data 
    return HttpResponse(json.dumps(json_data))  



@csrf_exempt
def product_data(request):#product  data 
    ''' 
    21-jun-2018 PAR To  product category Data retrival
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse 
    @author: PAR
    '''
    try:
        post=request.POST 
        values=[]
        dic={}
        dictt={}
        cursor = connection.cursor()
        print "product ===========>",post 
        mode=post.get("mode")
        option=post.get("value")
        if mode=="select":
            cursor.execute(" select id,COALESCE(product_name, '')as product_name from product where is_active")
            values = dictfetchall(cursor)
            dic["vals"]=values
        if option and option != str("index"):
            print "@@@@@@m",option
            print "@@@@@@m",mode 
            cursor.execute("select product.id,product.id  AS  row_no,bd.id as product_brand, pc.id as product_category,product_name,product_descrtiption,product_regular_price,product_selling_price,product_stock,ai.id as attachment,ai.name as product_image_id from product inner join product_category pc on pc.id=product.product_category_id inner join attachment_info ai on ai.id=product.product_image_id inner join brand_details bd on bd.id= product.product_brand_id  where product.is_active  and product.id=%s;",[option])
            values = cursor.fetchall()
            if values:
                keys=['id','row_number','product_brand','product_category','product_name','product_descrtiption','product_regular_price','product_selling_price','product_stock','attachment_id','product_image_id']
                dictt = list(dict(zip(keys,j)) for j in values)
                dic["vals"]=dictt 
                dic["status"]="select" 
        elif not mode:
            #cursor.execute("SELECT * FROM accounts_account where id=%s",[self.id])
            cursor.execute("select product.id,product.id  AS  row_no, pc.category_name,product_name,product_descrtiption,product_regular_price,product_selling_price,product_stock,ai.name as product_image_id from product inner join product_category pc on pc.id=product.product_category_id inner join attachment_info ai on ai.id=product.product_image_id  where product.is_active")
            values = cursor.fetchall()
            values=list(values) 
            print " ****************  *********************",values 
            if option ==str("index"):
                 keys=['id','row_number','category_name','product_name','product_descrtiption','product_regular_price','product_selling_price','product_stock','product_image_id']
                 dictt = list(dict(zip(keys,j)) for j in values)
                 dic["vals"]=dictt
                 dic["status"]="all"
            else:
                if values: 
                    dic["vals"]=values
                    dic["status"]="all" 
    except Exception as e: 
        values=e 
    print "@@@@@@@@@",dic
    return HttpResponse(json.dumps(dic))   
  
