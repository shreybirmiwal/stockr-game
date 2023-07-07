import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import schedule
import time

# Firebase credentials
cred = credentials.Certificate('stockr-5fe59-firebase-adminsdk-x309x-308db0a545.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://your-firebase-database-url.firebaseio.com'
})

# Function to update Firebase database
def update_database():
    # Get a database reference
    ref = db.reference('/')

    # Update the data in the database
    ref.update({'message': 'Updated at {}'.format(time.ctime())})
    print('Database updated at', time.ctime())

# Schedule the job to run every 30 minutes
schedule.every(30).minutes.do(update_database)

# Main script execution
if __name__ == '__main__':
    while True:
        schedule.run_pending()
        time.sleep(1)
