# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http.response import HttpResponse
from django.shortcuts import render
from brand_details.models import BrandDetails
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json


def product_brand(request):#product category page
   return render(request,"product_brand.html")

def product_brand_crud(request):#product category page
    ''' 
    25-jun-2018 PAR To  product brand  CRUD operaitons
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
            status = BrandDetails(brand_name=input_data[0].get("brand_name"),brand_description=input_data[0].get("brand_description"),is_active=True,created_by_id=int(uid))
            status.save()
            json_data['status']="ADD"
        if update_id and not delete_id:
            status = BrandDetails.objects.filter(id=update_id).update(brand_name=input_data[0].get("brand_name"),brand_description=input_data[0].get("brand_description"),is_active=True,modified_by_id=int(uid))
            json_data['status']="UPDE"
            
        if delete_id and not update_id:
            status = BrandDetails.objects.filter(id=delete_id).update(is_active=False,modified_by_id=int(uid))
            json_data['status']="RMVE" 
    except Exception as e:
        json_data["error"]=e
            
    return HttpResponse(json.dumps(json_data))  
@csrf_exempt
def product_brand_data(request):#product category data 
    ''' 
    25-jun-2018 PAR To  product category Data retrival
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
        print "brand===========>",post 
        mode=post.get("mode")
        option=post.get("value")
        if mode=="select":
            cursor.execute(" select id,COALESCE(brand_name, '')as brand_name from brand_details where is_active")
            values = dictfetchall(cursor)
            dic["vals"]=values
            
        if option:
            cursor.execute(" select id,id  AS  row_no, COALESCE(brand_name, '')  as brand_name,brand_description from brand_details where is_active and id=%s",[option])
            values = cursor.fetchall()
            if values:
                keys=['id','row_number','brand_name','brand_description']
                dictt = list(dict(zip(keys,j)) for j in values)
                dic["vals"]=dictt 
                dic["status"]="select" 
        elif not mode:  
            #cursor.execute("SELECT * FROM accounts_account where id=%s",[self.id])
            cursor.execute("select id,id  AS  row_no, COALESCE(brand_name, '')as brand_name,brand_description from brand_details where is_active")
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
