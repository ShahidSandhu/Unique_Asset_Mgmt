# cSpell: disable
# pylint: disable=missing-docstring,unused-import, unused-variable, invalid-name,too-few-public-methods
# pylint: disable=missing-docstring,unused-import,too-many-arguments

from rest_framework import serializers
from .models import User, Asset, Vendor, Category, AssetModel, Make, Department, Employee
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'  # or specify the fields you need
        # fields = ['id', 'username', 'first_name', 'last_name', 'email']  # Add other fields as needed


class AssetSerializer(serializers.ModelSerializer):
    serialNumber = serializers.CharField(source='serial_number')  # String field for serial numbers
    dateAcquired = serializers.DateField(source='date_acquired')  # Date field for acquisition dates
    dateDisposed = serializers.DateField(source='date_disposed', allow_null=True)  # Date field, nullable
    createdBy = serializers.CharField(source='created_by')  # String field for creator username or ID
    updatedBy = serializers.CharField(source='updated_by')  # String field for updater username or ID
    createdAt = serializers.DateTimeField(source='created_at')  # DateTime field for creation timestamp
    updatedAt = serializers.DateTimeField(source='updated_at')  # DateTime field for last update timestamp
    updateCount = serializers.IntegerField(source='update_count')  # Integer field for tracking updates
    assignedTo = serializers.CharField(source='assigned_to', allow_null=True)  # String field, nullable for assignments
    warrantyExpiration = serializers.DateField(source='warranty_expiration', allow_null=True)  # Date field, nullable

    class Meta:
        model = Asset
        fields = '__all__'  # You can also specify fields explicitly


class VendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendor
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class AssetModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetModel
        fields = '__all__'


class MakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Make
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Or use a custom serializer for User if needed

    class Meta:
        model = Employee
        fields = '__all__'
