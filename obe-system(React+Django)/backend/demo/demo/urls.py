
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('api/course/', include('course.urls')),
    path('api/academiccalendar/', include('academicCalendar.urls')),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
