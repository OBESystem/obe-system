from django.shortcuts import render
from .models import Course, Assignment, Class_test, Final_exam
from .serializers import (CourseSerializer, AssignmentSerializer, UpdateAssignmentSerializer, UpdateAssignmentPDFSerializer, Class_testSerializer, 
                          UpdateClass_testSerializer, UpdateFinal_examSerializer, Final_examSerializer, CourseFileSerializer, 
                          AssignTeacherToCourseSerializer, CourseAllSerializer)
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from course.renderers import CourseRenderer
from rest_framework import status
# Create your views here.

class AddCourseView(APIView):
    def post(self, request, format=None):
        id = request.data.get('c_id')
        if (id != 0):
            try:
                course = Course.objects.get(pk=id)
            except Course.DoesNotExist:
                return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = CourseSerializer(course, data=request.data) 
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = CourseSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status= status.HTTP_201_CREATED)
            return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class GetCourseListView(APIView):
    def get(self, request, teacher_id, format=None):
        if teacher_id:
            Courses = Course.objects.filter(teacher_id=teacher_id) 
        else:
            Courses = Course.objects.all()
        serializer = CourseAllSerializer(Courses, many=True)
        return Response(serializer.data)
    
class GetCourseListByExamView(APIView):
    def get(self, request, exam_year,year, semester,format=None):
        if (exam_year != 'null') and (year != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(exam_year=exam_year, year=year, semester=semester) 
        else:
            Courses = Course.objects.all()
        serializer = CourseAllSerializer(Courses, many=True)
        return Response(serializer.data)
    
class GetCourseListByDepartmentView(APIView):
    def get(self, request, department, format=None):
        if department:
            Courses = Course.objects.filter(department=department) 
        else:
            Courses = Course.objects.all()
        serializer = CourseAllSerializer(Courses, many=True)
        return Response(serializer.data)

class AddAssignmentView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class CreateFinal_examView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        serializer = UpdateFinal_examSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class AddClass_testView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        serializer = Class_testSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class GetAssignmentListView(APIView):
    def get(self, request, course_code, exam_year, format=None):
        if course_code and exam_year:
            Assignments = Assignment.objects.filter(course_code=course_code, exam_year=exam_year)
        elif course_code:
            Assignments = Assignment.objects.filter(course_code=course_code)
        elif exam_year:
            Assignments = Assignment.objects.filter(exam_year=exam_year)
        else:
            Assignments = Assignment.objects.all()
        serializer = AssignmentSerializer(Assignments, many=True)
        return Response(serializer.data)

class GetClass_testListView(APIView):
    def get(self, request, course_code, exam_year, format=None):
        if course_code and exam_year:
            Class_tests = Class_test.objects.filter(course_code=course_code, exam_year=exam_year)
        elif course_code:
            Class_tests = Class_test.objects.filter(course_code=course_code)
        elif exam_year:
            Class_tests = Class_test.objects.filter(exam_year=exam_year)
        else:
            Class_tests = Class_test.objects.all()
        serializer = Class_testSerializer(Class_tests, many=True)
        return Response(serializer.data)

class GetAssignmentView(APIView):
    def get(self, request, id, format=None):
        if id:
            try:
                assignment = Assignment.objects.get(pk=id)
            except Assignment.DoesNotExist:
                return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid ID'}, status=status.HTTP_404_NOT_FOUND)
        serializer = AssignmentSerializer(assignment, many=False)
        return Response(serializer.data)

class GetClass_testView(APIView):
    def get(self, request, id, format=None):
        if id:
            try:
                class_test = Class_test.objects.get(pk=id)
            except Class_test.DoesNotExist:
                return Response({'error': 'Class test not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid ID'}, status=status.HTTP_404_NOT_FOUND)
        serializer = Class_testSerializer(class_test, many=False)
        return Response(serializer.data)

class UpdateAssignmentView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        assignment_id = request.data.get('id')
        try:
            assignment = Assignment.objects.get(pk=assignment_id)
        except Assignment.DoesNotExist:
            return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateAssignmentSerializer(assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateAssignmentPDFView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        assignment_id = request.data.get('id')
        try:
            assignment = Assignment.objects.get(pk=assignment_id)
        except Assignment.DoesNotExist:
            return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateAssignmentPDFSerializer(assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateClass_testView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        class_test_id = request.data.get('id')
        try:
            class_test = Class_test.objects.get(pk=class_test_id)
        except Class_test.DoesNotExist:
            return Response({'error': 'Class test not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateClass_testSerializer(class_test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetFinalExamView(APIView):
    def get(self, request, course_code, exam_year, format=None):
        if course_code and exam_year:
            try:
                final_exam = Final_exam.objects.filter(course_code=course_code, exam_year=exam_year)
            except Final_exam.DoesNotExist:
                return Response({'error': 'Final exam not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid information'}, status=status.HTTP_404_NOT_FOUND)
        serializer = Final_examSerializer(final_exam, many=True)
        return Response(serializer.data)

class UpdateFinal_examView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        try:
            final_exam = Final_exam.objects.get(pk=id)
        except Final_exam.DoesNotExist:
            return Response({'error': 'Class test not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateFinal_examSerializer(final_exam, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class SubmitCourseFileView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        try:
            course = Course.objects.get(pk=id)
        except Course.DoesNotExist:
            return Response({'error': 'Course is not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseFileSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FilterCourseListView(APIView):
    def get(self, request, department, exam_year, year, semester, format=None):
        if (department != 'null') and (exam_year != 'null') and (year != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(department=department, exam_year=exam_year, year=year, semester=semester)
        elif (department != 'null') and (exam_year != 'null') and (year != 'null'):
            Courses = Course.objects.filter(department=department, exam_year=exam_year, year=year)
        elif (department != 'null') and (exam_year != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(department=department, exam_year=exam_year, semester=semester)
        elif (department != 'null') and (year != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(department=department, year=year, semester=semester)
        elif (exam_year != 'null') and (year != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(exam_year=exam_year, year=year, semester=semester)
        elif (department != 'null') and (exam_year != 'null'):
            Courses = Course.objects.filter(department=department, exam_year=exam_year)
        elif (department != 'null') and (year != 'null'):
            Courses = Course.objects.filter(department=department, year=year)
        elif (department != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(department=department, semester=semester)
        elif (exam_year != 'null') and (year != 'null'):
            Courses = Course.objects.filter(exam_year=exam_year, year=year)
        elif (exam_year != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(exam_year=exam_year, semester=semester)
        elif (year != 'null') and (semester != 'null'):
            Courses = Course.objects.filter(year=year, semester=semester)
        elif (department != 'null'):
            Courses = Course.objects.filter(department=department)
        elif (exam_year != 'null'):
            Courses = Course.objects.filter(exam_year=exam_year)
        elif (year != 'null'):
            Courses = Course.objects.filter(year=year)
        elif (semester != 'null'):
            Courses = Course.objects.filter(semester=semester)
        else:
            Courses = Course.objects.all()
        serializer = CourseSerializer(Courses, many=True)
        return Response(serializer.data)
    
class AssignTeacherToCourseView(APIView):
    renderer_classes = [CourseRenderer]
    def post(self, request, format=None):
        id = request.data.get('id')
        try:
            course = Course.objects.get(pk=id)
        except Course.DoesNotExist:
            return Response({'error': 'Course is not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AssignTeacherToCourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

