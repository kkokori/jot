from django.urls import path
from . import views

urlpatterns = [
    path('api/notes/', views.NoteViewSet.as_view({'get': 'list'}), name='notes'),
]