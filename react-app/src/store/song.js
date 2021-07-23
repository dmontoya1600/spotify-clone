const ADD_SONG = 'add/song'

const addSong = (payload) => ({
    type: ADD_SONG,
    payload
})

export const addSongThunk = (obj) => async (dispatch) => {
    const res = await fetch('/api/song/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
    const data = await res.json()
    // dispatch(addSong(data))
    // return data
  }

  export default function reducer(state = {}, action) {
      switch (action.type) {
        //   case ADD_SONG:
        //       return {access_token: action.token}
          default:
              return state;
      }
  }
