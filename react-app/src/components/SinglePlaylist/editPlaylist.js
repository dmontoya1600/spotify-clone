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
    console.log("playlist: ", playlist);

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
            console.log("updatedPlaylist: ", updatedPlaylist)
            updatedPlaylist = await dispatch(editOnePlaylist(userId, updatedPlaylist));
            console.log("All the way up: ", updatedPlaylist);
            // let playlist;
            // for(const [key, value] of Object.entries(updatedPlaylist.playlists)){
            //     playlist=value
            // }
            // history.push(`/playlists/${playlist.id}`)
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
            <div>
                <form id="editPlaylistForm"
                onSubmit={handleSubmit}
                >
                    <input className="editFormNameInput"
                        required
                        value={playlistName}
                        placeholder="Add Playlist Name"
                        onChange={(e)=>setPlaylistName(e.target.value)}
                    />
                    <input className="editFormImgInput"
                        value={playlistImg}
                        placeholder="Choose Photo"
                        onChange={(e)=>setPlaylistImg(e.target.value)}
                    />
                    <button type="submit" >Save</button>
                    <button type="reset" onClick={handleCancel} className="editFormCancelButton">Cancel</button>
                    <button type="button" onClick={handleDelete} className="editFormDeleteButton">Delete</button>
                </form>
            </div>
        </div>
    )
}

export default EditPlaylist;
