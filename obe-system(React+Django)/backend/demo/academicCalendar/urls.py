from django.urls import path, include
from academicCalendar.views import AcademicCalendarView

urlpatterns = [
    path('', AcademicCalendarView.as_view({'get': 'list'}), name='academiccalendar'),
]
