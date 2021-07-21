from flask import Blueprint, jsonify, session, request
from app.forms import PlaylistForm
from app.models import db, User, Playlist, Song

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/', methods=['GET'])
def get_playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


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
        return jsonify(playlist.to_dict()), 201
    return print("Not Working"), 400


@playlist_routes.route('/<int:playlist_id>')
def get_playlist(playlist_id):
    data = Playlist.query.get(playlist_id)
    print("PLAY: ", data)
    if data is None:
        return jsonify({'message': 'Playlist not found'}), 404
    return {"playlists" :[ data.to_dict()]}
