import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import "./Song.css"

export default function Song({ track }) {
    const dispatch = useDispatch();
    const [showAddSong, setShowAddSong] = useState(false)


    function formatMillis(millis) {
        var mins = Math.floor(millis / 60000);
        var secs = ((millis % 60000) / 1000).toFixed(0);
        return mins + ":" + (secs < 10 ? '0' : '') + secs;
      }



    return (
        <div className="song__container">
            <button className="song__playBtn"><div className="song__playbtnImage"></div></button>
            <div className="song__imageDiv">
                <img src={track.album.images[0].url} className="song__image"/>
            </div>
            <div className="song__text">
                <h4>{track.name}</h4>
                <p>{track.album.name}</p>
            </div>
            <div className="song__durationDiv">
                <div className="song__duration">{track.duration_ms && formatMillis(track.duration_ms)}</div>
                <button className="song__addBtn"><div className="song__btnImage"></div></button>
            </div>
            <div className="song_addForm">
                <button>Add to Playlist</button>
                <form>

                </form>
                <form>
                    <button onClick={()=> "Hi" }>Create Playlist</button>
                </form>
            </div>
        </div>
    )
}
