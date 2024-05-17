from django.db import models

# Create your models here.
class Course(models.Model):
    department=models.CharField(max_length=50,blank=False)
    course_name=models.CharField(max_length=50,blank=False)
    teacher_id=models.IntegerField(blank=False)
    course_code=models.CharField(max_length=50,blank=False)
    course_type=models.CharField(max_length=50,blank=False)
    year=models.CharField(max_length=50,blank=False)
    semester=models.CharField(max_length=50,blank=False)
    exam_year=models.CharField(max_length=50,blank=False)
    credit=models.IntegerField(blank=False)
    is_course_file_submitted=models.BooleanField(default=False)
    #number_of_assignment=models.IntegerField(default=0)
    #number_of_ct=models.IntegerField(default=0)

    def __str__(self):
        return self.course_name

class Assignment(models.Model):
    agn_id = models.IntegerField(blank=False)
    course_code = models.CharField(max_length=50,blank=False)
    exam_year=models.CharField(max_length=50,blank=False)
    title = models.CharField(max_length=50,blank=True)
    compliance_form = models.FileField(upload_to='assignments/compliance_forms/', null=True)

    def __str__(self):
        return self.title

class Class_test(models.Model):
    ct_id = models.IntegerField(blank=False)
    course_code = models.CharField(max_length=50,blank=False)
    exam_year=models.CharField(max_length=50,blank=False)
    question = models.FileField(upload_to='cts/questions/', null=True)
    compliance_form = models.FileField(upload_to='cts/compliance_forms/', null=True)
    best_answersheet = models.FileField(upload_to='cts/best_answersheets/', null=True)
    average_answersheet = models.FileField(upload_to='cts/average_answersheets/', null=True)
    worst_answersheet = models.FileField(upload_to='cts/worst_answersheets/', null=True)

    def __str__(self):
        return self.course_code+", "+self.exam_year

class Final_exam(models.Model):
    course_code = models.CharField(max_length=50,blank=False)
    exam_year = models.CharField(max_length=50,blank=False)
    question = models.FileField(upload_to='final_exams/questions/', null=True)
    compliance_form = models.FileField(upload_to='final_exams/compliance_forms/', null=True)
    best_answersheet = models.FileField(upload_to='final_exams/best_answersheets/', null=True)
    average_answersheet = models.FileField(upload_to='final_exams/average_answersheets/', null=True)
    worst_answersheet = models.FileField(upload_to='final_exams/worst_answersheets/', null=True)

    def __str__(self):
        return self.course_code+", "+self.exam_year


