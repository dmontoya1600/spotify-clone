import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as picActions from '../../store/uploadPic'
import {loadUser} from '../../store/userPage'
import { loadLikedPlaylists } from '../../store/playlist';
import './MyLibrary.css';
import {formContext} from './Context'

let doCount = 1
// WITHOUT USE PARAMS, WE'RE GOING TO NEED TO ACCESS THE USER_ID A DIFFERENT WAY
// MAYBE WE CAN POSSIBLY PASS USER ID THROUGH CHILDREN OR CONTEXT
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
    console.log('COUNT:', doCount)
    doCount++
  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);
  //
  try {
      data = context.getImageData(0, 0, width, height);
  } catch(e) {
      // /* security error, img on diff domain */alert('x');
      return defaultRGB;
  }
  length = data.data.length;
  while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);

  return rgb;

  }

function MyProfile() {
  const [user, setUser] = useState({});
  const currentUser = useSelector(state => state.session.user)
  const userId = 1
  let [editProfilePicId, setEditProfilePicId] = useState(null)
  const dispatch = useDispatch();
  const pageUser = useSelector(state => state.pageUser)
  let [ activeForm, setActiveForm ] = useContext(formContext)
  let [backgroundColor, setBackgroundColor] = useState('rgb(0, 0, 0)')

  useEffect(() => {
      (async () => {
        await dispatch(loadUser(currentUser.id))
        await dispatch(picActions.loadPic(currentUser.id))
      dispatch(loadLikedPlaylists(currentUser.id))


        // let baseImage = getBase64Image(document.getElementById('i'));
        console.log('FIRST TRIGGER', document.getElementById('i'))
        console.log('THIS IS THE RGB', getAverageRGB(document.getElementById('i')))
      })();
  }, [activeForm])

  async function uploadFile(e) {
    await dispatch(picActions.uploadPic(e.target.files[0], currentUser.id))
}

useEffect( async () => {
  console.log('SECOND TRIGGER')
  await fetch(currentUser.user_image)
  let rgbObj = JSON.parse(JSON.stringify(getAverageRGB(document.getElementById('i'))))
  console.log(`THIS IS THE RGB${currentUser.user_image}`, rgbObj)

  if(rgbObj.r !== 0 && rgbObj.g !== 0){
    let r = rgbObj.r
    let g = rgbObj.g
    let b = rgbObj.b
    console.log(`rgb(${r}, ${g}, ${b})`)

    setBackgroundColor(`rgb(${r}, ${g}, ${b})`)
    console.log('THIS IS BACKGROUND COLOR', backgroundColor, rgbObj)
  }
}, [pageUser])



function handleIconClick(){
  document.getElementById('file').click()
}
  if (!currentUser) {
    return null;
  }

  return (
    <div style={{backgroundImage: `linear-gradient(${backgroundColor}, black)`}} className='profile_banner'>
      <img id='i' hidden crossOrigin='test' src={currentUser.user_image} />
        <div className='profile_icon' onClick={(e) => {handleIconClick(e)} }>
            {currentUser.user_image ? <img className='profile_image' src={currentUser.user_image}/> : <img className='profile_image' src={'https://community.e-spirit.com/images/jive-profile-default-portrait.png'}/>}
            <div className='overlay'>
              <img className='overlay_image' src='https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png'/>
            </div>
            <input id='file' type='file' hidden placeholder='Update Picture' onChange={uploadFile}/>
        </div>
        <div className='profile_name' onClick={(e) => setActiveForm(true)}>{currentUser.username}</div>
    </div>
  );
}
export default MyProfile;
