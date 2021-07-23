from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Playlist
from werkzeug.datastructures import ImmutableMultiDict


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('load/<int:id>')
def loadUser(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('all-playlists/<int:id>')
def loadPlaylists(id):
    rawPlaylists = Playlist.query.filter_by(user_id=id).all()
    user = User.query.get(id)
    playlists = map(lambda x: x.to_dict(), rawPlaylists)
    newPlaylist = []

    for playlist in playlists:
        playlist['username'] = user.username
        newPlaylist.append(playlist)

    return jsonify({'playlists': newPlaylist})



@user_routes.route('update/<int:id>', methods=['POST'])
def updateUser(id):
    user = User.query.get(id)
    content = request.json
    username = content['username']
    email = content['email']
    user.username = username
    user.email = email
    db.session.commit()
    return user.to_dict()

@user_routes.route('delete/<int:id>', methods=['DELETE'])
def deleteUser(id):
    User.query.filter_by(id=id).delete()
    db.session.commit()
    return 'complete'
