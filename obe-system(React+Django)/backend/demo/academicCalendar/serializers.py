from rest_framework import serializers
from .models import AcademicCalendar

class AcademicCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicCalendar
        fields = '__all__'