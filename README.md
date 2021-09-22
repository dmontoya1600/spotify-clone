# Audify

Audify is an application that utilizes the Spotify-API to stream music and uses full-stack technology to allow for playlist creations where a user can store songs they like. Inspired by Spotify, the application uses React and Redux to provide the single-page-application experience and Flask in the backend to interact with the PostgreSQL Database.

Visit and listen at https://audify-app.herokuapp.com/

### Home View:

![homeview]

### Login View:

![loginview]

## Features
* Encrypted Sign up/in with proper error handling
* View all songs available in Spotify by using the Spotify API
* Stream Spotfiy music by utilizing music player iFrame and fetching track audio from Spotify API
* User personlization through the creation of MyLibrary component which holds all user generated playlists as well as grabbing the average RGB value of the user profile picture and setting that RGB as the background for the page
* Continious track play through the use of React top-level placement to prevent re-rendering
* Users can save other user playlists by liking them

### Technical Details:
* Audify gives the user a personalized experience by using the user's profile picture to choose the color of the user's "My Library" background. This was done by getting the average RGB of the image by converting the image to a canvas element. The problem with that is that we're using AWS to fetch the image meaning that we have a CORS issue. We fixed the problem by going into AWS and making modification to the CORS policy as well as attaching a cross-origin attribute on the element.

```
function getAverageRGB(imgEl) {

  var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      count = 0;
    if (!imgEl){
      return defaultRGB
    }
    doCount++
  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);
  //
  try {
      data = context.getImageData(0, 0, width, height);
  } catch(e) {
      return defaultRGB;
  }
  length = data.data.length;
  while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
  }

  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);

  return rgb;

  }
  
```

[loginview]: ./docs/images/loginpage.png
[homeview]: ./docs/images/homeview.png
