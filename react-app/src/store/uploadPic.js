export const SET_PIC = 'pic/setPic'

const setPic = (imgUrl) => {
    return {
      type: SET_PIC,
      payload: imgUrl
    }
  }

export const uploadPic = (image, userId) => async (dispatch) => {
    const formData = new FormData();

      if (image) {
        formData.append("image", image)};
        console.log('THIS IS THE FORM DATA',formData, 'AND IMAGE>', image)

      const res = await fetch(`/api/upload/profile/${userId}`, {
        method: "POST",
        body: formData,
      });
      // AWS WORKS, JUST NEED TO VERIFY RESPONSE.
      // ONCE THIS FEATURE IS DONE, MAKE SURE TO
      // SEND THUNK ACTION TO SESSION TOO
      console.log('WELCOME. THIS IS RES', res.body)
      const data = await res.json()
      dispatch(setPic(data));
      return data

    };

    export const loadPic = (userId) => async (dispatch) => {
        const res = await fetch(`/api/upload/profile/${userId}`)
        const data = await res.json()

        console.log('THIS IS THE RES.BODY', data)
        dispatch(setPic(data))
        return data
    };
