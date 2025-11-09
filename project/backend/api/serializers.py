from rest_framework import serializers
from .models import Cart, Order, Product, Category
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser
from django.contrib.auth.hashers import make_password

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'phone_number', 'address', 'first_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)

       
        user = CustomUser.objects.create(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
       
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.password = make_password(password)

        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'category_image','description']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'created_at', 'category_name', 'description', 'details']

class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')  
    product_image = serializers.ImageField(source='product.image', read_only=True)
    product_price = serializers.ReadOnlyField(source='product.price') 
    class Meta:
        model = Cart
        fields = ['id', 'product', 'product_name', 'quantity', 'product_image', 'product_price'] 

class OrderSerializer(serializers.ModelSerializer):
    cart_items = serializers.SerializerMethodField() 

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'cart_items']  

    def get_cart_items(self, obj):
        cart_items = Cart.objects.filter(order=obj)
        return CartSerializer(cart_items, many=True).data