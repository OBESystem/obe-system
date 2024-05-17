from rest_framework import serializers
from account.models import User, Teacher
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class UserRegistrationSerializer1(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'name', 'department', 'designation', 'phoneNumber', 'password', 'password2']
        extra_kwargs ={
            'password': {'write_only': True}
        }

    # Validating password and confirm password during registration
    def validate(self, data):
      password = data.get('password')
      password2 = data.get('password2')
      
      if len(password) < 8:
          raise serializers.ValidationError("Password must be at least 8 characters long")

      has_alphabet = re.search(r'[a-zA-Z]', password)
      has_number = re.search(r'\d', password)
      has_special = re.search(r'[!@#$%^&*(),.?":{}|<>]', password)

      if not (has_alphabet and has_number and has_special):
          raise serializers.ValidationError("Password must contain at least one alphabet, one number, and one special character")

      if password != password2:
          raise serializers.ValidationError("Password and Confirmed password don't match")
      return data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
      
class UserRegistrationSerializer2(serializers.ModelSerializer):
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  
  class Meta:
      model = User
      fields = ['email', 'name', 'department', 'designation', 'phoneNumber', 'password', 'password2','profile_picture']
      extra_kwargs ={
          'password': {'write_only': True}
      }
      
  # Validating password and confirm password during registration
  def validate(self, data):
    password = data.get('password')
    password2 = data.get('password2')
    
    if len(password) < 8:
        raise serializers.ValidationError("Password must be at least 8 characters long")

    has_alphabet = re.search(r'[a-zA-Z]', password)
    has_number = re.search(r'\d', password)
    has_special = re.search(r'[!@#$%^&*(),.?":{}|<>]', password)

    if not (has_alphabet and has_number and has_special):
        raise serializers.ValidationError("Password must contain at least one alphabet, one number, and one special character")

    if password != password2:
        raise serializers.ValidationError("Password and Confirmed password don't match")
    return data

  def create(self, validated_data):
      return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
      model = User
      fields = ['email',  'password']
      
class ProfilePictureSerializer(serializers.ModelSerializer):
  class Meta:
      model = User
      fields = ['id', 'profile_picture']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name', 'department', 'designation', 'userType', 'profile_picture']


class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    
    if len(password) < 8:
      raise serializers.ValidationError("Password must be at least 8 characters long")
    
    has_alphabet = re.search(r'[a-zA-Z]', password)
    has_number = re.search(r'\d', password)
    has_special = re.search(r'[!@#$%^&*(),.?":{}|<>]', password)
    if not (has_alphabet and has_number and has_special):
      raise serializers.ValidationError("Password must contain at least one alphabet, one number, and one special character")
    
    if password != password2:
      raise serializers.ValidationError("Password and Confirmed password doesn't match")
    user.set_password(password)
    user.save()
    return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token)
      link = 'http://localhost:3000/api/user/reset-password/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = 'Click Following Link to Reset Your Password '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')

class UpdateUserSerializer(serializers.ModelSerializer):
  class Meta:
        model = User
        fields = ['id']
        
class TeacherViewSerializer(serializers.ModelSerializer):
  class Meta:
      model = Teacher
      fields = '__all__'
      
class RegisterTeacherSerializer(serializers.ModelSerializer):
  class Meta:
      model = Teacher
      fields = ['user']

class UpdateTeacherInfoSerializer(serializers.ModelSerializer):
  class Meta:
      model = Teacher
      fields = ['id']
