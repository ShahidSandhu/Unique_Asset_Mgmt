
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
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny  # Ensures public access to this endpoint
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenBackendError, TokenError
from django.utils.translation import gettext_lazy as _
from django.http import JsonResponse


import logging

logger = logging.getLogger(__name__)


class TestView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({"message": "Server is working!"}, status=status.HTTP_200_OK)



class TokenVerifyView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.info("Received request for token verification")

        # Get the access token from the request body
        access_token = request.data.get('access')

        # Validate that the access token is provided
        if not access_token:
            logger.error("Access token not provided.")
            return Response({"detail": _("Access token not provided.")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            logger.info("Verifying access token")
            # Validate the access token
            AccessToken(access_token)  # This will raise an error if invalid
            logger.info("Access token is valid.")
            return Response({"detail": _("Token is valid.")}, status=status.HTTP_200_OK)

        except InvalidToken as e:
            logger.error(f"Access token invalid or expired: {str(e)}")
            return Response({"detail": _("Access token is invalid or expired.")}, status=status.HTTP_401_UNAUTHORIZED)

        except TokenBackendError as e:
            logger.error(f"Token signature verification failed: {str(e)}")
            return Response({"detail": _("Token signature verification failed.")}, status=status.HTTP_401_UNAUTHORIZED)

        except TokenError as e:
            logger.error(f"Token error: {str(e)}")
            return Response({"detail": _("Token error occurred.")}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            logger.error(f"Unexpected error during access token verification: {str(e)}")
            return Response({"detail": _("Internal server error occurred while verifying the token.")},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenRefreshView(APIView):
    """
    Custom view for refreshing JWT tokens using the provided refresh token.
    """
    permission_classes = [AllowAny]  # Allow any user, no authentication needed
    def post(self, request, *args, **kwargs):
        # Extract refresh token from request data
        refresh_token = request.data.get("refresh", None)
        
        if not refresh_token:
            return JsonResponse({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Create a refresh token object from the provided refresh token string
            token = RefreshToken(refresh_token)
            
            # Generate the new access token
            new_access_token = str(token.access_token)
            
            return JsonResponse({"access": new_access_token}, status=status.HTTP_200_OK)
        
        except TokenError as e:
            # Handle invalid token error
            raise InvalidToken(e.args[0])


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Extract username, email, and password from request body
        identifier = request.data.get('identifier')  # Use a generic name for username/email
        password = request.data.get('password')
        
        # print(f"Received identifier: {identifier}, password: {password}")

        # Check for missing fields
        if not identifier:
            return Response({"error": "Identifier (username or email) is required."},
                            status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({"error": "Password is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Attempt to retrieve the user based on username or email
        user = None

        if '@' in identifier:  # Check if it's an email
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                return Response({"error": "User with this email does not exist."},
                                status=status.HTTP_400_BAD_REQUEST)
        else:  # Assume it's a username
            try:
                user = User.objects.get(username=identifier)
            except User.DoesNotExist:
                return Response({"error": "User with this username does not exist."},
                                status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user using the retrieved user object and password
        user = authenticate(username=user.username, password=password)
        if user is None:
            return Response({"error": "Incorrect password."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Generate JWT tokens for authenticated user
        refresh = RefreshToken.for_user(user)

        # Retrieve user roles (group names)
        roles = [group.name for group in user.groups.all()]

        # Return tokens and user details
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "name": f"{user.first_name} {user.last_name}",
                "roles": roles,
            }
        }, status=status.HTTP_200_OK)



class ValidateTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # If the user is authenticated, the token is valid
        return Response({"detail": "Token is valid"}, status=200)
    
   
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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Optional: Add authentication and permissions

    def get_queryset(self):
        return User.objects.all()
    
    @action(detail=True, methods=['post'])
    def reset_password(self, request, pk=None):
        user = self.get_object()
        # Implement password reset logic here
        return Response({'status': 'password reset'})


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
