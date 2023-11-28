
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from academicCalendar.views import AcademicCalendarView
from rest_framework import routers

route = routers.DefaultRouter()
route.register("",AcademicCalendarView, basename='academiccalendarview')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('api/academiccalendar/', include(route.urls)),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
