from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class PlaylistForm(FlaskForm):
    playlist_name = StringField('playlist_name')
    playlist_image_url = StringField('image')
    user_id = IntegerField('user_id')
