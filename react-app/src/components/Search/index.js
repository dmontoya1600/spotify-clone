import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Search = () => {
    const token = useSelector(state => state.access.access_token)


    useEffect(()=> {
        if (token) {
            fetchSearch(token)

        }
    }, [token])

    async function fetchSearch(token, name) {
        const res = await fetch(`https://api.spotify.com/v1/search?q=${"future"}&type=track,album,artist`, {
            method: "GET",
            headers: { "Authorization" : "Bearer " + token}
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div className="Search__container">
        </div>
    )
}

export default Search
