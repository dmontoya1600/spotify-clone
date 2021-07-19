const UPLOAD_PIC = 'pic/updatePic'

const setPic = (imgUrl) => {
    return {
      type: UPLOAD_PIC,
      payload: imgUrl
    }
  }

export const uploadPic = (image, userId) => async (dispatch) => {
    const formData = new FormData();

      if (image) {
        formData.append("image", image)};
        console.log('THIS IS THE FORM DATA',formData, 'AND IMAGE>', image)

      const res = await fetch(`/api/upload/testrun`, {
        method: "POST",
        body: formData,
      });
      // AWS WORKS, JUST NEED TO VERIFY RESPONSE.
      // ONCE THIS FEATURE IS DONE, MAKE SURE TO
      // SEND THUNK ACTION TO SESSION TOO
      const data = await res.json();
      dispatch(setPic(data.imageUrl));
      return data

    };
