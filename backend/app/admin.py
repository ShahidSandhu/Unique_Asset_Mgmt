# app/admin.py
from django.contrib import admin
from .models import Asset, Vendor, Category, AssetModel, Make, Department, Employee


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'serial_number', 'value', 'date_acquired', 'created_at', 'updated_at')
    search_fields = ('name', 'serial_number', 'barcode')
    list_filter = ('date_acquired', 'created_by')
    readonly_fields = ('update_count',)  # Display-only field for tracking updates


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('update_count',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('update_count',)


@admin.register(AssetModel)
class AssetModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('update_count',)


@admin.register(Make)
class MakeAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('update_count',)


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('update_count',)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at', 'updated_at')
    search_fields = ('name', 'user__username')
    readonly_fields = ('update_count',)
