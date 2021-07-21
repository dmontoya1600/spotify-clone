from app.models import db
from app.models.user import follow_user

def seed_follow_users():
    follow_user_demo_marnie = follow_user.insert().values(follower_id=1, followee_id=2)
    follow_user_demo_bobbie = follow_user.insert().values(follower_id=1, followee_id=3)
    follow_user_demo_fisher = follow_user.insert().values(follower_id=1, followee_id=4)
    follow_user_demo_kelly = follow_user.insert().values(follower_id=1, followee_id=5)

    db.session.execute(follow_user_demo_marnie)
    db.session.execute(follow_user_demo_bobbie)
    db.session.execute(follow_user_demo_fisher)
    db.session.execute(follow_user_demo_kelly)

    db.session.commit()

def undo_follow_users():
    db.session.execute('TRUNCATE follow_user RESTART IDENTITY CASCADE;')
    db.session.commit()