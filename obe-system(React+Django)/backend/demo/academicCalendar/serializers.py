from rest_framework import serializers
from .models import AcademicCalendar

class AcademicCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicCalendar
        fields = '__all__'
        
        
class AcademicCalendarPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicCalendar
        fields = ['pdf_file']
        
