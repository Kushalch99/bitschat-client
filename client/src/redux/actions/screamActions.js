import { postNewScream } from '../../api'
export const postScream = (scream) => async (dispatch) => {
  try {
    await postNewScream(scream)
  } catch (err) {
    console.log(err)
  }
}
