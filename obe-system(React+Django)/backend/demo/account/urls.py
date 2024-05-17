from django.urls import path, include
from account.views import (UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView,SendPasswordResetEmailView, UserPasswordResetView,GetUserView, GetTeacherView, 
                           UploadProfilePictureView, UpdateTeacherForCourseFileSubmissionView, UpdateTeacherForCourseAssignment_AddView, UpdateTeacherForCourseAssignment_RemoveView,
                           GetUnapprovedTeacherListView, AddTeacherView, AproveUserView, RejectUserView, GetTeacherByDepartmentView)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('profile/', UserProfileView.as_view(),name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(),name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('upload-profile-picture/', UploadProfilePictureView.as_view(), name='upload-profile-picture'),
    path('get-user/<id>/',  GetUserView.as_view(),name='get_user'),
    path('get-teacher/<user_id>/', GetTeacherView.as_view(),name='get_teacher'),
    path('get-teachers-by-dept/<department>/', GetTeacherByDepartmentView.as_view(),name='get_teachers_by_dept'),
    path('update-teacher-for-course-file-submission/', UpdateTeacherForCourseFileSubmissionView.as_view(),name='update_teacher_for_course_file_submission'),
    path('update-teacher-for-course-assignment-add/', UpdateTeacherForCourseAssignment_AddView.as_view(),name='update_teacher_for_course_assignment_add'),
    path('update-teacher-for-course-assignment-remove/', UpdateTeacherForCourseAssignment_RemoveView.as_view(),name='update_teacher_for_course_assignment_remove'),
    path('get-unapproved-teachers/<department>/<userType>/', GetUnapprovedTeacherListView.as_view(),name='get_unapproved_teachers'),
    path('add-teacher/', AddTeacherView.as_view(),name='add_teacher'),
    path('approve-user/', AproveUserView.as_view(),name='approve_user'),
    path('reject-user/', RejectUserView.as_view(),name='reject_user'),
]
