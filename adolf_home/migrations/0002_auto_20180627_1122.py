# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-27 11:22
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('adolf_home', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='imageattachment',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by_adolf_home_imageattachment_related', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='imageattachment',
            name='modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modified_by_adolf_home_imageattachment_related', to=settings.AUTH_USER_MODEL),
        ),
    ]
