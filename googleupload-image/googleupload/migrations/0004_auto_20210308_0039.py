# Generated by Django 3.1.7 on 2021-03-08 05:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('googleupload', '0003_photo_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='albumname',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='link',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='photo_id',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='photodata',
        ),
    ]
