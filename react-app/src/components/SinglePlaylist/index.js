import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import EditPlaylist from './editPlaylist';
import Song from '../Song';
import Search from '../Search';
import playlistReducer, {getOnePlaylist, getPlaylists, makePlaylist} from '../../store/playlist'
import { setCurrentSong } from '../../store/currentSong';
import "./SinglePlaylist.css"
import "../Song/Song.css"

export default function SinglePlaylist () {
    let history = useHistory();
    const dispatch = useDispatch();
    const sessionPlaylists = useSelector(state => state.playlists);
    const sessionUser = useSelector(state => state.session.user);
    const playlistId = useParams().playlistId;
    const userId = sessionUser?.id
    const [showEditPlaylist, setShowEditPlaylist] = useState(false);

    if(!sessionUser){
        history.push("/")
    }

    const [songList, setSongList] = useState([]);


    const currentPlaylist = sessionPlaylists[playlistId]



    useEffect(async() => {
        setShowEditPlaylist(false)
        await dispatch(getPlaylists(userId))
    }, [setShowEditPlaylist ,dispatch]);



    useEffect(() => {

        const getSongs = async(playlistId) => {
            let data = await fetch("/api/playlist-songs/", {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({playlistId})
            })
            let songs = await data.json()
            return songs;
        }

        getSongs(playlistId).then((songs) => {
            let songList = songs.songs
            setSongList(songList)
        });
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

    if(!showEditPlaylist){
        content = (
            <div className="playlist_banner">
                <div className="playlist_icon" >
                    <img className="playlist_image" src={currentPlaylist?.img}/>
                    <div className='overlay'>
                        <img className='overlay_image' src='https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png'/>
                    </div>
                </div>
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

    async function playsong(id) {
        await dispatch(setCurrentSong(id))
    }

    return (

        <div className="songsContainer">

                    {content}





            <h2 className="songsTitle">Songs</h2>
            {songList && songList.map((song, index) => {
            return (
            <div className="song__container" key={index}>
                <button className="song__playBtn" id="imageButton" onClick={() => playsong(song.api_id)}><div className="song__playbtnImage"></div></button>
                <div className="song__imageDiv" >
                    <img src={song.image_url} className="song__image"/>
                    </div>
                    <div className="song__text">
                        <h4>{song.song_name}</h4>
                        <p>{song.artist_name}</p>
                        </div>
                        <div className="song__durationDiv">
                            <div className="song__duration">2:00</div>
                            <button className="song__addBtn" >
                                <div className="song__btnImage" />
                            </button>
                        </div>
                    </div>)
                })}
            <div>
                <Search />
            </div>
        </div>
     )

}
