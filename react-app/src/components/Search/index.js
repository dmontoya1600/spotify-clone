import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Search.css"
import Song from '../Song';
import MusicPlayer from "../MusicPlayer";
import Main from "../Main";
import NavBar from "../NavBar/NavBar"
import SideBar from '../SideBar';

const Search = () => {
    const token = useSelector(state => state.access.access_token)
    const searchRes = useSelector(state => state.searchRes.tracks)

    const [song, setSong] = useState("");
    
    return (
    <div className="Main__container">
        <NavBar/>
        <SideBar/>
        <div className="MainContent__container">      
        <div className="Search__songsContainer">
            {searchRes?.items?.map(track => (
                <Song key={track.id} track={track} />
            ))}
            </div>
        </div>
    <MusicPlayer/>
    </div>
      
    )
}

export default Search
