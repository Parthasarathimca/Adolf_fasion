# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from adolf_home.models import BaseModel,ImageAttachment
from brand_details.models import BrandDetails
# Create your models here.

#Product category  models
class ProductCategory(BaseModel):
    category_name = models.CharField(max_length=50,null=True, blank=True)
    category_description=models.CharField(max_length=100,null=True,blank=True)
    class Meta: 
        db_table = 'product_category'
        ordering = ['category_name']

#Product Details models
class Product(BaseModel):  
    product_brand= models.ForeignKey(BrandDetails,related_name='product_brand_id', null=True, blank=True)
    product_category= models.ForeignKey(ProductCategory,related_name='product_category_id', null=True, blank=True)
    product_name = models.CharField(max_length=50,null=True, blank=True)
    product_descrtiption=models.CharField(max_length=100,null=True,blank=True)
    product_regular_price=models.IntegerField(null=True, blank=True)
    product_selling_price=models.IntegerField(null=True, blank=True)
    product_stock=models.IntegerField(null=True, blank=True)
    product_image= models.ForeignKey(ImageAttachment,related_name='product_image_id', null=True, blank=True)
    class Meta:
        db_table = 'product'
        ordering = ['product_name']  

class OfferDetails(BaseModel):
    product= models.ForeignKey(Product,related_name='product_id', null=True, blank=True)
    top_subtitle = models.CharField(max_length=50,null=True, blank=True)
    bottom_subtitle = models.CharField(max_length=50,null=True, blank=True)
    slider_image= models.ForeignKey(ImageAttachment,related_name='slider_image_id', null=True, blank=True)

    class Meta: 
        db_table = 'offer_details'
        ordering = ['top_subtitle']

  