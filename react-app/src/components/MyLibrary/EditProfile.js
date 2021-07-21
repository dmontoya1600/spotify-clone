import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as picActions from '../../store/uploadPic'
import MyProfile from './MyProfile'


function EditForm({setActiveForm}) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)


    async function uploadFile(e) {
        await dispatch(picActions.uploadPic(e.target.files[0], currentUser.id))
    }


    return (
        <form className='edit_form'>
            <input  type='file' placeholder='Update Picture' onChange={uploadFile}/>
        </form>
    )
}
export default EditForm;
