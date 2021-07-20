import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Playlist.css"


export default function Playlist() {
    return (
        <div className="playlist__mainContainer">
            <div className="playlist__container">
                <img alt="You'll never know" src="https://upload.wikimedia.org/wikipedia/commons/b/b8/FEQ_July_2018_The_Weeknd_%2844778856382%29_%28cropped%29.jpg" className="playlist__image" />
                <button className="playlist__button"><div className="playlist__buttonImg"></div></button>
                <h4 className="playlist__h3">Starboy</h4>
                <p className="playlist__p">Save Your Tears, Blinding Lights, I Feel it Coming</p>
            </div>
        </div>
    )
}
