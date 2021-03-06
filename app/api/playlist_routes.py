import os
from flask import Blueprint, jsonify, session, request, current_app
from app.forms import PlaylistForm, UpdatePlaylistForm
from app.models import db, User, Playlist, Song
from app.models.playlist_songs import saved_songs
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
import logging
import boto3
from botocore.exceptions import ClientError

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

@playlist_routes.route('/<int:id>/liked')
def get_liked_playlists(id):
    db_uri = current_app.config['SQLALCHEMY_DATABASE_URI']
    engine = create_engine(db_uri)
    metadata = MetaData(engine)
    metadata.reflect()
    table = metadata.tables['follow_playlist']
    Session = sessionmaker(bind=engine)
    session = Session()
    allLiked = session.query(table).filter_by(user_id = id).all()
    allLikedPlaylists = []
    for liked in allLiked:
        currentPlaylist = Playlist.query.get(liked.playlist_id)
        playlist_owner = User.query.get(currentPlaylist.user_id)
        updatedPlaylist = currentPlaylist.to_dict()
        updatedPlaylist['owner'] = playlist_owner.username
        allLikedPlaylists.append(updatedPlaylist)


    return jsonify({'likedPlaylists': allLikedPlaylists})

def create_presigned_post(bucket_name, object_name,
                          fields=None, conditions=None, expiration=3600):

    # Generate a presigned S3 POST URL
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_post(bucket_name,
                                                     object_name,
                                                     Fields=fields,
                                                     Conditions=conditions,
                                                     ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL and required fields
    return response

@playlist_routes.route('/<int:id>/updatePic', methods=['POST'])
def updatePlaylistPic(id):
    playlist = Playlist.query.get(id)
    s3 = boto3.client('s3')
    if request.files:
        file_data = request.files['image']
        s3.upload_fileobj(file_data, 'spotify-clone-project', file_data.filename,
                            ExtraArgs={
                                'ACL': 'public-read',
                                'ContentType': file_data.content_type
                            })
        response = create_presigned_post('spotify-clone-project', file_data.filename)
        image_url = response["url"] + response["fields"]["key"]
        playlist.playlist_image_url = image_url
        db.session.commit()
        playlist = Playlist.query.get(id)

        return jsonify(playlist.to_dict())
