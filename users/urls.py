from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.UserCreate.as_view(), name='account-create'),
    path('api/users/', views.UserList.as_view()),
]