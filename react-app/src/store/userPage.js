
import {SET_PIC} from './uploadPic'

export const LOAD_USER ='user/load'
export const UPDATE_USER = 'user/load'
export const DELETE_USER = 'user/delete'
export const LOAD_PLAYLISTS = 'user/loadPlaylists'

const destoy = () => {
    return {
        type: DELETE_USER
    }
}

const load = (user) => {
    return {
        type: LOAD_USER,
        user
    }
}

const update = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}

const getPlaylists = (playlists) => {
    return {
        type: LOAD_PLAYLISTS,
        playlists
    }
}

export const loadUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/load/${userId}`)
    const data = await response.json()
    dispatch(load(data));
}

export const deleteUser = (userId) => async (dispatch) => {
    await fetch(`/api/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    dispatch(destoy())
}

export const updateUser = (form) => async (dispatch) => {
    const response = await fetch(`/api/users/update/${form.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    const data = await response.json();
    dispatch(update(data))
    return data;
}

export const loadPlaylists = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/all-playlists/${userId}`)
    const data = await response.json();
    dispatch(getPlaylists(data.playlists))
    return data;
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_USER:
            return action.user
        case SET_PIC:
            return {
                ...state, user_image: action.payload
            }
        case UPDATE_USER:
            return { state: action.user }
        case DELETE_USER:
            return { page_user: null}
        case LOAD_PLAYLISTS:
            return {
               ...state, playlists: action.playlists
            }
        default:
            return state;
    }

}
