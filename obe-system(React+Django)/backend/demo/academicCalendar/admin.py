from django.contrib import admin
from .models import AcademicCalendar

# Register your models here.
class AcademicCalendarAdmin(admin.ModelAdmin):
    list_display = ('id','time_span', 'pdf_file')
    
admin.site.register(AcademicCalendar, AcademicCalendarAdmin)
    