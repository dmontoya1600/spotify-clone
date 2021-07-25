import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadLikedPlaylists } from '../../store/playlist';
import { loadUser } from '../../store/userPage';
import "./LikedPlaylists.css"

const LikedPlaylists = () => {
const liked_playlists = useSelector(state => state.playlists.liked_playlists)
const currentUser = useSelector(state => state.session.user)
const dispatch = useDispatch()
const history = useHistory()

useEffect(async () => {
    await dispatch(loadLikedPlaylists(currentUser.id))
}, [])
function handleClick(id) {
    history.push(`/playlists/${id}`)
}
    return (
        <div className="page">
            <div className='pageText'>Liked Playlists</div>
            <div className='all__playlists'>
                {liked_playlists?.map(playlist => (
                    <div className='individual__playlist' onClick={() => handleClick(playlist.id)} key={playlist.id}>
                        <img className='individual__playlist__image' src={playlist.img.length > 10 ? playlist.img: 'https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg'}/>
                        <div className='individual__playlist__name'>{playlist.name}</div>
                        <div className='individual__playlist__creator'>By {playlist.owner}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LikedPlaylists
