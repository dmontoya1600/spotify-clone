from flask import Blueprint, jsonify, session, request
from app.models import User, db, Song, Playlist
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


playlist_songs_routes = Blueprint("playlist-songs", __name__)


@playlist_songs_routes.route("/", methods=['POST'])
def get_songs():
    id = request.json['playlistId']
    songs = Playlist.query.find_by(id).songs.all()
    print("STUFFF: ", songs)
    return None
