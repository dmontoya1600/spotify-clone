import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MusicPlayer.css"
import SpotifyPlayer from 'react-spotify-player';


const MusicPlayer = ({trackId}) => {

    const size = {
        width: '100%',
        height: 300,
      };

    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

    return (
        <div className="MusicPlayer__container">
            <SpotifyPlayer
            uri={`spotify:track:${trackId}`}
            size={size}
            view={view}
            theme={theme}
            />
        </div>
    )
}

export default MusicPlayer
