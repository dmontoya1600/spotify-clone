const SET_ACCESS_TOKEN = 'api/SET_ACCESS_TOKEN'

const setToken = (token) => ({
    type: SET_ACCESS_TOKEN,
    token
})

export const getToken = () => async (dispatch) => {
    console.log('this is the env var', process.env.CLIENT_ID )
    console.log('Basic ' + btoa('3b064be5e1e04116a6e7cc2045936601' + ':' + 'a3ccce441963430693b5679de78469ad'))
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('3b064be5e1e04116a6e7cc2045936601' + ':' + 'a3ccce441963430693b5679de78469ad'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials',
    })
    const res = await response.json()
    console.log('THIS IS THE ACCESS TOKEN', res)
    dispatch(setToken(res.access_token))
    return res
  }

  export default function reducer(state = {}, action) {
      switch (action.type) {
          case SET_ACCESS_TOKEN:
              return {access_token: action.token}
          default:
              return state;
      }
  }
