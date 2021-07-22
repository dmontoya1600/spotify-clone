import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Search.css"
import Song from '../Song';
import MusicPlayer from "../MusicPlayer";
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
        <div className="Search__container">
            <div className="search__title">
            <h2>Songs</h2>
            </div>
        <div className="Search__songsContainer">
            {searchRes?.items?.map(track => (
                <div onClick={setSong(track.id)}> <Song key={track.id} track={track}/></div>
            ))}
        </div>
    </div>
    </div>
    <MusicPlayer trackId={song}/>
    </div>

    )
}



export default Search
