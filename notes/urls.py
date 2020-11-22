from django.urls import path
from . import views

urlpatterns = [
    path('api/note/', views.NoteListCreate.as_view() ),
]