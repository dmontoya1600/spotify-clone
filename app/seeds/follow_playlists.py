from app.models import db
from app.models.playlist_songs import follow_playlist


def seed_follow_playlists():

    follow_playlist_demo_marnie = follow_playlist.insert().values(user_id=1,
                                                                  playlist_id=2)
    follow_playlist_demo_bobbie = follow_playlist.insert().values(user_id=1,
                                                                  playlist_id=3)
    follow_playlist_demo_fisher = follow_playlist.insert().values(user_id=1,
                                                                  playlist_id=4)
    follow_playlist_demo_kelly = follow_playlist.insert().values(user_id=1,
                                                                 playlist_id=5)

    db.session.execute(follow_playlist_demo_marnie)
    db.session.execute(follow_playlist_demo_bobbie)
    db.session.execute(follow_playlist_demo_fisher)
    db.session.execute(follow_playlist_demo_kelly)

    db.session.commit()


def undo_follow_playlists():
    db.session.execute('TRUNCATE follow_playlists RESTART IDENTITY CASCADE;')
    db.session.commit()
