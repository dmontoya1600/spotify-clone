import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import Playlist from '../Playlist';
import { setFeaturePlaylist } from '../../store/featurePlaylist';
import "./HomePage.css"


const HomePage = () => {
    const accessToken = useSelector(state => state.access.access_token)
    const dispatch = useDispatch()
    const featurePlaylists = useSelector(state => Object.values(state.featurePlaylists))


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
        dispatch(setFeaturePlaylist(data))

        // console.log(data.playlists.items)
    }
    const testingInfo = {
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/b/b8/FEQ_July_2018_The_Weeknd_%2844778856382%29_%28cropped%29.jpg",
        name: "Starboy",
        songs: "Save Your Tears, Blinding Lights, I feel it coming"
    }


    return (
        <div className="homePage__container">
            <div className="homePage__h2"><h2>Featured Playlist</h2></div>
            <div className="homePage__fPlaylistContainer">
                {featurePlaylists?.map(list => (
                <Playlist key={list.id} feature={list} />
                ))}
            </div>

        </div>
    )
}

export default HomePage
