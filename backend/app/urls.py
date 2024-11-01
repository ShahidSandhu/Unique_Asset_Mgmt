from django.contrib.auth.models import User
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserProfileView, ValidateTokenView
from .views import CustomLoginView

from rest_framework.routers import DefaultRouter
from .views import (
    AssetViewSet,
    VendorViewSet,
    CategoryViewSet,
    AssetModelViewSet,
    MakeViewSet,
    DepartmentViewSet,
    EmployeeViewSet,
)

router = DefaultRouter()
router.register(r'assets', AssetViewSet)
router.register(r'vendors', VendorViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'asset-models', AssetModelViewSet)
router.register(r'makes', MakeViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Includes all viewset routes under `/api/`
    path('admin/', admin.site.urls),  # Admin panel
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh
    path('validate-token/', ValidateTokenView.as_view(), name='validate-token'),
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT login
    # path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', CustomLoginView.as_view(), name='custom_login'),
    path('user/', UserProfileView.as_view(), name='user-profile'),  # User profile endpoint
]
