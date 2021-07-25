import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {loadUser} from '../../store/userPage'
import './MyLibrary.css';
import EditForm from './EditProfile';
import {loadLikedPlaylists} from '../../store/userPage'
import { formContext } from './Context';

// WITHOUT USE PARAMS, WE'RE GOING TO NEED TO ACCESS THE USER_ID A DIFFERENT WAY
// MAYBE WE CAN POSSIBLY PASS USER ID THROUGH CHILDREN OR CONTEXT
function likedPlaylists() {
const currentUser = useSelector(state => state.session.user)
const dispatth = useDispatch()



useEffect(() => {

    dispatch(loadLikedPlaylists(currentUser.id))
}, [activeForm])

function handleIconClick(){
  document.getElementById('file').click()
}


  return (
    <div className='all__playlists'>
        {userPlaylists?.map(ele => (
            <div className='individual__playlist' key={ele.id}>
                <img className='individual__playlist__image' src={ele.img.length > 10 ? ele.img: 'https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg'}/>
                <div className='individual__playlist__name'>{ele.name}</div>
                <div className='individual__playlist__creator'>By {ele.username}</div>
            </div>
        ))}
    </div>
  );
}
export default likedPlaylists;
