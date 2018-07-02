# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from adolf_home.models import BaseModel

#Product Brand  models
class BrandDetails(BaseModel):
    brand_name = models.CharField(max_length=50,null=True, blank=True)
    brand_description=models.CharField(max_length=100,null=True,blank=True)
    class Meta: 
        db_table = 'brand_details'
        ordering = ['brand_name']



 