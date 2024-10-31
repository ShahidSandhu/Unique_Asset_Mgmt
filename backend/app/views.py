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
