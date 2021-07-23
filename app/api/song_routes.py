from flask import Blueprint, jsonify, session, request
from app.models import User, Song, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


song_routes = Blueprint("song", __name__)


@song_routes.route("/", methods=["POST"])
def addSong():
    songs = Song.query.all()
    songDicts = [so.to_dict() for so in songs]
    id = request.json['song']['id']
    indicator = False

    for so in songDicts:
        if so['api_id'] == id:
            indicator = True
            print(so)

    if indicator:
        pass  # query for the song with the apiId that matches
    else:
        pass  # create a new instance of the song and add the relationship

    print("THIS IS THE INDICATOR ", indicator)
    return id
