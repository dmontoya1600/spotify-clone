import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect } from 'react-router-dom';
import EditPlaylist from './editPlaylist';
import playlistReducer, {getOnePlaylist, getPlaylists, makePlaylist} from '../../store/playlist'
import "./SinglePlaylist.css"

export default function SinglePlaylist () {
    const dispatch = useDispatch();
    const sessionPlaylists = useSelector(state => state.playlists);
    const sessionUser = useSelector(state => state.session.user);
    const playlistId = useParams().playlistId;
    const userId = sessionUser.id
    const [showEditPlaylist, setShowEditPlaylist] = useState(false);

    useEffect(async() => {
        setShowEditPlaylist(false)
        await dispatch(getPlaylists(userId))
    }, [setShowEditPlaylist ,dispatch]);

    useEffect(() => {
        console.log(playlistId)
        const getSongs = async(playlistId) => {
            let data = await fetch("/api/playlist-songs/", {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({playlistId})
            }
             )
            let songs = await data.json()
            return songs
        }


<<<<<<< HEAD
    useEffect(() => {
        const getSongs = async (id) => {
            const response = await fetch("/api/songs");
        }
    }, [dispatch])

=======
        getSongs(playlistId)
    }, [dispatch]);
>>>>>>> origin/main

    let editContent;
    if(showEditPlaylist){
        editContent = (
            <EditPlaylist
            hideForm={()=>setShowEditPlaylist(false)}
            playlistId={playlistId}
            />
        )

    }
    let editButton
        if(playlistId === sessionUser?.id){
        }


        let playlists;
        for(const [key, value] of Object.entries(sessionPlaylists)){
            if(value.user === sessionUser.id){
                editButton =  (
                      <button onClick={()=>setShowEditPlaylist(true)}>
                        Edit
                      </button>
                  )
                }
        if(playlistId === key){
        playlists=value
        }
    }

    return (
        <>
            <div className="playlist_banner">
                <div className="playlistImg">
                    <img src={playlists?.img} alt="something"/>
                </div>
                <div>
                    <div>
                        <h1>{playlists?.name}</h1>
                    </div>
                    <div>
                       {editButton}
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
        </>
    )
}
