import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as picActions from '../../store/uploadPic'
import MyProfile from './MyProfile'


function MyLibrary() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [editProfilePicId, setEditProfilePicId] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

function uploadFile(e) {
    dispatch(picActions.uploadPic(e.target.files[0], userId))
}

  if (!user) {
    return null;
  }

  return (
    <div className='page'>
        <MyProfile />
    </div>
  );
}
export default MyLibrary;
