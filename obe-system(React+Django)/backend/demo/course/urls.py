from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from course.views import AddCourseView, GetCourseListView, AddAssignmentView, GetAssignmentListView,UpdateAssignmentView,UpdateAssignmentPDFView,GetAssignmentView,AddClass_testView,GetClass_testListView,GetClass_testView, UpdateClass_testView,CreateFinal_examView, GetFinalExamView, UpdateFinal_examView, SubmitCourseFileView

urlpatterns = [
    path('add-course/', AddCourseView.as_view(),name='add_courses'),
    path('get-courses/<teacher_id>/', GetCourseListView.as_view(),name='get_courses'),
    path('add-assignment/', AddAssignmentView.as_view(),name='add_assignment'),
    path('get-assignments/<course_code>/<exam_year>/', GetAssignmentListView.as_view(),name='get_assignments'),
    path('update-assignment/', UpdateAssignmentView.as_view(),name='update_assignment'),
    path('update-assignment-pdf/', UpdateAssignmentPDFView.as_view(),name='update_assignment_pdf'),
    path('get-assignment/<id>/', GetAssignmentView.as_view(),name='get_assignment'),
    path('add-class-test/', AddClass_testView.as_view(),name='add_class_test'),
    path('get-class-tests/<course_code>/<exam_year>/', GetClass_testListView.as_view(),name='get_class_tests'),
    path('get-class-test/<id>/', GetClass_testView.as_view(),name='get_class_test'),
    path('update-class-test/', UpdateClass_testView.as_view(),name='update_class_test'),
    path('create-final-exam/', CreateFinal_examView.as_view(),name='create_final_exam'),
    path('get-final-exam/<course_code>/<exam_year>/', GetFinalExamView.as_view(),name='get_final_exam'),
    path('update-final-exam/', UpdateFinal_examView.as_view(),name='update_final_exam'),
    path('submit-course-file/', SubmitCourseFileView.as_view(),name='submit_course_file'),
]

