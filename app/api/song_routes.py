from flask import Blueprint, json, jsonify, session, request
from app.models import User, Song, Playlist, db
from app.models.playlist_songs import saved_songs
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


song_routes = Blueprint("song", __name__)


@song_routes.route("/", methods=["POST"])
def addSong():
    songs = Song.query.all()
    songDicts = [so.to_dict() for so in songs]
    so = request.json['song']
    id = request.json['playlist']['id']
    indicator = False

    song = Song.query.get(id)
    playlist = Playlist.query.get(id)

    for s in songDicts:
        if s['api_id'] == so['id']:
            indicator = True

    if indicator:
        song = Song.query.filter_by(api_id = so['id']).first()
        playlist.songs.append(song)
        db.session.add(playlist)
        db.session.commit()
        return song.to_dict()
    else:
        song = Song(
            api_id=so['id'],
            song_name=so['name'],
            artist_name=so['artists'][0]['name'],
            image_url=so['album']['images'][0]['url'],
            duration_ms=so['duration_ms'],
            )
        db.session.add(song)
        playlist.songs.append(song)
        db.session.add(playlist)
        db.session.commit()
        return song.to_dict()


@song_routes.route("/", methods=["DELETE"])
def delSong():
    songId = request.json['song']['id']
    playlistId = request.json['playlistId']
    song = Song.query.get(songId)
    playlist = Playlist.query.get(playlistId)
    # print("-"*40)
    # print(song, playlist)
    # print("-"*40)
    playlist.songs.remove(song)
    db.session.add(playlist)
    db.session.commit()

    return song.to_dict()
