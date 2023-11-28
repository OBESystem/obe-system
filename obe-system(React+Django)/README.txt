Frontend(React):
Commands:
npm install bootstrap, react, react-dom, react-router-dom, axios, @reduxjs/toolkit react-redux
npm start

Backend(Django)
INSTALL Python AT FIRST
Check existence of pyhton and pip by ( python --version and pip --version)

Commands:
python -m venv myenv
& .\myenv\Scripts\activate
pip install -r requirements.txt

REPLACE the file myenv/Lib/site-packages/django/core/mail/backends/smtp.py with the code in the link : https://github.com/django/django/blob/main/django/core/mail/backends/smtp.py

**Install Python extension and select the python.exe of myenv as python interpreter
In VScode : View -> Command Paletter -> Select Interpreter -> Enter interpreter path

**Install SQLite Viewer to see the database file

Commands:
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

To create a project, use the cpmmand ( django-admin startproject project_name )

***NEED TO RUN BOTH frontend and backend together

