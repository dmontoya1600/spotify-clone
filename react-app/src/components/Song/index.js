import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import {BsPlayFill} from "react-icons/bs";

import "./Song.css"

export default function Song({ track }) {
    let duration = "";
    console.log(track)
    // useEffect(()=>{
    //     if (track) {
    //         duration = formatMillis(track)
    //     }
    // }, [])

    const currentSong = useSelector(state => state.currentSong);
    const dispatch = useDispatch();


    function formatMillis(millis) {
        var mins = Math.floor(millis / 60000);
        var secs = ((millis % 60000) / 1000).toFixed(0);
        return mins + ":" + (secs < 10 ? '0' : '') + secs;
      }

    return (
        <div className="song__container">
            <div className="song__imageDiv">
                <img src={track.album.images[0].url} className="song__image"/>
                <div className="playButton">Play</div>
            </div>
            <div className="song__text">
                <h4>{track.name}</h4>
                <p>{track.album.name}</p>
            </div>
            <div className="song__duration">{track.duration_ms && formatMillis(track.duration_ms)}</div>
        </div>
    )
}
