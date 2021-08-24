# Audify

Audify is an application that utilizes the Spotify-API to stream music and uses full-stack technology to allow for playlist creations where a user can store songs they like. Inspired by Spotify, the application uses React and Redux to provide the single-page-application experience and Flask in the backend to interact with the PostgreSQL Database.

Visit and listen at https://audify-app.herokuapp.com/

## Features
* Encrypted Sign up/in with proper error handling
* View all songs available in Spotify by using the Spotify API
* Stream Spotfiy music by utilizing music player iFrame and fetching track audio from Spotify API
* User personlization through the creation of MyLibrary component which holds all user generated playlists as well as grabbing the average RGB value of the user profile picture and setting that RGB as the background for the page
* Continious track play through the use of React top-level placement to prevent re-rendering
* Users can save other user playlists by liking them
