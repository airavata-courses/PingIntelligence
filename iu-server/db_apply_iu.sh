#Loading data from dump into databases
sudo su --command 'kubectl exec $(kubectl get pods | grep -o "mysql-user-mgmt[0-9a-zA-Z-]*") -- mysql -u root -proot@123 UserManagement < my_sqldump.sql

kubectl cp ./django_google_dump.json default/$(kubectl get pods | grep -o "django-google[0-9a-zA-Z-]*"):/project/googleupload/fixtures
kubectl exec $(kubectl get pods | grep -o "django-google[0-9a-zA-Z-]*") python manage.py makemigrations
kubectl exec $(kubectl get pods | grep -o "django-google[0-9a-zA-Z-]*") python manage.py migrate
kubectl exec $(kubectl get pods | grep -o "django-google[0-9a-zA-Z-]*") python manage.py loaddata django_google_dump.json

kubectl cp ./metadata_search_dump.json default/$(kubectl get pods | grep -o "metadata-search[0-9a-zA-Z-]*"):/project/searchapi/fixtures
kubectl exec $(kubectl get pods | grep -o "metadata-search[0-9a-zA-Z-]*") python manage.py makemigrations
kubectl exec $(kubectl get pods | grep -o "metadata-search[0-9a-zA-Z-]*") python manage.py migrate
kubectl exec $(kubectl get pods | grep -o "metadata-search[0-9a-zA-Z-]*") python manage.py loaddata metadata_search_dump.json'

#Cleaning files from server
rm -rf ./my_sqldump.sql
rm -rf ./django_google_dump.json
rm -rf ./metadata_search_dump.json
