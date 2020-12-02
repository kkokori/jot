from django.urls import path
from . import views

urlpatterns = [
    path('api/notes/', views.NoteViewSet.as_view({'get': 'list'}), name='notes'),
    path('api/new-note/', views.NoteViewSet.as_view({'post': 'create'}), name='notes'),
]
