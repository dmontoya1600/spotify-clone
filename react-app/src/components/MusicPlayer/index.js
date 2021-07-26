import React from 'react';
import {useSelector} from "react-redux";

const MusicPlayer = () => {

  const {currentSong} = useSelector(state => state.currentSong)
  const user = useSelector(state => state.session.user)

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
