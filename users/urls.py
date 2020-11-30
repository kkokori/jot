from django.urls import path
from . import views
from rest_framework.authtoken import views as authviews

urlpatterns = [
    path('api/register/', views.UserCreate.as_view(), name='account-create'),
    path('api/users/', views.UserList.as_view()),
    path('api/token-auth/', authviews.obtain_auth_token)
]
