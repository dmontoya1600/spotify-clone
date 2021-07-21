from app.models import db, Playlist, playlist_songs


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    demo_playlist = Playlist(
        playlist_name="Demo's Playlist",
        playlist_image_url="https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431",
        user_id=1
    )

    marnie_playlist = Playlist(
        playlist_name="Marnie's Playlist",
        playlist_image_url="https://i.scdn.co/image/ab67616d0000b273044a5466dac00f7b3c570b99",
        user_id=2
    )

    bobbie_playlist = Playlist(
        playlist_name="Bobbie's Playlist",
        playlist_image_url="https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533",
        user_id=3
    )

    fisher_playlist = Playlist(
        playlist_name="Fisher's Playlist",
        playlist_image_url="https://i.scdn.co/image/ab67616d0000b27350c22294cd0ef1271dd7df3c",
        user_id=4
    )

    kelly_playlist = Playlist(
        playlist_name="Kelly's Playlist",
        playlist_image_url="https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a",
        user_id=5
    )

    db.session.add(demo_playlist)
    db.session.add(marnie_playlist)
    db.session.add(bobbie_playlist)
    db.session.add(fisher_playlist)
    db.session.add(kelly_playlist)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlists():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
