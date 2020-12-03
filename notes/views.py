# -*- coding: utf-8 -*-
# from __future__ import unicode_literals

from django.shortcuts import render
from .models import Note
from rest_framework.views import APIView
from .serializers import NoteSerializer
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)