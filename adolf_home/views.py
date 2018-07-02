# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.generic.base import TemplateView
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from Product_Details.models import OfferDetails
from django.http.response import HttpResponse
from django.shortcuts import render
import json

# Create your views here.
    

# Transform CMS dashboard views here 
class Adolf_homeView(TemplateView):
    ''' 
    22-jun-2018 home view 
    
    '''
    template_name = "index.html"
    
    #@method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super(Adolf_homeView, self).dispatch(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        
        #infromation_datas = {}
        context = super(Adolf_homeView, self).get_context_data(**kwargs)
        cursor = connection.cursor() 
        try:
            if cursor:
                cursor.execute("select id,COALESCE(brand_name, '')as brand_name from brand_details where is_active")
                values = dictfetchall(cursor)
                context["vals"]=values
        except Exception as e:
            context["vals"]={}
            

        # try:
        #     build_details = jenkins_fetch.get_build("HCMS-Transform-WebApp-Test")
        #     self.request.session['build_no'] = build_details[0]['last_build_number']
        #     self.request.session["build_date"] = build_details[0]['last_build_date'].split(' ')[0]
        # except:
        #     self.request.session["build_no"] = 52
        #     self.request.session["build_date"] = "2017-11-24 12:28:30+00:00"
        return self.render_to_response(context) 

@csrf_exempt
def brand_product_data(request):#product category data 
    ''' 
    26-jun-2018 PAR To  brand product  Data retrival
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
        print "#===========>",post 
        brand=post.get("brand")

        if brand:
            cursor.execute("select product.id,product.id  AS  row_no, pc.category_name,product_name,product_descrtiption,product_regular_price,product_selling_price,product_stock,ai.name as product_image_id,bd.brand_name as brand from product inner join product_category pc on pc.id=product.product_category_id inner join attachment_info ai on ai.id=product.product_image_id inner join brand_details bd on bd.id=product.product_brand_id   where bd.brand_name LIKE %s  and product.is_active order by product_regular_price desc LIMIT 3",[brand])
            values = dictfetchall(cursor)
            dic["vals"]=values
        print "diccccccccccccccccccccccccccccc",dic
    except Exception as e: 
        values=e
    return HttpResponse(json.dumps(dic))   
# Create your views here.
def offer_slider(request):#product category page 
   return render(request,"offer_slider.html")

def offer_slider_crud(request):#product category page
    ''' 
    27-june-2018 PAR To  Offer slider   CRUD operaitons
    @param request: Request Object 
    @type request : Object
    @return:   HttpResponse   
    @author: PAR
    '''
    try:
        post=request.POST 
        print "offer slider===========>",post
        json_data={}
        uid=request.user.id 
        input_data = request.POST.get("payload")
        delete_id = request.POST.get("delete_id")   
        update_id=request.POST.get("update_id") 
        if input_data: 
            input_data = json.loads(input_data)  
        if not delete_id and not update_id: 
            status = OfferDetails(product_id=input_data[0].get("product"),top_subtitle=input_data[0].get("top_subtitle"),
            bottom_subtitle=input_data[0].get("bottom_subtitle"), 
            slider_image_id=input_data[0].get("product_image"),is_active=True,created_by_id=int(uid))
            status.save()
            json_data['status']="ADD"
        if update_id and not delete_id:
            print "################",input_data
            status = OfferDetails.objects.filter(id=update_id).update(product_id=input_data[0].get("product"),top_subtitle=input_data[0].get("top_subtitle"),
            bottom_subtitle=input_data[0].get("bottom_subtitle"), 
            slider_image_id=input_data[0].get("product_image"),is_active=True,modified_by_id=int(uid))
            json_data['status']="UPDE"
            
        if delete_id and not update_id:
            status = OfferDetails.objects.filter(id=delete_id).update(is_active=False,modified_by_id=int(uid))
            json_data['status']="RMVE" 
    except Exception as e:
        json_data["error"]=e
            
    return HttpResponse(json.dumps(json_data))  

@csrf_exempt
def offer_slider_data(request):#product category data 
    ''' 
    27-jun-2018 PAR To  product category Data retrival
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
        print "===========>",post 
        mode=post.get("mode")
        option=post.get("value")
        if mode=="index":
            cursor.execute("select od.id,COALESCE(top_subtitle, '')as top_subtitle,COALESCE(bottom_subtitle, '')as bottom_subtitle,ai.name as attachment from offer_details od inner join attachment_info ai on ai.id=od.slider_image_id where od.is_active")
            values = dictfetchall(cursor)
            dic["vals"]=values
            dic["status"]="index" 
            
        if option:
            cursor.execute("select od.id,od.id  AS  row_no,od.product_id, COALESCE(top_subtitle, '')as top_subtitle,bottom_subtitle,ai.name as slider_image_id, ai.id as attachment from offer_details od  inner join attachment_info ai on ai.id=od.slider_image_id where od.is_active and od.id=%s",[option])
            values = cursor.fetchall()
            if values:
                keys=['id','row_number','product','top_subtitle','bottom_subtitle','slider_image_id','attachment']
                dictt = list(dict(zip(keys,j)) for j in values)
                dic["vals"]=dictt 
                dic["status"]="select" 
                
        elif not mode:   
            #cursor.execute("SELECT * FROM accounts_account where id=%s",[self.id])
            cursor.execute(" select od.id,od.id  AS  row_no,p.product_name, COALESCE(top_subtitle, '')as top_subtitle,bottom_subtitle,ai.name as slider_image_id from offer_details od  inner join attachment_info ai on ai.id=od.slider_image_id inner join product p on od.product_id=p.id where od.is_active")
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
    print " ****************  *********************",dic
    return HttpResponse(json.dumps(dic))   

@csrf_exempt
def category_data(request):#product category data 
    ''' 
    29-june-2018 PAR To  product category Data retrival
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse 
    @author: sarathi
    '''
    try:
        post=request.POST 
        values=[]
        dic={}
        dictt={}
        cursor = connection.cursor()
        cursor.execute(" select id,brand_name from  brand_details where is_active;")
        values = cursor.fetchall() 
        if values:
            #values=list(values)
           # dic["brand"]=values  
            keys=['id','brand']
            dic = list(dict(zip(keys,j)) for j in values)
            dictt["brand"]=dic 
        cursor.execute(" select id,category_name from  product_category where is_active;")
        values = cursor.fetchall() 
        if values:
            #values=list(values)
            keys=['id','category']
            dic = list(dict(zip(keys,j)) for j in values)
            dictt["category"]=dic
    except Exception as e: 
        values=e 
    print " **************** *********************",dictt
    return HttpResponse(json.dumps(dictt))   



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