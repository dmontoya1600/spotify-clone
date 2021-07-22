import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect } from 'react-router-dom';
import playlistReducer, {getPlaylists, makePlaylist} from '../../store/playlist'
import "./SideBar.css"

const SideBar = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const sessionPlaylists = useSelector(state => state.playlists);
    const userId = sessionUser.id

    useEffect(() => {
        dispatch(getPlaylists( userId));
    }, [dispatch]);


    let num = 0;
    const handleCreate = async(e) => {
        e.preventDefault();
        let playlist;
        num++
        let newPlaylist = {
            playlist_name : `New Playlist `,
            playlist_image_url: "MOO",
            user_id : sessionUser.id,
        }
        if(newPlaylist){
            newPlaylist = await dispatch(makePlaylist(newPlaylist));
            console.log("NEWnew: ", newPlaylist.playlists);
        }
        for(const [key, value] of Object.entries(newPlaylist.playlists)){
            playlist=value
        }
        
        return(

            <>
            <Redirect to exact ={`/playlists/${playlist.id}`} />
            </>
        )
    }

    let playlists = []
    for(const [key, value] of Object.entries(sessionPlaylists)){
            playlists.push(value)
    }

    return (
        <div className="sideBar__container">
            <div className="logo">
                Logo
            </div>
            <div className="navigation">
                <div>
                    <NavLink to="/">Home</NavLink>
                </div>
                <div>
                    <NavLink to="/search">Search</NavLink>
                </div>
                <div>
                    <NavLink to="/mylibrary">My Library</NavLink>
                </div>
                <div>
                    <button onClick={handleCreate}>Create Playlist</button>
                </div>
                <div>
                    <NavLink to="/likedplaylists">
                        Liked Playlists
                    </NavLink>
                </div>

            </div>
            <div className="playlistList">
                {playlists.map(playlist => (
                    <div key={playlist.id}>
                        <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SideBar
