1.

> git clone https://github.com/airavata-courses/PingIntelligence.git

> cd PingIntelligence

> git checkout milestone_2

> cd metadataextractorsearch/

2. set up virtual for django project

> python -m venv venv

3. source venv/scripts/activate to activate the virtual environment

   on Windows
   >.\venv\Scripts\activate

4. download dependencies
>   pip install -r requirements.txt

5. migrate the database with
>   python manage.py makemigrations

  > python manage.py migrate


6. in order to run the server
>  python manage.py runserver
