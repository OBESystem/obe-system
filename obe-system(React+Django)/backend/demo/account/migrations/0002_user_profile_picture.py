# Generated by Django 4.0.3 on 2023-12-27 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(default='profilePictures/default.png', upload_to='profilePictures/'),
        ),
    ]
