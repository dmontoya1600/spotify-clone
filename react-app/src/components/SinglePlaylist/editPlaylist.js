import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams} from 'react-router-dom';
import playlistReducer, { getOnePlaylist, editOnePlaylist, deletePlaylist } from '../../store/playlist';


export const EditPlaylist = ({ playlistId, hideForm }) => {
    let data = useParams()
    let id = data.playlistId
    let history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const sessionPlaylists = useSelector(state => state.playlists);


    let playlist;
    if(sessionPlaylists && sessionPlaylists[id]) playlist = sessionPlaylists[id];

    useEffect(() => {
        // dispatch(getPlaylist(id))
    }, [dispatch, id])

    const [playlistName, setPlaylistName] = useState('');
    const [playlistImg, setPlaylistImg] = useState('');
    const [reload, setReload] = useState(false);


    const handleSubmit = async  (e) => {
        e.preventDefault();
        let playName;
        let playImg;

        if(playlistImg === ''){
            playImg = playlist.img
        } else {
            playImg = playlistImg
        }
        if(playlistName === ''){
            playName = playlist.name
        } else {
            playName = playlistName
        }

        let updatedPlaylist = {
            ...playlist,
            name : playName,
            img : playImg,
        }



        if(updatedPlaylist){
            updatedPlaylist = await dispatch(editOnePlaylist(userId, updatedPlaylist));
            hideForm();
        }
    }



    const handleCancel = (e) => {
        e.preventDefault();
        hideForm();
    }

    const handleDelete =  async (e) => {
        e.preventDefault();
        data = await dispatch(deletePlaylist(userId, id))
        history.push(`/`)
    }


    return (

        <div>
            <form id="editPlaylistForm"onSubmit={handleSubmit}>
            <div className='exit' onClick={handleCancel}>X</div>
                <input className="editFormNameInput"
                    type="text"
                    required
                    value={playlistName}
                    placeholder="Add Playlist Name"
                    onChange={(e)=>setPlaylistName(e.target.value)}
                />
                <input className="editFormImgInput"
                type="text"
                    value={playlistImg}
                    placeholder="Choose Photo URL"
                    onChange={(e)=>setPlaylistImg(e.target.value)}
                />
                <button className="submit" >update</button>
                <button className="delete" onClick={handleDelete} >Delete Playlist</button>
            </form>
        </div>

    )
}

export default EditPlaylist;
