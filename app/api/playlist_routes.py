from flask import Blueprint, jsonify, session, request
from app.forms import PlaylistForm, UpdatePlaylistForm
from app.models import db, User, Playlist, Song

playlist_routes = Blueprint('playlists', __name__)


@playlist_routes.route('/', methods=['GET'])
def get_playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


# @playlist_routes.route('/', methods=['GET'])
# def get_user_playlists(user_id):
    # playlists = Playlist.query.all()
    # return {'playlists': [playlist.to_dict() for playlist in playlists]}


@playlist_routes.route('/', methods=['POST'])
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist = Playlist(
            playlist_name= form.data['playlist_name'] ,
            playlist_image_url= form.data['playlist_image_url'],
            user_id= form.data['user_id'],
            )
        db.session.add(playlist)
        db.session.commit()
        playlists = Playlist.query.all()
        return {'playlists': [playlist.to_dict() for playlist in playlists]}
    return print("Not Working"), 400


@playlist_routes.route('/<int:playlist_id>')
def get_playlist(playlist_id):
    data = Playlist.query.get(playlist_id)
    if data is None:
        return jsonify({'message': 'Playlist not found'}), 404
    return {"playlists" :[ data.to_dict()]}


@playlist_routes.route('/<int:playlist_id>', methods=['DELETE'])
def delete_playlist(playlist_id):
    data = Playlist.query.get(playlist_id)
    print("DATA: ", data)
    db.session.delete(data)
    db.session.commit()

    return jsonify({'message': 'Playlist deleted'}), 200


@playlist_routes.route('/<int:playlist_id>', methods=['PUT'])
def edit_playlist(playlist_id):
    form = UpdatePlaylistForm()
    data = Playlist.query.get(playlist_id)

    if data is None:
        return jsonify({'message': 'Playlist not found'}), 404

    data.id = form.data['playlist_id']
    data.playlist_name = form.data['playlist_name']
    data.playlist_image_url = form.data['playlist_image_url']
    data.user_id = form.data['user_id']
    db.session.commit()
    playlists = Playlist.query.all()

    return {'playlists': [playlist.to_dict() for playlist in playlists]}
