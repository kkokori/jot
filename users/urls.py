from django.urls import path
from . import views
from rest_framework.authtoken import views as authviews
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('api/change-password/', views.UpdatePassword.as_view()),
    path('api/register/', views.UserCreate.as_view(), name='account-create'),
    path('api/users/', views.UserList.as_view()),
    path('api/token-auth/', views.CustomAuthToken.as_view())
]
 
