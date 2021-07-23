import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as picActions from '../../store/uploadPic'
import MyProfile from './MyProfile'
import Library from './Library';
import EditForm from './EditProfile';
import {formContext} from './Context'



function MyLibrary() {
  let [activeForm, setActiveForm] = useState(false)
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


  if (!user) {
    return null;
  }

  return (
    <div className='page'>
        <formContext.Provider value={[activeForm, setActiveForm]}>
            <MyProfile />
            {activeForm ? <EditForm /> : null}

            <Library />
        </formContext.Provider>
    </div>
  );
}
export default MyLibrary;
