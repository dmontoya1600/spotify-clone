from app.models import db
from app.models.playlist_songs import saved_songs


def seed_saved_songs():
    saved_song1 = saved_songs.insert().values(song_id=1, playlist_id=1)
    saved_song2 = saved_songs.insert().values(song_id=2, playlist_id=1)
    saved_song3 = saved_songs.insert().values(song_id=3, playlist_id=1)
    saved_song4 = saved_songs.insert().values(song_id=4, playlist_id=1)
    saved_song5 = saved_songs.insert().values(song_id=5, playlist_id=2)
    saved_song6 = saved_songs.insert().values(song_id=6, playlist_id=2)
    saved_song7 = saved_songs.insert().values(song_id=7, playlist_id=2)
    saved_song8 = saved_songs.insert().values(song_id=8, playlist_id=2)
    saved_song9 = saved_songs.insert().values(song_id=9, playlist_id=3)
    saved_song10 = saved_songs.insert().values(song_id=10, playlist_id=3)
    saved_song11 = saved_songs.insert().values(song_id=11, playlist_id=3)
    saved_song12 = saved_songs.insert().values(song_id=12, playlist_id=3)
    saved_song13 = saved_songs.insert().values(song_id=13, playlist_id=4)
    saved_song14 = saved_songs.insert().values(song_id=14, playlist_id=4)
    saved_song15 = saved_songs.insert().values(song_id=15, playlist_id=4)
    saved_song16 = saved_songs.insert().values(song_id=16, playlist_id=4)
    saved_song17 = saved_songs.insert().values(song_id=17, playlist_id=5)
    saved_song18 = saved_songs.insert().values(song_id=18, playlist_id=5)
    saved_song19 = saved_songs.insert().values(song_id=19, playlist_id=5)
    saved_song20 = saved_songs.insert().values(song_id=20, playlist_id=5)

    db.session.execute(saved_song1)
    db.session.execute(saved_song2)
    db.session.execute(saved_song3)
    db.session.execute(saved_song4)
    db.session.execute(saved_song5)
    db.session.execute(saved_song6)
    db.session.execute(saved_song7)
    db.session.execute(saved_song8)
    db.session.execute(saved_song9)
    db.session.execute(saved_song10)
    db.session.execute(saved_song11)
    db.session.execute(saved_song12)
    db.session.execute(saved_song13)
    db.session.execute(saved_song14)
    db.session.execute(saved_song15)
    db.session.execute(saved_song16)
    db.session.execute(saved_song17)
    db.session.execute(saved_song18)
    db.session.execute(saved_song19)
    db.session.execute(saved_song20)

    db.session.commit()


def undo_saved_songs():
    db.session.execute('TRUNCATE saved_songs RESTART IDENTITY CASCADE;')
    db.session.commit()
