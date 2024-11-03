import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Asset(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)  # Updated max_length
    description = models.TextField()  # Updated to remove blank=True, null=True
    value = models.DecimalField(max_digits=10, decimal_places=2)  # Asset value with currency precision
    serial_number = models.CharField(max_length=100, unique=True, blank=True, null=True)  # Optional serial number
    barcode = models.CharField(max_length=200, unique=True, blank=True, null=True)  # Optional barcode field
    date_acquired = models.DateField(null=True, blank=True)  # Acquisition date
    date_disposed = models.DateField(null=True, blank=True)  # Disposal date, optional

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="assets_created", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="assets_updated", null=True
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.PositiveIntegerField(default=0)  # Tracks number of updates

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Check if this is an update by verifying if the object has a primary key
        if self.pk is not None:
            # Increment the update_count only if it's an update
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
    update_count = models.PositiveIntegerField(default=0)  # Tracks number of updates

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Check if this is an update by verifying if the object has a primary key
        if self.pk is not None:
            # Increment the update_count only if it's an update
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
    update_count = models.PositiveIntegerField(default=0)  # Tracks number of updates

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Check if this is an update by verifying if the object has a primary key
        if self.pk is not None:
            # Increment the update_count only if it's an update
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
    update_count = models.PositiveIntegerField(default=0)  # Tracks number of updates

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Check if this is an update by verifying if the object has a primary key
        if self.pk is not None:
            # Increment the update_count only if it's an update
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
    update_count = models.PositiveIntegerField(default=0)  # Tracks number of updates

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Check if this is an update by verifying if the object has a primary key
        if self.pk is not None:
            # Increment the update_count only if it's an update
            self.update_count += 1
        super(Make, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Makes"


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
    update_count = models.PositiveIntegerField(default=0)  # Tracks number of updates

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Increment update_count only if this is an update
        if self.pk is not None:
            self.update_count += 1
        super(Department, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Departments"


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
    update_count = models.PositiveIntegerField(default=0)  # Tracks number of updates

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Increment update_count only if this is an update
        if self.pk is not None:
            self.update_count += 1
        super(Employee, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Employees"
