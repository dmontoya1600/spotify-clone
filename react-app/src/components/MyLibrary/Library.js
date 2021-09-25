import React, { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as picActions from '../../store/uploadPic'
import {loadUser} from '../../store/userPage'
import './MyLibrary.css';
import EditForm from './EditProfile';
import {loadPlaylists} from '../../store/userPage'
import { formContext } from './Context';

// WITHOUT USE PARAMS, WE'RE GOING TO NEED TO ACCESS THE USER_ID A DIFFERENT WAY
// MAYBE WE CAN POSSIBLY PASS USER ID THROUGH CHILDREN OR CONTEXT
function Library() {
  const [user, setUser] = useState({});
  const currentUser = useSelector(state => state.session.user)
  const userPlaylists = useSelector(state => state.pageUser.playlists)
  const [activeForm, setActiveForm] = useContext(formContext)
  const userId = 1
  let [editProfilePicId, setEditProfilePicId] = useState(null)
  const dispatch = useDispatch();
  const pageUser = useSelector(state => state.pageUser)


useEffect(() => {

    dispatch(loadPlaylists(currentUser.id))
}, [activeForm])

function handleIconClick(){
  document.getElementById('file').click()
}


  return (
    <div className='all__playlists'>
        {userPlaylists?.map(playlist => (
          <NavLink to={`/playlists/${playlist.id}`}>
            <div className='individual__playlist' key={playlist.id}>
                <img className='individual__playlist__image' src={playlist.img.length > 10 ? playlist.img: 'https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg'}/>
                <div className='individual__playlist__name'>{playlist.name}</div>
                <div className='individual__playlist__creator'>By {playlist.username}</div>
            </div>
          </NavLink>
        ))}
    </div>
  );
}
export default Library;
