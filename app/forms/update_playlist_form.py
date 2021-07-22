from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField


class UpdatePlaylistForm(FlaskForm):
    playlist_id= IntegerField('playlist_id')
    playlist_name = StringField('playlist_name')
    playlist_image_url = StringField('image')
    user_id = IntegerField('user_id')
