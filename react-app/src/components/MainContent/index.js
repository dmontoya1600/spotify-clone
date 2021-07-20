import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyLibrary from "../MyLibrary"
import Search from '../Search';
import HomePage from '../HomePage';
import "./MainContent.css"


const MainContent = () => {
    const [activeComp, setActiveComp] = useState("HomePage")

    // useEffect(() => {

    // }, [activeComp])

    if (activeComp === "MyLibrary") {
        return (
            <div className="MainContent__container">
                <MyLibrary />
            </div>
        )
    } else if (activeComp === "HomePage") {
        return (
            <div className="MainContent__container">
                <HomePage />
            </div>
        )

    } else if (activeComp === "Search") {
        return (
            <div className="MainContent__container">
                <Search />
            </div>
        )

    } else if (activeComp === "IndPlaylist") {
        return (
            <div className="MainContent__container">
                {}
            </div>
        )

    } else if (activeComp === "LikedPlaylists") {
        return (
            <div className="MainContent__container">
                {}
            </div>
        )

    }

}

export default MainContent
