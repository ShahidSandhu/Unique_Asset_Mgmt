import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="departments_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="departments_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Department, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Departments"


class Asset(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    serial_number = models.CharField(max_length=100, unique=True, blank=True, null=True)
    barcode = models.CharField(max_length=200, unique=True, blank=True, null=True)
    date_acquired = models.DateField(null=True, blank=True)
    date_disposed = models.DateField(null=True, blank=True)

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="assets_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="assets_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)

    # Link Asset to Department
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, related_name="assets", null=True, blank=True
    )
    
    # New field to link Asset to Employee
    assigned_to = models.ForeignKey(
        'Employee', on_delete=models.SET_NULL, related_name="assigned_assets", null=True, blank=True
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Asset, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Assets"


class Vendor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="vendors_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="vendors_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Vendor, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Vendors"


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="categories_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="categories_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Categories"


class AssetModel(models.Model):  # Renamed to avoid conflict with Django's Model class
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="models_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="models_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(AssetModel, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Models"


class Make(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="makes_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="makes_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Make, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Makes"


class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="employees_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="employees_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)

    # New field to link Employee to Department
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, related_name="employees", null=True, blank=True
    )
    

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Employee, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Employees"


# models.py
from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
