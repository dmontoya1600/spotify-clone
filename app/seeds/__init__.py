from app.seeds.playlists import seed_playlists, undo_playlists
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .songs import seed_songs, undo_songs
from .playlists import seed_playlists, undo_playlists
from .saved_songs import seed_saved_songs, undo_saved_songs
from .follow_playlists import seed_follow_playlists, undo_follow_playlists
from .follow_users import seed_follow_users, undo_follow_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_songs()
    seed_playlists()
    seed_saved_songs()
    seed_follow_playlists()
    seed_follow_users()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_songs()
    undo_playlists()
    undo_saved_songs()
    undo_follow_playlists
    undo_follow_users
