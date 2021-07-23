const ADD_PLAYLIST = 'ADD_PLAYLIST';
const LOAD_PLAYLIST = 'GET_PLAYLIST';
const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
const ONE_PLAYLIST = 'ONE_PLAYLIST';


const loadPlaylists = (playlists) => {
    return {
      type: LOAD_PLAYLIST,
      playlists
    };
}

const loadOnePlaylist = (playlist) => {
    return {
      type: ONE_PLAYLIST,
      playlist
    };
}

const removePlaylist = (playlistId) => {
    return {
      type: REMOVE_PLAYLIST,
      playlistId
    };
}


export const getPlaylists = (userId) => async(dispatch) =>{
    const response = await fetch('/api/playlists/');

    if(response.ok){
        if(userId === undefined){
            const playlist = await response.json();
            dispatch(loadPlaylists(playlist));
            return response
        } else {
            const playlist = await response.json();


            const userPlaylists = []
            const filteredPlaylists = {"playlists" : userPlaylists}
            playlist.playlists.forEach(playlist => {
                if(playlist.user === userId){
                    userPlaylists.push(playlist)
                }
            })
            dispatch(loadPlaylists(filteredPlaylists));
            return response
        }
    }
}

export const getOnePlaylist = (playlistId) => async(dispatch) =>{
        let id = parseInt(playlistId);
    const response = await fetch(`/api/playlists/${id}`)
    if(response.ok){
        const data = await response.json();
        dispatch(loadOnePlaylist(data));
        return response;
    }

}

export const makePlaylist = (userId, playlist) => async(dispatch) =>{
    const {playlist_name, playlist_image_url, user_id} = playlist;
    const response = await fetch(`/api/playlists/`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({playlist_name, playlist_image_url, user_id})
    });

    if(response.ok){
        const playlist = await response.json();
        dispatch(getPlaylists(userId));
        return playlist;
        
    }
}

export const editOnePlaylist = (userId, editedPlaylist) => async(dispatch) =>{
    const {id, img, name, user} = editedPlaylist;
    const playlist = {playlist_id:id,playlist_name:name, playlist_image_url:img, user_id:user}

    const response = await fetch(`/api/playlists/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify( {playlist_id:id,playlist_name:name, playlist_image_url:img, user_id:user})
    });

    if(response.ok){

        const playlist = await response.json();
        const userPlaylists = []
        const filteredPlaylists = {"playlists" : userPlaylists}
        playlist.playlists.forEach(playlist => {
            if(playlist.user === userId){
                userPlaylists.push(playlist)
            }
        })
        dispatch(loadPlaylists(filteredPlaylists));
        return response
    }
}

export const deletePlaylist = (userId, playlistId) => async(dispatch) =>{

    let thisId = parseInt(playlistId);
    const response = await fetch(`/api/playlists/${thisId}`,{
        method: 'DELETE'});

    if(response.ok){

        const playlist = await response.json();
        dispatch(getPlaylists(userId));
        return playlist;
    }
}

const initialState = { };

// const sortList = (list) => {
//     return list.sort((a,b) => {
//         return a.id - b.id;
//     }).map(item => {item.id});
// };

const playlistReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_PLAYLIST:{
            const allPlaylists = {}
            action.playlists.playlists.forEach(playlist => {
                allPlaylists[playlist.id] = playlist;
            })
            return {
                ...allPlaylists
            }
        }
        case ONE_PLAYLIST:{
            const allPlaylists = {}
            action.playlist.playlists.forEach(playlist => {
                allPlaylists[playlist.id] = playlist;
            })
            return {

                ...allPlaylists
            }
        }
        case ADD_PLAYLIST:{
            if(!state[action.playlist.id]){
                const newState = {
                    ...state,
                    [action.playlist.id]: action.playlist
                };
                return newState
            }
            return {
                [action.playlist.id]: {
                    ...state[action.playlist.id],
                    ...action.playlist
                }}
            }
            case REMOVE_PLAYLIST: {
                let newState =action.playlists
                return state
            }
            default:
                return state;
        }
    }

export default playlistReducer;
