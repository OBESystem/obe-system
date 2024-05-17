from django.shortcuts import render
from .models import AcademicCalendar
from .serializers import AcademicCalendarSerializer, AcademicCalendarPDFSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class GetAcademicCalendarView(APIView):
    def get(self, request, format=None):
        academic_calendars = AcademicCalendar.objects.all().order_by('-time_span')
        serializer = AcademicCalendarSerializer(academic_calendars, many=True)
        return Response(serializer.data)
        
class AddAcademicCalendarView(APIView):
    def post(self, request, format=None):
        time_span = request.data.get('time_span')
        pdf_file = request.data.get('pdf_file')
        
        academic_calendar = AcademicCalendar.objects.filter(time_span=time_span).first()
        
        if not academic_calendar: 
            serializer = AcademicCalendarSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer2 = AcademicCalendarPDFSerializer(academic_calendar, data={'pdf_file': pdf_file})
            if serializer2.is_valid():
                serializer2.save()
                return Response(serializer2.data, status=status.HTTP_200_OK)
            return Response(serializer2.errors, status=status.HTTP_400_BAD_REQUEST)