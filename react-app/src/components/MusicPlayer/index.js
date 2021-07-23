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
      <SpotifyPlayer
      uri={`spotify:track:${currentSong}`}
      size={size}
      view={view}
      theme={theme}
      /> 
  </div>
  )}

  return (
    <div className="MusicPlayer__container">
    <SpotifyPlayer
    uri={`spotify:track:60ynsPSSKe6O3sfwRnIBRf`}
    size={size}
    view={view}
    theme={theme}
    />
    </div>
  )
}

export default MusicPlayer
