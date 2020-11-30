# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings

# Create your models here.
class Note(models.Model):
    TAG_CHOICES = (
        ('none', ''),
        ('grocery', 'Grocery'),
        ('important', 'Important'),
        ('passwords', 'Passwords'),
        ('todo', 'To-Do'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             related_name='notes')
    title = models.CharField(max_length=50)
    content = models.TextField()
    tag = models.CharField(max_length=20, choices=TAG_CHOICES, default='none')
    date_created = models.DateTimeField(auto_now_add=True)
    visible = models.BooleanField(default=True)