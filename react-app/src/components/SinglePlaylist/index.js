import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect } from 'react-router-dom';
import EditPlaylist from './editPlaylist';
import playlistReducer, {getOnePlaylist, getPlaylists, makePlaylist} from '../../store/playlist'


export default function SinglePlaylist () {
    const dispatch = useDispatch();
    const sessionPlaylists = useSelector(state => state.playlists);
    const playlistId = useParams().playlistId;

    const [showEditPlaylist, setShowEditPlaylist] = useState(false);

    useEffect(async() => {
        setShowEditPlaylist(false)
        await dispatch(getPlaylists())
    }, [setShowEditPlaylist ,dispatch]);

    // Get songs in the playlist.
    // fetch to back end.
    // collect songs.
    // render to page as map.


    let editContent;
    if(showEditPlaylist){
        editContent = (
            <EditPlaylist
            hideForm={()=>setShowEditPlaylist(false)}
            playlistId={playlistId}
            />
        )
    }


    let playlists;
    for(const [key, value] of Object.entries(sessionPlaylists)){
        if(playlistId === key){
        // playlists.push(value)
        playlists=value
        }
    }

    return (
        <>
        <div>
            <div className="playlistInfo">
                <div className="playlistImg">
                    <img src={playlists?.img} alt="something"/>
                </div>
                <div>
                    <div>
                        <h1>{playlists?.name}</h1>
                    </div>
                    <div>
                        {!showEditPlaylist && (
                            <button onClick={()=>setShowEditPlaylist(true)}>
                                Edit
                            </button>
                        )}
                        {editContent}
                    </div>
                </div>


            </div>
            <div className="songList">
                <h1>Songs box</h1>

            </div>
            <div className="searccontainer">
                Search

            </div>

        </div>
        </>
    )
}
