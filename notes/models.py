# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
#    tags = models.CharField(max_length=None)
    date_created = models.DateTimeField(auto_now_add=True)
