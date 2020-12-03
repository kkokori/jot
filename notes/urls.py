from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/notes/', views.NoteViewSet.as_view({'get': 'list'}), name='notes'),
    path('api/new-note/', views.NoteViewSet.as_view({'post': 'create'}), name='notes'),
    url(r'^api/delete-note/(?P<pk>\d+)/$', views.NoteViewSet.as_view({'delete': 'destroy'}), name='notes'),
    url(r'^api/update-note/(?P<pk>\d+)/$', views.NoteViewSet.as_view({'patch': 'partial_update'}), name='notes'),
]
