from django.urls import path
from .views import RegisterView, order_view, payment_view, list_users

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('orders/', order_view, name='orders'),
    path('payments/', payment_view, name='payments'),
    path('users/', list_users, name='list_users'),  # ✅ new endpoint
]
