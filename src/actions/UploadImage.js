import { NotificationManager } from 'react-notifications';
import {
   UPLOAD_IMAGE,
   UPLOAD_IMAGE_SUCCESS,
   UPLOAD_IMAGE_ERROR,
} from 'Actions/types';
import api from '../api';

export const uploadImage = (body) => dispatch => {
   return new Promise((resolve, reject) => {
      dispatch({ type: UPLOAD_IMAGE});
      return api.post('/uploadImage', body)
         .then(res => {
         console.log(res);
         dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data.data, message:res.data.msg });
         NotificationManager.success(res.data.msg);
         resolve(true)
      })
         .catch(error => {
            // reject(error);
            NotificationManager.error(error.response.data.msg);
            dispatch({ type: UPLOAD_IMAGE_ERROR, payload: error.response.data, message: error.response.data.msg });
         })
   })
}
