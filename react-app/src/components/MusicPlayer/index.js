import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MusicPlayer.css";
import SpotifyPlayer from 'react-spotify-player';


const MusicPlayer = () => {
    
    const size = {
    width: '100%',
    height: 300,
  };
  
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'
   
    return (
        <div className="MusicPlayer__container">
            <SpotifyPlayer
            uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
            size={size}
            view={view}
            theme={theme}
            />
        </div>
    )
}

export default MusicPlayer
