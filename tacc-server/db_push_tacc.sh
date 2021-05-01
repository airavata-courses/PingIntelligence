# DB_PUSH (iu to tacc)
sudo su --command '#Extracting DB data into file
kubectl exec $(kubectl get pods | grep -o "mysql-user-mgmt[0-9a-zA-Z-]*") -- mysqldump -u root -proot@123 UserManagement > my_sqldump.sql
kubectl exec $(kubectl get pods | grep -o "django-google[0-9a-zA-Z-]*") python manage.py dumpdata googleupload> django_google_dump.json
kubectl exec $(kubectl get pods | grep -o "metadata-search[0-9a-zA-Z-]*") python manage.py dumpdata searchapi> metadata_search_dump.json

#Sending files to TACC
scp -i ./iu_key my_sqldump.sql ubuntu@149.165.156.145:~/
scp -i ./iu_key django_google_dump.json ubuntu@149.165.156.145:~/
scp -i ./iu_key metadata_search_dump.json ubuntu@149.165.156.145:~/'

#SSH to IU server
ssh -i ./iu_key ubuntu@149.165.156.145 "bash db_apply_iu.sh"

#Cleaning the server
rm -rf ./my_sqldump.sql
rm -rf ./django_google_dump.json
rm -rf ./metadata_search_dump.json
rm -rf ./istio_status.txt
