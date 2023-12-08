from rest_framework import serializers
from .models import Course, Assignment, Class_test, Final_exam

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        
class CourseFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'is_course_file_submitted']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class Class_testSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class_test
        fields = '__all__'

class Final_examSerializer(serializers.ModelSerializer):
    class Meta:
        model = Final_exam
        fields = '__all__'
        
class UpdateAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'title']

class UpdateAssignmentPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'compliance_form']

class UpdateClass_testSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class_test
        fields = ['id', 'question','compliance_form','best_answersheet', 'average_answersheet', 'worst_answersheet']
        extra_kwargs = {
            'question': {'required': False},
            'compliance_form': {'required': False},
            'best_answersheet': {'required': False},
            'average_answersheet': {'required': False},
            'worst_answersheet': {'required': False},
        }

class UpdateFinal_examSerializer(serializers.ModelSerializer):
    class Meta:
        model = Final_exam
        fields = ['id','course_code','exam_year','question','compliance_form','best_answersheet', 'average_answersheet', 'worst_answersheet']
        extra_kwargs = {
            'course_code': {'required': False},
            'exam_year': {'required': False},
            'question': {'required': False},
            'compliance_form': {'required': False},
            'best_answersheet': {'required': False},
            'average_answersheet': {'required': False},
            'worst_answersheet': {'required': False},
        }