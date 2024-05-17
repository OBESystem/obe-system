from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
import re
# Custom user model
class UserManager(BaseUserManager):
    def create_user(self, email, name, department, designation, phoneNumber, profile_picture='profilePictures/default.png' ,password=None, password2=None):

        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            department=department,
            designation=designation,
            phoneNumber=phoneNumber,
            profile_picture=profile_picture,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, department, designation, phoneNumber, password=None, password2=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,
            department=department,
            designation=designation,
            phoneNumber=phoneNumber,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    phone_number_validator = RegexValidator(
        regex=r'^\+880\d{10}$',
        message="Phone number must start with '+880' and be followed by 10 digits."
    )
    
    DEPARTMENT_CHOICES = [
        ('Computer Science and Engineering', 'Computer Science and Engineering'),
        ('Physics', 'Physics'),
        ('Chemistry', 'Chemistry'),
        ('Statistics', 'Statistics'),
        ('Mathematics', 'Mathematics'),
        ('English', 'English'),
        ('Exam Control Office', 'Exam Control Office'),
    ]
    
    DESIGNATION_CHOICES = [
        ('Employee', 'Employee'),
        ('Lecturer', 'Lecturer'),
        ('Assistant Professor', 'Assistant Professor'),
        ('Associate Professor', 'Associate Professor'),
        ('Professor', 'Professor'),
    ]

    name = models.CharField(max_length=200)
    department = models.CharField(max_length=200, choices=DEPARTMENT_CHOICES,)
    designation = models.CharField(max_length=200, choices=DESIGNATION_CHOICES,)
    phoneNumber = models.CharField(max_length=200, validators=[phone_number_validator],)
    userType = models.CharField(max_length=20, default='0')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    profile_picture = models.ImageField(upload_to='profilePictures/',default='profilePictures/default.png')

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['name','department', 'designation', 'phoneNumber','profile_picture']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    no_of_assigned_course = models.IntegerField(default=0)
    no_of_due_course_file_submission = models.IntegerField(default=0)

        

    