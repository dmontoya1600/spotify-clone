from flask import Blueprint, request
from app.models import User, db, Song, Playlist

playlist_songs_routes = Blueprint("playlist-songs", __name__)


@playlist_songs_routes.route("/", methods=['POST'])
def get_songs():
    playlistId = request.json["playlistId"]
    playlist = Playlist.query.get(playlistId)
    songs = [{"id": song.id, "api_id": song.api_id, "artist_name": song.artist_name, "song_name": song.song_name, "image_url": song.image_url, "duration_ms": song.duration_ms} for song in playlist.songs]
    return {"songs": songs}

