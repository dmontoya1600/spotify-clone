const SET_CURRENT_SONG = 'session/SET_CURRENT_SONG';

export const setCurrentSong = (id) => ({
    type: SET_CURRENT_SONG,
    payload: id
  });

const initialState = { id: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_SONG:
        return { currentSong: action.payload }
      default:
        return state;
    }
  }
