from django.db import models


def user_directory(instance, filename):
    return "{0}/{1}".format(instance.user_id, filename)


# Create your models here.
class Albums(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.name
    

class Images(models.Model):
    album = models.ForeignKey(Albums, on_delete=models.CASCADE, blank = True)
    user_id = models.CharField(max_length=64, blank=False)
    image = models.ImageField(upload_to = user_directory, blank = True)
    image_id_user = models.CharField(max_length=100, default="abc")
    #image = models.ImageField(upload_to = user_directory)
    image_id = models.CharField(max_length=200, null = True, blank = True)