# -*- coding: utf-8 -*-
# from __future__ import unicode_literals

from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework import generics

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer