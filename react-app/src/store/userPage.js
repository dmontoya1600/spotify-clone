import {SET_PIC} from './uploadPic'

export const LOAD_USER ='user/load'
export const UPDATE_USER = 'user/load'
export const DELETE_USER = 'user/delete'

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

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_USER:
            return { page_user: action.user }
        case SET_PIC:
            return {
                page_user: {...state.page_user, user_image: action.payload}
            }
        case UPDATE_USER:
            return { page_user: action.user }
        case DELETE_USER:
            return { page_user: null}
        default:
            return state;
    }

}
