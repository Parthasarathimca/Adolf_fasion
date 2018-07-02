# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-27 11:22
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Product_Details', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('adolf_home', '0001_initial'),
        ('brand_details', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by_product_details_productcategory_related', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='productcategory',
            name='modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modified_by_product_details_productcategory_related', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='product',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by_product_details_product_related', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='product',
            name='modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modified_by_product_details_product_related', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='product',
            name='product_brand',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_brand_id', to='brand_details.BrandDetails'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_category_id', to='Product_Details.ProductCategory'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_image_id', to='adolf_home.ImageAttachment'),
        ),
        migrations.AddField(
            model_name='offerdetails',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by_product_details_offerdetails_related', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='offerdetails',
            name='modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modified_by_product_details_offerdetails_related', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='offerdetails',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_id', to='Product_Details.Product'),
        ),
        migrations.AddField(
            model_name='offerdetails',
            name='slider_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='slider_image_id', to='adolf_home.ImageAttachment'),
        ),
    ]