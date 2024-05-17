from django.contrib import admin
from account.models import User, Teacher
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
class UserModelAdmin(BaseUserAdmin):

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id", "email", "name", "department", "designation", "phoneNumber", "userType", "profile_picture", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        ('User Credentials', {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name","department","designation","phoneNumber","profile_picture"]}),
        ("Role of user(0: Needs authorization, 1: Teacher, 2: Department Admin, 3: Exam Control Office) ", {"fields": ["userType"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "department", "designation","phoneNumber","userType","password1", "password2"],
            },
        ),
    ]
    search_fields = ["email","userType"]
    ordering = ["email","id"]
    filter_horizontal = []

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'user','no_of_assigned_course', 'no_of_due_course_file_submission')
    

admin.site.register(User, UserModelAdmin)
admin.site.register(Teacher, TeacherAdmin)

#admin account:
#subarna@gmail.com
#123456789abcd