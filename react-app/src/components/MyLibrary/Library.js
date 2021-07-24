import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
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
  console.log(' USER PLAYLISTS', userPlaylists)



useEffect(() => {
  if (!user || !currentUser) {
    return (
    <Redirect to="/"/>
    )
  }
    dispatch(loadPlaylists(currentUser.id))
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
export default Library;
