import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect } from 'react-router-dom';
import {getOnePlaylist, makePlaylist} from '../../store/playlist'


export default function SinglePlaylist () {
    const dispatch = useDispatch();
    // const sessionPlaylist = useSelector(state => state.playlists);
    const {playlistId} = useParams();
    useEffect(() => {
        dispatch(getOnePlaylist(playlistId));
    }, [dispatch]);
  
    return (
        <div>
            <h1>Playlist</h1>
        </div>
    )
}
