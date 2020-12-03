# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    TAG_CHOICES = (
        ('', 'Untagged'),
        ('Grocery', 'Grocery'),
        ('Important', 'Important'),
        ('Passwords', 'Passwords'),
        ('To-Do', 'To-Do'),
    )
    
    #user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=50)
    content = models.TextField(blank=True)
    tag = models.CharField(max_length=20, choices=TAG_CHOICES, default='')
    date_created = models.DateTimeField(auto_now_add=True)
    selected = models.BooleanField(default=False)
    visible = models.BooleanField(default=True)
