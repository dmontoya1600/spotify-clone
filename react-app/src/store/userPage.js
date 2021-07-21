import {SET_PIC} from './uploadPic'

export const LOAD_USER ='pageUser/load'

const load = (user) => {
    return {
        type: LOAD_USER,
        user
    }
}

export const loadUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/load/${userId}`)
    const data = await response.json()
    dispatch(load(data));
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_USER:
            return { page_user: action.user }
        case SET_PIC:
            return {
                page_user: {...state.page_user, user_image: action.payload}
            }
        default:
            return state;
    }

}
