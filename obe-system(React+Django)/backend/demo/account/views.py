from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import User, Teacher
from rest_framework.views import APIView
from account.serializers import (UserSerializer, UserRegistrationSerializer1, UserRegistrationSerializer2, ProfilePictureSerializer, UserLoginSerializer, UserProfileSerializer, UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UserPasswordResetSerializer,TeacherViewSerializer,
                                 UpdateTeacherInfoSerializer, RegisterTeacherSerializer, UpdateUserSerializer)
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated

#Generate token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create your views here.
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        profile_picture = request.data.get('profile_picture')
        if profile_picture:
            serializer = UserRegistrationSerializer2(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                token = get_tokens_for_user(user)
                return Response({'token': token,'msg':'Registration Success'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserRegistrationSerializer1(data=request.data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                token = get_tokens_for_user(user)
                return Response({'token': token,'msg':'Registration Success'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token,'msg':'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or password is not valid.']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)


class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)


class UploadProfilePictureView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        email = request.data.get('email')
        try:
            user = User.objects.filter(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfilePictureSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserView(APIView):
    def get(self, request, id, format=None):
        if id:
            try:
                user = User.objects.get(pk=id)
            except User.DoesNotExist:
                return Response({'error': 'User is not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid information'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class GetTeacherView(APIView):
    def get(self, request, user_id, format=None):
        if user_id:
            try:
                teacher = Teacher.objects.get(user_id=user_id)
            except Teacher.DoesNotExist:
                return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid information'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TeacherViewSerializer(teacher)
        return Response(serializer.data)
    
class GetTeacherByDepartmentView(APIView):
     def get(self, request, department, format=None):
        if department:
            teachers = Teacher.objects.filter(user__department=department)
        else:
            teachers = Teacher.objects.all()
        serializer = TeacherViewSerializer(teachers, many=True)
        return Response(serializer.data)

class UpdateTeacherForCourseFileSubmissionView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        try:
            teacher = Teacher.objects.get(pk=id)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UpdateTeacherInfoSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            teacher.no_of_due_course_file_submission -= 1
            teacher.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateTeacherForCourseAssignment_AddView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        try:
            teacher = Teacher.objects.get(pk=id)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UpdateTeacherInfoSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            teacher.no_of_assigned_course += 1
            teacher.no_of_due_course_file_submission += 1
            teacher.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateTeacherForCourseAssignment_RemoveView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        try:
            teacher = Teacher.objects.get(pk=id)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UpdateTeacherInfoSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            teacher.no_of_assigned_course -= 1
            teacher.no_of_due_course_file_submission -= 1
            teacher.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUnapprovedTeacherListView(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, department, userType, format=None):
        if (department != 'null') and (userType != 'null') :
            Users = User.objects.filter(department=department, userType=userType)
        else:
            return Response({'error': 'Invalid Information'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(Users, many=True)
        return Response(serializer.data)
    
class AddTeacherView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = RegisterTeacherSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg':'Teacher is approved'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AproveUserView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        print(id)
        try:
            user = User.objects.get(pk=id)
        except User.DoesNotExist:
            return Response({'error': 'User is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UpdateUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            user.userType = 1
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RejectUserView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        print(id)
        try:
            user = User.objects.get(pk=id)
        except User.DoesNotExist:
            return Response({'error': 'User is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UpdateUserSerializer(user, data=request.data)
        if serializer.is_valid():
            user.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)