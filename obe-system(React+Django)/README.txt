Frontend(React):

npx create-react-app frontend(Command)
Replace all the folders except node_modules
npm install bootstrap, react, react-dom, react-router-dom, axios, @reduxjs/toolkit react-redux(Command)
npm start(Command)

Backend(Django)
INSTALL Python AT FIRST
Check existence of pyhton and pip by ( python --version and pip --version)

python -m venv myenv(Command)
& .\myenv\Scripts\activate(Command)
pip install -r requirements.txt(Command)

REPLACE the file myenv/Lib/site-packages/django/core/mail/backends/smtp.py with the code in the link : https://github.com/django/django/blob/main/django/core/mail/backends/smtp.py

**Install Python extension and select the python.exe of myenv as python interpreter
In VScode : View -> Command Palette-> Select Interpreter -> Enter interpreter path

**Install SQLite Viewer to see the database file

python manage.py makemigrations(Command)
python manage.py migrate(Command)
python manage.py runserver(Command)

To create a project, use the command ( django-admin startproject project_name )

***NEED TO RUN BOTH frontend and backend together

