import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as picActions from '../../store/uploadPic'
import { updateUser, deleteUser } from '../../store/userPage';
import {formContext} from './Context'

import './MyLibrary.css';


function EditForm() {
    const [activeForm, setActiveForm] = useContext(formContext)
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    let stateUser= useSelector(state => state.session.user.username)
    let stateEmail = useSelector(state => state.session.user.email)
    let [username, setUsername] = useState(stateUser)
    let [email, setEmail] = useState(stateEmail)




    async function uploadFile(e) {
        await dispatch(picActions.uploadPic(e.target.files[0], currentUser.id))
    }

    async function handleDelete() {
        history.push('/')
        await dispatch(deleteUser(currentUser.id))
    }
    async function handleSubmit() {
        let form = {
            username: username,
            email: email,
            id : currentUser.id
        }
        await dispatch(updateUser(form))
        setActiveForm(false)
    }

    function handleClose() {
        setActiveForm(false)
    }
    return (
        <div className='popup-background'>
            <div className='edit_form'>
            <div className='exit' onClick={handleClose}>X</div>
                <label>Username
                    <input type='text' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                </label>
                <label>Email
                    <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </label>
                <button className='submit' onClick={handleSubmit}>Update</button>
                <button className='delete' onClick={handleDelete}>Delete User</button>
            </div>
        </div>
    )
}
export default EditForm;
