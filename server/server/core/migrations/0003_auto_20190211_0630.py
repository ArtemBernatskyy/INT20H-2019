# Generated by Django 2.0.10 on 2019-02-11 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20190211_0458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emotion',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
