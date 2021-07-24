import React from 'react';
import {useSelector} from "react-redux";
import "./MusicPlayer.css";
import SpotifyPlayer from 'react-spotify-player';


const MusicPlayer = () => {

    const {currentSong} = useSelector(state => state.currentSong)
    
    const size = {
    width: '100%',
    height: 300,
};
  
  const view = 'coverart';
  const theme = 'black';

  if (currentSong) {
      return (<div className="MusicPlayer__container">
  <iframe src={`https://open.spotify.com/embed/${currentSong}`} view="list" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  </div>
  )} else {
    // return <div className="MusicPlayer__container"></div>
    return <div className="MusicPlayer__container">
      </div>
  }
}

export default MusicPlayer
