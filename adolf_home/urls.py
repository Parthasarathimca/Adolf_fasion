"""Adolf_Fashion URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from .views import *
from .views import Adolf_homeView
import views


urlpatterns = [
    #url(r'^adolf/', include('hcms_dashboard.urls', namespace="dashboard")),
    url(r'^adolf$', Adolf_homeView.as_view(), name='Home Page'), 
    url(r'^adolf/offer_slider/$',views.offer_slider,name=" offer_slider"),
    url(r'^adolf/offer_slider/crud/$',views.offer_slider_crud,name=" offer_slider_crud"),
    url(r'^adolf/offer_slider/data/$',views.offer_slider_data,name=" offer_slider_data"),
    url(r'^adolf/category/data/$',views.category_data,name=" category_data"),
    
    url(r'^brand/product/data/$',views.brand_product_data,name=" Brand_proudct_data"),
] 
