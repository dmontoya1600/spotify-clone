const SET_SEARCH = 'set/search'

export const setSearch = (payload) => ({
    type: SET_SEARCH,
    payload
})

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_SEARCH:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
