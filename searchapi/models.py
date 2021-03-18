from django.db import models

# Create your models here.
class Metadata(models.Model):
    height = models.IntegerField(default='0')
    width = models.IntegerField(default='0')
    mode = models.CharField(max_length=100,default='')
    formats = models.CharField(max_length=100,default='')
    image = models.BinaryField(blank = True, null = True, editable = True)
    annotationtags  = models.CharField(max_length=100,default='')
    created_on = models.TextField(null=True)
    size = models.TextField(null=True)
    description = models.CharField(max_length=300,default='')
    title = models.CharField(max_length=300,default='')
    albumname = models.CharField(max_length=300,default='')

# {"height": 397, "width": 719, "mode": "RGB", "size": [719, 397], "format": "PNG", "info": {}}

    # size = ArrayField(models.IntegerField(max_length=10, blank=True),size=8),
