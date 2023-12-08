from django.db import models

# Create your models here.

class AcademicCalendar(models.Model):
    exam_year = models.CharField(max_length=150, null=False, blank=False)
    pdf_file = models.FileField(upload_to='uploads/pdfs/', null=False, blank=False)


    def __str__(self):
        return self.exam_year