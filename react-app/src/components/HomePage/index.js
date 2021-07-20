import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux"
import Playlist from '../Playlist';
import "./HomePage.css"


const HomePage = () => {
    const accessT = useSelector(state => state.access.access_token)

    return (
        <div className="homePage__container">
            <Playlist />
        </div>
    )
}

export default HomePage
