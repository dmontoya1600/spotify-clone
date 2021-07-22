import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MusicPlayer.css"
import SpotifyPlayer from 'react-spotify-web-playback';


const MusicPlayer = ({songId}) => {


    return (
        <div className="MusicPlayer__container">
        <SpotifyPlayer
        token="BQBUtCpx69YfYGJbxHf7S0h-CD1tawB8-cNVp_zZEV4K8P4EQj-pliPIW9zTtVy6iMyGzFPMZsTaGCowhO7Icfz-LfV56V62y6nNRGRLQSsQtbj_A1Kw0NsgrKiJaieVA564bvenY_TjPX_5mBmwJSO4-qLnYENMzFdNMyy-Z_LCc-3JBjft0UY4IJIa6z3lop4KuT5yY6bRbssLzg"
        uris={[`spotify:track:${songId}`]}
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
