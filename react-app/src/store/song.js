const GET_SONGS = 'get/songs'
const ADD_SONG = 'add/song'
const DEL_SONG = 'del/song'

const getSongs = (payload) => ({
  type: GET_SONGS,
  payload
})

const addSong = (payload) => ({
    type: ADD_SONG,
    payload
})
const delSong = (payload) => ({
    type: DEL_SONG,
    payload
})


export const getSongsThunk = (playlistId) => async (dispatch) => {
  let res = await fetch("/api/playlist-songs/", {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({playlistId})
  })
  if (res.ok) {
    let songs = await res.json()
    dispatch(getSongs(songs))
    return songs
  }
}

export const addSongThunk = (obj) => async (dispatch) => {
    const res = await fetch('/api/song/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
    if (res.ok) {
      const data = await res.json()
      dispatch(addSong(data))
      return data
    }
  }
export const delSongThunk = (obj) => async (dispatch) => {
    const res = await fetch('/api/song/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
    if (res.ok) {
      const data = await res.json()
      dispatch(delSong(data))
      return data
    }
  }

  export default function reducer(state = {}, action) {
      let newState = {}
      switch (action.type) {
          case GET_SONGS:
            action.payload.songs.forEach(song => {
              state[song.id] = song
            });
            return state
          case ADD_SONG:
              newState = {...state, [action.payload.id] : action.payload }
              return newState
          case DEL_SONG:
              newState = {...state}
              delete newState[action.payload.id]
              return newState
          default:
              return state;
      }
  }
