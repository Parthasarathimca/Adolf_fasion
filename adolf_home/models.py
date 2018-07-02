# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True,blank=True, null=True)#auto_now_add is included-JAN-07Feb2018
    created_by = models.ForeignKey(User,related_name="created_by_%(app_label)s_%(class)s_related",blank=True, null=True)
    modified_date = models.DateTimeField(auto_now=True,blank=True, null=True)#auto_now is included-JAN-07Feb2018
    modified_by = models.ForeignKey(User,related_name="modified_by_%(app_label)s_%(class)s_related",blank=True, null=True)
    is_active = models.BooleanField(default=True)
    class Meta:
        abstract = True

#Attachment models details
class ImageAttachment(BaseModel):
    name = models.CharField(max_length=100,null=True) 
    path = models.CharField(max_length=100,null=True)
    format=models.CharField(max_length=100,null=True)   
    class Meta:
        db_table = 'attachment_info' 
        ordering = ['name'] 

