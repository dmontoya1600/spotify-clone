import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import "./Song.css"
import { addSongThunk } from '../../store/song';
import { setCurrentSong } from '../../store/currentSong';


export default function Song({ track }) {
    const dispatch = useDispatch();
    const [showAddSong, setShowAddSong] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showForm, setShowForm] = useState(false)
    let allPlaylists = useSelector(state => Object.values(state.playlists))
    let sessionUser = useSelector(state => state.session.user)
    let [userPlaylists, setUserPlaylists] = useState(null)

    useEffect(() => {
        if (allPlaylists && sessionUser) {
            setUserPlaylists(allPlaylists.filter(list => list.user == sessionUser.id))
        }
    }, [])


    function formatMillis(millis) {
        var mins = Math.floor(millis / 60000);
        var secs = ((millis % 60000) / 1000).toFixed(0);
        return mins + ":" + (secs < 10 ? '0' : '') + secs;
    }


    const openMenu = () => setShowMenu(true);
    const closeMenu = () => {
        setShowMenu(false)
        setShowForm(false)
    };
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    async function playsong(id) {
        if (sessionUser) {
            await dispatch(setCurrentSong(`track/${id}`))
        } else {
            return;
        }
    }

    return (
        <div className="song__container">
            <button className="song__playBtn" onClick={() => playsong((track.id))}><div className="song__playbtnImage"></div></button>
            <div className="song__imageDiv">
                <img src={track.album.images[0].url} className="song__image"/>
            </div>
            <div className="song__text">
                <h4>{track.name}</h4>
                <p>{track.album.name}</p>
            </div>
            <div className="song__durationDiv">
                <div className="song__duration">{track.duration_ms && formatMillis(track.duration_ms)}</div>
                <button className="song__addBtn" onClick={!showMenu ? openMenu : closeMenu }>
                    <div className="song__btnImage" />
                </button>
            </div>
            {showMenu &&
                <div className="song_addForm">
                    <button onClick={!showForm ? openForm : closeForm }>Add to Playlist</button>
                    {showForm &&
                        <div className="song__btsDiv">
                            {userPlaylists?.map(list => (
                                <button key={list.id}
                                    value={list}
                                    onClick={() => dispatch(addSongThunk({playlist: list, song: track}))}>
                                    {list.name}
                                </button>
                            ))}
                        </div>
                    }
                    <form>
                        <button onClick={(e)=> e.preventDefault() }>Create Playlist</button>
                    </form>
                </div>
            }
        </div>
    )
}
