import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect } from 'react-router-dom';
import EditPlaylist from './editPlaylist';
import Song from '../Song';
import Search from '../Search';
import playlistReducer, {getOnePlaylist, getPlaylists, makePlaylist} from '../../store/playlist'
import "./SinglePlaylist.css"

export default function SinglePlaylist () {
    const dispatch = useDispatch();
    const sessionPlaylists = useSelector(state => state.playlists);
    const sessionUser = useSelector(state => state.session.user);
    const playlistId = useParams().playlistId;
    const userId = sessionUser.id
    const [showEditPlaylist, setShowEditPlaylist] = useState(false);
    const [ourSongs, setGetSongs] = useState({});
    let playlist
    let songs
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
            }
             )
            let res = await data.json()
            console.log("RES: ", res)
            setGetSongs(res )
            return res
        }
        getSongs(playlistId)

    }, [dispatch]);

    console.log("BIG! : ", ourSongs.songs)


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
        <div className="playlist_box">
            <div className="playlist_banner">
                <div className="playlist__imageDiv">
                    <img className="playlist__image" src={playlists?.img} alt="something"/>
                </div>
                <div className="playlist__name">
                    <h1 className="playlist_name">{playlists?.name}</h1>
                    <div>
                       {editButton}
                        {editContent}
                    </div>
                </div>

            </div>
            <div className="songList">
                <div className="song_container">
                    {ourSongs?.songs?.map(track => (
                        <>
                        <button className="song__playBtn"> Button<div className="song__playbtnImage"></div></button>
                        <div className="song__imageDiv">
                            <img src={track.img} className="song__image"/>
                        </div>
                        <div className="song__text">
                            <h4>{track.song_name}</h4>
                            <p>{track.artist_name}</p>
                        </div>
                        </>

                    ))}
                </div>
            </div>
            <div className="searchcontainer">
                
                <Search />

            </div>
        </div>
    )
}
