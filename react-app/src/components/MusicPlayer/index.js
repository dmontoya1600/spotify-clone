import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MusicPlayer.css"
import SpotifyPlayer from 'react-spotify-web-playback';


const MusicPlayer = () => {


    return (
        <div className="MusicPlayer__container">
        <SpotifyPlayer
        token="BQBPEUAIgm_BfdgoZH9pBfq1NYw9ZDzaf2Jy09fwgN4fihEGX4Qc_3UdNfTzJpua5rvtMJ2jQfw_H4S4SNPb4OuTMmR00nQtOYtVRo7quHhd479ykawam5VSOnn0aXpRSNrwAHTQBHEkAf2YguoYAIbH-0I_nkYwJER3rriHvn0CA1K1-6A-knonnTAHsroo4Qvu2lZI5vScUM175w"
        uris={['spotify:track:4iJyoBOLtHqaGxP12qzhQI']}
        styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
            width: "100%",
          }}
        />
        </div>
    )
}

export default MusicPlayer
