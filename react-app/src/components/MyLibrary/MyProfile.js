import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as picActions from '../../store/uploadPic'
import {loadUser} from '../../store/userPage'
import './MyLibrary.css';
import EditForm from './EditProfile';

// WITHOUT USE PARAMS, WE'RE GOING TO NEED TO ACCESS THE USER_ID A DIFFERENT WAY
// MAYBE WE CAN POSSIBLY PASS USER ID THROUGH CHILDREN OR CONTEXT
function MyProfile() {
  const [user, setUser] = useState({});
  const currentUser = useSelector(state => state.session.user)
  const userId = 1
  let [editProfilePicId, setEditProfilePicId] = useState(null)
  const dispatch = useDispatch();
  const pageUser = useSelector(state => state.pageUser.page_user)
  let [activeForm, setActiveForm] = useState(false)


  useEffect(() => {
      (async () => {
        await dispatch(loadUser(currentUser.id))
        await dispatch(picActions.loadPic(currentUser.id))

      })();
  }, [])

  async function uploadFile(e) {
    await dispatch(picActions.uploadPic(e.target.files[0], currentUser.id))
}

function handleIconClick(){
  document.getElementById('file').click()
}
  if (!user) {
    return null;
  }

  return (
    <div className='profile_banner'>
      {activeForm ? <EditForm setActiveForm={setActiveForm} /> : null}
        <div className='profile_icon' onClick={handleIconClick}>
            {currentUser.user_image ? <img className='profile_image' src={currentUser.user_image}/> : <img className='profile_image' src={'https://community.e-spirit.com/images/jive-profile-default-portrait.png'}/>}
            <div className='overlay'>
              <img className='overlay_image' src='https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png'/>
            </div>
            <input id='file' type='file' hidden placeholder='Update Picture' onChange={uploadFile}/>
        </div>
        <div className='profile_name'>{currentUser.username}</div>
    </div>
  );
}
export default MyProfile;
