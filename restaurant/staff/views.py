from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

User = get_user_model()

# Registration API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# Example protected Order API
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_view(request):
    return Response({"message": f"Hello {request.user.username}, here are your orders"})

# Example protected Payment API
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def payment_view(request):
    return Response({"message": f"Hello {request.user.username}, payments processed"})

# ✅ List all users (Admin only)
@api_view(['GET'])
@permission_classes([IsAdminUser])   # only admin can access
def list_users(request):
    users = User.objects.all().values("id", "username", "email", "date_joined", "is_staff")
    return Response(list(users))
