from django.contrib import admin
from api.models import *
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(Product)
admin.site.register(Order)
