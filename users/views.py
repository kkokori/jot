from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from users.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

"""
def current_user(request):
    
    Determine the current user by their token, and return their data
    

    serializer = UserSerializer(request.user)
    return Response(serializer.data)
"""

class UserCreate(APIView):
    """ 
    Creates the user. 
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
