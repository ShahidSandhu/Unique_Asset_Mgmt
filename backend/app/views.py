
from rest_framework import viewsets
from .models import Asset, Vendor, Category, AssetModel, Make, Department, Employee
from .serializers import (
    AssetSerializer,
    VendorSerializer,
    CategorySerializer,
    AssetModelSerializer,
    MakeSerializer,
    DepartmentSerializer,
    EmployeeSerializer,
)

# views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
# from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny  # Ensures public access to this endpoint
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

import logging
logger = logging.getLogger('myapp')  # Matches the 'myapp' logger in settings


class ValidateTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # If the user is authenticated, the token is valid
        return Response({"detail": "Token is valid"}, status=200)
    
class CustomLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Extract username, email, and password from request body
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Check for missing fields
        if not password or not (email or username):
            return Response({"error": "Username/email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to retrieve user based on username or email
        if email:
            try:
                user = User.objects.get(email=email)
                username = user.username
            except User.DoesNotExist:
                return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user using username and password
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate JWT tokens for authenticated user
        refresh = RefreshToken.for_user(user)
        
        # Retrieve user roles (group names) properly
        roles = [group.name for group in user.groups.all()]
        
        # Return tokens and user details
        return Response({
            # "refresh": str(refresh),    ### Critical for application security, So we don't exposed it here
            "token": str(refresh.access_token),
            "user": {
                "id": user.id,
                "name": f"{user.first_name} {user.last_name}",
                "roles": roles,  # Pass the retrieved group names
                "email": user.email,
            }
        }, status=status.HTTP_200_OK)

      
# class CustomTokenObtainPairView(TokenObtainPairView):

    # def post(self, request, *args, **kwargs):
        # response = super().post(request, *args, **kwargs)
        # if response.status_code == 200:
            # user = User.objects.get(email=request.data['email'])
            # response.data['user'] = {
                # 'id': user.id,
                # 'name': f"{user.first_name} {user.last_name}",
                # 'roles': [group.name for group in user.groups.all()],
            # }
        # return response


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"token":request.user.access, "user": serializer.data})


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AssetModelViewSet(viewsets.ModelViewSet):
    queryset = AssetModel.objects.all()
    serializer_class = AssetModelSerializer


class MakeViewSet(viewsets.ModelViewSet):
    queryset = Make.objects.all()
    serializer_class = MakeSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
