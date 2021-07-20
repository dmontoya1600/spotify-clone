import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from "../SideBar"
import MainContent from '../MainContent';
import MusicPlayer from '../MusicPlayer';
import Navigation from '../Navigation';
import "./Main.css"


const Main = () => {


    return (
        <div className="Main__container">
            <Navigation />
            <SideBar />
            <MusicPlayer />
            <MainContent />
        </div>
    )
}

export default Main
