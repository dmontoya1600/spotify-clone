from flask import Blueprint, jsonify, session, request
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
    api_id = request.json['song']['id']
    id = request.json['playlist']['id']
    indicator = False

    for so in songDicts:
        if so['api_id'] == api_id:
            indicator = True


    print("-"*40)
    print("THIS IS THE SONG", song)
    print("-"*40)
    if indicator:
        song = Song.query.filter_by(api_id = api_id).first()
        db.session.execute(saved_songs.insert().values(song_id=song['id'], playlist_id=id))
        # db.session.add(song)
        # db.session.commit()
        # playlist = Playlist.query.get(id)
        # return jsonify(playlist)
        pass
    else:
        song = Song()

    print("THIS IS THE INDICATOR ", indicator, id)
    return api_id
