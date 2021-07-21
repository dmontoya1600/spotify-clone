import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from "../SideBar"
import MainContent from '../MainContent';
import MusicPlayer from '../MusicPlayer';
import "./Main.css"

import NavBar from '../NavBar/NavBar';

const Main = () => {

    return (
        <div className="Main__container">
            <NavBar />
            <SideBar />
            <MusicPlayer />
            <MainContent />
        </div>
    )
}

export default Main
