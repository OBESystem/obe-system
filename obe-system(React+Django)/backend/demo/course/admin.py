from django.contrib import admin
from .models import Course, Assignment, Class_test, Final_exam

class AssigmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'agn_id', 'course_code', 'exam_year', 'title', 'compliance_form')
    list_filter = ('course_code', 'exam_year')

class Class_testAdmin(admin.ModelAdmin):
    list_display = ('id', 'ct_id', 'course_code', 'exam_year', 'question', 'compliance_form', 'best_answersheet', 'average_answersheet', 'worst_answersheet')
    list_filter = ('course_code', 'exam_year')

class Final_examAdmin(admin.ModelAdmin):
    list_display = ('id','course_code', 'exam_year', 'question', 'compliance_form', 'best_answersheet', 'average_answersheet', 'worst_answersheet')
    list_filter = ('course_code', 'exam_year')
    
admin.site.register(Course)
admin.site.register(Assignment, AssigmentAdmin)
admin.site.register(Class_test, Class_testAdmin)
admin.site.register(Final_exam, Final_examAdmin)