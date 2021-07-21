const ADD_PLAYLIST = 'ADD_PLAYLIST';
const LOAD_PLAYLIST = 'GET_PLAYLIST';
const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';

const addPlaylist = (playlist) => {
  return {
    type: ADD_PLAYLIST,
    playlist
  };
}

const loadPlaylists = (playlists) => {
    return {
      type: LOAD_PLAYLIST,
      playlists
    };
}

const removePlaylist = (playlistId) => {
    return {
      type: REMOVE_PLAYLIST,
      playlistId
    };
}

export const getPlaylists = () => async(dispatch) =>{
    const response = await fetch('/api/playlists/');

    if(response.ok){
        const playlist = await response.json();
        dispatch(loadPlaylists(playlist));
        return response
    }
}

export const getOnePlaylist = (playlistId) => async(dispatch) =>{
    console.log(
        "Into the thunk: ",
        playlistId)
        let id = parseInt(playlistId);
    const response = await fetch(`/api/playlists/${id}`)
        console.log("GOT THUNKED")
    if(response.ok){
        console.log(response)
        const data = await response.json();
        dispatch(loadPlaylists(data));
        return response;
    }

}

export const makePlaylist = (playlist) => async(dispatch) =>{
    console.log("Enter the thunk")
    const {playlist_name, playlist_image_url, user_id} = playlist;
    const response = await fetch(`/api/playlists/`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({playlist_name, playlist_image_url, user_id})
    });
    console.log("Exit Thunk")

    if(response.ok){
        const data = await response.json();
        dispatch(addPlaylist(data));
        return data;
    }
}

export const editOnePlaylist = (editedPlaylist) => async(dispatch) =>{
    const response = await fetch(`/api/playlists/${editedPlaylist.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(editedPlaylist)
    });

    if(response.ok){
        const data = await response.json();
        dispatch(addPlaylist(data));
        return data;
    }
}

export const deletePlaylist = (playlistId) => async(dispatch) =>{
    let thisId = parseInt(playlistId);
    const response = await fetch(`/api/playlists/${thisId}`,{
        method: 'DELETE'});
    if(response.ok){
        const playlist = await response.json();
        dispatch(removePlaylist(playlistId));
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
            console.log("Hello there: ", action.playlists)
            const allPlaylists = {}
            action.playlists.playlists.forEach(playlist => {
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
                return newState
            }
            default:
                return state;
        }
    }

export default playlistReducer;
