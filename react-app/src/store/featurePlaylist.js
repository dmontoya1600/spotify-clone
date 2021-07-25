const SET_FEATURE = 'set/featurePlaylist'

export const setFeaturePlaylist = (payload) => ({
    type: SET_FEATURE,
    payload
})

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_FEATURE:
            return {...state, ...action.payload.playlists?.items}
        default:
            return state;
    }
}
