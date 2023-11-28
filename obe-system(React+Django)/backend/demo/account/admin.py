from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
class UserModelAdmin(BaseUserAdmin):

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id", "email", "name", "department", "designation", "phoneNumber", "userType", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        ('User Credentials', {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name","department","designation","phoneNumber"]}),
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

admin.site.register(User, UserModelAdmin)

#admin account:
#subarna@gmail.com
#123456789abcd