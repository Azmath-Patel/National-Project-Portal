from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Cart, Category, CustomUser, Order, Product
from rest_framework.generics import UpdateAPIView
from .serializers import CartSerializer, CategorySerializer, OrderSerializer, ProductSerializer, CustomUserSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListCreateAPIView
from django_filters.rest_framework import DjangoFilterBackend


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  
            return Response({
                'message': 'User created successfully',
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
       
        user = request.user  
        serializer = CustomUserSerializer(user) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        print("data", request.data)
        user = self.get_object()
        data = request.data

        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'phone_number' in data:
            user.phone_number = data['phone_number']
        if 'address' in data:
            user.address = data['address']
        if 'first_name' in data:
            user.first_name = data['first_name']
       
        user.save()

        return Response({
            'message': 'Profile updated successfully',
            'user': {
                'username': user.username,
                'email': user.email,
                'phone_number': user.phone_number,
                'address': user.address,
                'first_name': user.first_name,
            }
        }, status=status.HTTP_200_OK)
    
class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filter_fields = ['name', 'category__name']
    search_fields = ['name', 'category__name']
    ordering_fields = ['name', 'created_at']

class CategoryListView(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
       
        cart_items = Cart.objects.filter(user=request.user, order__isnull=True)
        serializer = CartSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
       
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product does not exist."}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            product=product,
            order__isnull=True,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return Response({"message": "Product added to cart."}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        """Remove a product from the cart."""
        product_id = request.data.get('product_id')

        try:
            cart_item = Cart.objects.get(user=request.user, product_id=product_id, order__isnull=True)
            cart_item.delete()
            return Response({"message": "Product removed from cart."}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        
        cart_items = Cart.objects.filter(user=request.user, order__isnull=True)

        if not cart_items.exists():
            return Response({"error": "No items in the cart to checkout."}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=request.user)
        order.add_cart_items(cart_items)

        serializer = OrderSerializer(order)
        return Response({"message": "Checkout successful.", "order": serializer.data}, status=status.HTTP_201_CREATED)

class OrderedItemsView(APIView):
    """
    View to retrieve ordered items.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        orders = Order.objects.filter(user=request.user)
        if not orders.exists():
            return Response({"message": "No orders found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)