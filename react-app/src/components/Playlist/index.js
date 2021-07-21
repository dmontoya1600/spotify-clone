import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Playlist.css"


export default function Playlist({feature}) {
    console.log("This IS THE IND PLALIST", feature)
    return (
        <div className="playlist__mainContainer">
            <div className="playlist__container">
                <img alt="You'll never know" src={feature.images[0].url} className="playlist__image" />
                <button className="playlist__button"><div className="playlist__buttonImg"></div></button>
                <h4 className="playlist__h3">{feature.name}</h4>
                <p className="playlist__p">{feature.description}</p>
            </div>
        </div>
    )
}
