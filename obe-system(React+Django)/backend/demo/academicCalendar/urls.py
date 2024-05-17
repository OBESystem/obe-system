from django.urls import path, include
from academicCalendar.views import GetAcademicCalendarView, AddAcademicCalendarView

urlpatterns = [
    path('get-academic-calendars/',GetAcademicCalendarView.as_view(),name='get_academic_calendars'),
    path('add-academic-calendar/', AddAcademicCalendarView.as_view(),name='add_academic_calendar'),
]

