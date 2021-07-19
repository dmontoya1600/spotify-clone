from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .playlist_songs import follow_playlist

# follow_user = db.Table(
#     'follow_user',
#     db.Model.metadata,
#     db.Column("follower_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
#     db.Column("followee_id", db.Integer, db.ForeignKey("users.id"), primary_key=True)
# )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    user_image = db.Column(db.String(255), nullable=True)

    playlists = db.relationship('Playlist', secondary='follow_playlist', back_populates='users')
    # follows = db.relationship('User', secondary='follow_user', back_populates='follows')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
