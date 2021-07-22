import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect } from 'react-router-dom';
import playlistReducer, {getPlaylists, makePlaylist} from '../../store/playlist'
import "./SideBar.css"
import {AiFillHome} from "react-icons/ai"
import {BsSearch, BsHeartFill} from "react-icons/bs"
import {VscLibrary} from "react-icons/vsc"
import {GoDiffAdded} from "react-icons/go"

const SideBar = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const sessionPlaylists = useSelector(state => state.playlists);

    useEffect(() => {
        dispatch(getPlaylists());
    }, [dispatch]);


    let num = 0;
    const handleCreate = async(e) => {
        e.preventDefault();
        num++
        let newPlaylist = {
            playlist_name : `New Playlist `,
            playlist_image_url: "MOO",
            user_id : sessionUser.id,
        }
        if(newPlaylist){
            newPlaylist = await dispatch(makePlaylist(newPlaylist));
            Redirect(`/mylibrary`);
        }
    }

    let playlists = []
    for(const [key, value] of Object.entries(sessionPlaylists)){
        playlists.push(value)
    }
    console.log("PLAY: ", playlists)

    return (
        <div className="sideBar__container">

            <div className="sideBar__main">

            <div className="sideBar__header">
            <NavLink to="/" className="logo">
                
            </NavLink>
            </div>

            <div className="sideBar__menu">

                   <NavLink to="/" className="menuItem">
                       <div className="icon"><AiFillHome/></div>
                       <div className="menuItemTitle">Home</div>
                   </NavLink>
                    <NavLink to="/search" className="menuItem">
                        <div className="icon"><BsSearch/></div>
                        <div className="menuItemTitle">Search</div>
                    </NavLink>

                    <NavLink to="/mylibrary" className="menuItem">
                        <div className="icon"><VscLibrary/></div>
                        <div className="menuTitle">My Library</div>
                    </NavLink>

                <NavLink to="/playlists/:id" className="menuItem" onClick={handleCreate}>
                <div className="icon"><GoDiffAdded /></div>
                <div className="menuItemTitle">Create Playlist</div>
                </NavLink>

                <NavLink to="/likedplaylists" className="menuItem">
                        <div className="icon"><BsHeartFill/></div>
                        <div className="menuItemTitle">Liked Playlists</div>
                </NavLink>

            </div>

            <div className="playlists__container">
                {playlists.map(playlist => (
                    <div key={playlist.id} className="playlistItem">
                        <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                    </div>
                ))}
            </div>

            </div>

        </div>
    )
}

export default SideBar
