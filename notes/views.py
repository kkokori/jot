# -*- coding: utf-8 -*-
# from __future__ import unicode_literals

from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework import generics, viewsets

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return self.request.user.notes.all()