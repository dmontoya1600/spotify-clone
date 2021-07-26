import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import "./MusicPlayer.css";


const MusicPlayer = () => {

  const {currentSong} = useSelector(state => state.currentSong)
  const user = useSelector(state => state.session.user)
  useEffect(() => {
    console.log('THIS IS THE CURRENT SONG', currentSong)
  })

  if (currentSong && user) {
      return (<div className="MusicPlayer__container">
  <iframe src={`https://open.spotify.com/embed/${currentSong}`} width="100%" height="80px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  </div>
  )} else {
    return <div className="MusicPlayer__container">
      </div>
  }
}

export default MusicPlayer
