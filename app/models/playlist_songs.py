from sqlalchemy.sql.schema import ForeignKey
from app.models.user import User
from .db import db

saved_songs = db.Table(
    'saved_songs',
    db.Model.metadata,
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True),
    db.Column("playlist_id", db.Integer, db.ForeignKey("playlists.id"), primary_key=True)
)

follow_playlist = db.Table(
    'follow_playlist',
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("playlist_id", db.Integer, db.ForeignKey("playlists.id"), primary_key=True)
)

class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.String(255), nullable=False, unique=True)
    song_name = db.Column(db.String(40), nullable=False, unique=True)
    artist_name = db.Column(db.String(40), nullable=False, unique=True)

    playlists = db.relationship('Playlist', secondary=saved_songs, back_populates='songs')


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String(40), nullable=False, unique=True)
    playlist_image_url = db.Column(db.String(255), nullable=False, unique=True)
    user_id = db.Column(db.Integer, nullable=False)

    users = db.relationship('User', secondary=follow_playlist, back_populates='playlists')
    songs = db.relationship('Song', secondary=saved_songs, back_populates='playlists')
