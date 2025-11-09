from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255,default="None")
    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        swappable = 'AUTH_USER_MODEL'

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

class Category(models.Model):
    name = models.CharField(max_length=100)
    category_image = models.ImageField(upload_to='category_images/')
    description = models.TextField(default="None")  


    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    description = models.TextField()  
    details = models.JSONField() 

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def add_cart_items(self, cart_items):
        for cart_item in cart_items:
            Cart.objects.create(
                order=self,
                product=cart_item.product,
                quantity=cart_item.quantity,
                user=cart_item.user  
            )


class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='carts')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='cart_items', null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"
