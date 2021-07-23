import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams, Redirect,useHistory } from 'react-router-dom';
import playlistReducer, {getPlaylists, makePlaylist} from '../../store/playlist'
import "./SideBar.css"
import {AiFillHome} from "react-icons/ai"
import {BsSearch, BsHeartFill} from "react-icons/bs"
import {VscLibrary} from "react-icons/vsc"
import {GoDiffAdded} from "react-icons/go"

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const sessionPlaylists = useSelector(state => state.playlists);

    const userId = sessionUser?.id

    useEffect(() => {
        dispatch(getPlaylists( userId));
    }, [sessionUser]);


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
            newPlaylist = await dispatch(makePlaylist(userId, newPlaylist));
        }
        for(const [key, value] of Object.entries(newPlaylist.playlists)){
            playlist=value
        }
        history.push(`/playlists/${parseInt(playlist.id)}`);
    }

    let playlists = []
    let i = 0
    for(const [key, value] of Object.entries(sessionPlaylists)){
        if( i < 10){
            playlists.push(value)
            i++
        }
    }

    let button;
    if(sessionUser){
        button = (
            <NavLink to="/playlists/:id" className="menuItem" activeClassName='activated' onClick={handleCreate}>
                <div className="icon"><GoDiffAdded /></div>
                <div className="menuItemTitle">Create Playlist</div>
                </NavLink>
        )
    }
    return (
        <div className="sideBar__container">

            <div className="sideBar__main">

            <div className="sideBar__header">
            <NavLink to="/" className="logo">

            </NavLink>
            </div>

            <div className="sideBar__menu">

                   <NavLink exact to="/" activeClassName='activated' className="menuItem">
                       <div className="icon"><AiFillHome/></div>
                       <div className="menuItemTitle">Home</div>
                   </NavLink>
                    <NavLink to="/search" activeClassName='activated' className="menuItem">
                        <div className="icon"><BsSearch/></div>
                        <div className="menuItemTitle">Search</div>
                    </NavLink>

                    <NavLink to="/mylibrary" activeClassName='activated' className="menuItem">
                        <div className="icon"><VscLibrary/></div>
                        <div className="menuTitle">My Library</div>
                    </NavLink>

                    <div>
                        {button}
                    </div>

                <NavLink to="/likedplaylists" activeClassName='activated' className="menuItem">
                        <div className="icon"><BsHeartFill/></div>
                        <div className="menuItemTitle">Liked Playlists</div>
                </NavLink>

            </div>

            <div className="playlists__container">
                {playlists.map(playlist => (
                        <div key={playlist.id} className="playlistItem">
                        <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                        </div>
                    )
                )}
            </div>

            </div>

        </div>
    )
}

export default SideBar
