import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import EditPlaylist from './editPlaylist';
import Song from '../Song';
import Search from '../Search';
import playlistReducer, {getOnePlaylist, getPlaylists, makePlaylist, uploadPlaylistPic} from '../../store/playlist'
import { setCurrentSong } from '../../store/currentSong';
import "./SinglePlaylist.css"
import "../Song/Song.css"
import DbSong from '../DbSong';
import { getSongsThunk } from '../../store/song';

export default function SinglePlaylist () {
    let history = useHistory();
    const dispatch = useDispatch();
    const sessionPlaylists = useSelector(state => state.playlists);
    const sessionUser = useSelector(state => state.session.user);
    const playlistId = useParams().playlistId;
    const userId = sessionUser?.id
    const [showEditPlaylist, setShowEditPlaylist] = useState(false);
    const songList = useSelector(state => Object.values(state.songs))

    if(!sessionUser){
        history.push("/")
    }

    const currentPlaylist = sessionPlaylists[playlistId]

    useEffect(async() => {
        setShowEditPlaylist(false)
        await dispatch(getPlaylists(userId))
    }, [setShowEditPlaylist ,dispatch]);

    useEffect(() => {
        dispatch(getSongsThunk(playlistId))
    }, [playlistId, dispatch])


    let editButton
    let content;
    let playlists;
    for(const [key, value] of Object.entries(sessionPlaylists)){
        if(value.user === sessionUser?.id){
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

    if(showEditPlaylist){
        content = (
            <div className="banner">

            <EditPlaylist
            hideForm={()=>setShowEditPlaylist(false)}
            playlistId={playlistId}
            />
            </div>
        )
    }
    function handleIconClick(){
        document.getElementById('file').click()
      }
    async function uploadFile(e){
        await dispatch(uploadPlaylistPic(e.target.files[0], playlistId))
    }
    function handleIconClick(){
        document.getElementById('file').click()
      }

    if(!showEditPlaylist){
        content = (
            <div className="playlist_banner">
                <div className="playlist_icon" onClick={(e) => handleIconClick(e)}>
                    <img className="playlist_image" src={currentPlaylist?.img}/>
                    <div className='overlay'>
                        <img className='overlay_image' src='https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png'/>
                    </div>
                </div>
                <input id='file' type='file' hidden placeholder='Update Picture' onChange={uploadFile}/>
                <div className="banner_text" onClick={()=>setShowEditPlaylist(true)}>
                    <div className="playlistTitle" >
                        {currentPlaylist?.name}
                    </div>
                    <div className="username">
                        {sessionUser?.username}
                    </div>
                </div>
            </div>
        )
    }

        if(playlistId === sessionUser?.id){
        }


    if (!currentPlaylist) return null;

    // async function playsong(id) {
    //     await dispatch(setCurrentSong(`track/${id}`))
    // }

    return (
        <div className="songsContainer">

                    {content}
            <h2 className="songsTitle">Playlist Songs</h2>
            {songList && songList.map((song, index) => (
                <DbSong key={index} song={song} playlistId={playlistId}/>
            ))}
            <div>
                <Search />
            </div>
        </div>
     )
}
