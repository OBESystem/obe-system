# Generated by Django 4.0.3 on 2023-12-27 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academicCalendar', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='academiccalendar',
            name='pdf_file',
            field=models.FileField(upload_to='academicCalendars/'),
        ),
    ]
