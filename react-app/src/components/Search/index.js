import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./Search.css"
import Song from '../Song';

const Search = () => {
    const token = useSelector(state => state.access.access_token)
    const searchRes = useSelector(state => state.searchRes.tracks)
    console.log("SEARCH: ", searchRes)


    return (
        <div className="Search__container">
            <div className="search__title">
                {searchRes && <h2>Search Results</h2>}
            </div>
            <div className="Search__songsContainer">
                {searchRes?.items?.map(track => (
                   <Song key={track.id} track={track}/>
                ))}
            </div>
        </div>
    )
}

export default Search
