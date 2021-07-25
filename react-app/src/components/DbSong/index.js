import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { addSongThunk } from '../../store/song';
import { setCurrentSong } from '../../store/currentSong';
import { delSongThunk } from '../../store/song';

export default function DbSong({ song, playlistId }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)
    const location = useLocation().pathname
    const history = useHistory()

    function formatMillis(millis) {
        var mins = Math.floor(millis / 60000);
        var secs = ((millis % 60000) / 1000).toFixed(0);
        return mins + ":" + (secs < 10 ? '0' : '') + secs;
    }

    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);

    async function playsong(id) {
        await dispatch(setCurrentSong(`track/${id}`))
    }

    return (
        <div className="song__container">
                <button className="song__playBtn" id="imageButton" onClick={() => playsong(song.api_id)}><div className="song__playbtnImage"></div></button>
                <div className="song__imageDiv" >
                    <img src={song.image_url} className="song__image"/>
                    </div>
                    <div className="song__text">
                        <h4>{song.song_name}</h4>
                        <p>{song.artist_name}</p>
                        </div>
                        <div className="song__durationDiv">
                            <div className="song__duration">{formatMillis(song.duration_ms)}</div>
                            <button className="song__addBtn" onClick={!showMenu ? openMenu : closeMenu }>
                                <div className="song__btnImage" />
                            </button>
                        </div>
                        {showMenu &&
                            <div className="song_removeForm">
                                    <button
                                    onClick={(e)=> {
                                        dispatch(delSongThunk({"song": song, 'playlistId': playlistId}))
                                    }}>Remove Song</button>
                            </div>
                        }
        </div>
    )
}
