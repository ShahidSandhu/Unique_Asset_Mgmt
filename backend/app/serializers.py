from rest_framework import serializers
from .models import Asset, Vendor, Category, AssetModel, Make, Department, Employee


class AssetSerializer(serializers.ModelSerializer):

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
