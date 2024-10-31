from django.urls import path, include
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
    path('', include(router.urls)),
]
