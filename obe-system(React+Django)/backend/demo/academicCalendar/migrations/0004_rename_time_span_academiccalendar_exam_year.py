# Generated by Django 4.0.3 on 2023-12-27 07:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('academicCalendar', '0003_rename_exam_year_academiccalendar_time_span'),
    ]

    operations = [
        migrations.RenameField(
            model_name='academiccalendar',
            old_name='time_span',
            new_name='exam_year',
        ),
    ]
