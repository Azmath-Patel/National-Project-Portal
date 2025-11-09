from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartView, CategoryListView, CheckoutView, LogoutView, OrderedItemsView, ProductViewSet, SignupView, UpdateProfileView, UserProfileView
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', obtain_auth_token, name='login'),
    path('update-profile/', UpdateProfileView.as_view(), name='update_profile'),
    path('user/profile/', UserProfileView.as_view(), name='user_profile'),
    path('cart/', CartView.as_view(), name='cart-view'),
    path('check-out/', CheckoutView.as_view(), name='check-out'),
    path('orders/', OrderedItemsView.as_view(), name='orders'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
