from django.db import models
from django.core.validators import RegexValidator


class AcademicCalendar(models.Model):
    time_span_validator = RegexValidator(
        regex=r'^\d{4}-\d{4}$',
        message="Time span must be in the format 'XXXX-XXXX' (Starting year - Ending year)."
    )
    
    time_span = models.CharField(max_length=150, null=False, blank=False, validators=[time_span_validator],unique=True,)
    pdf_file = models.FileField(upload_to='academicCalendars/', null=False, blank=False)

    def __str__(self):
        return self.time_span