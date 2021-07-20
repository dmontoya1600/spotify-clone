import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux"
import Playlist from '../Playlist';
import "./HomePage.css"


const HomePage = () => {
    const accessToken = useSelector(state => state.access.access_token)
    console.log("testing THE TOKEN", accessToken)
    useEffect(()=> {
        if (accessToken) {
            getFeaturePlay(accessToken)
        }
    }, [accessToken])

    async function getFeaturePlay (token) {

        const res = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
            method: "GET",
            headers: { 'Authorization' : 'Bearer ' + token }
        })
        const data = await res.json()
        console.log("This is the response for feature playlist", data)
    }

    return (
        <div className="homePage__container">
            <Playlist />
        </div>
    )
}

export default HomePage
