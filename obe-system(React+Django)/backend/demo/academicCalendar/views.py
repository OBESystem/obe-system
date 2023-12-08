from django.shortcuts import render
from .models import AcademicCalendar
from .serializers import AcademicCalendarSerializer
from rest_framework import viewsets


# Create your views here.

class AcademicCalendarView(viewsets.ModelViewSet):
    queryset = AcademicCalendar.objects.all()
    serializer_class = AcademicCalendarSerializer