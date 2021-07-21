from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='demo', email='demo@aa.io', password='demopassword')
    marnie = User(username='marnie', email='marnie@aa.io',
                  password='marniepassword')
    bobbie = User(username='bobbie', email='bobbie@aa.io',
                  password='bobbiepassword')
    fisher = User(username='fisher', email='fisher@aa.io',
                  password='fisherpassword')
    kelly = User(username='kelly', email='kelly@aa.io',
                 password='kellypassword')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(fisher)
    db.session.add(kelly)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
