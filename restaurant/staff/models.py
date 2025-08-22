

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class StaffUser(AbstractUser):
    ROLE_CHOICES = (
        ('waiter', 'Waiter'),
        ('cashier', 'Cashier'),
        ('manager', 'Manager'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='waiter')

    def __str__(self):
        return f"{self.username} ({self.role})"
