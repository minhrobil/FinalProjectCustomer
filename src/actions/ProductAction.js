import { NotificationManager } from 'react-notifications';
import {
   LIST_PRODUCT,
   LIST_PRODUCT_SUCCESS,
   LIST_PRODUCT_ERROR,
   SAVE_PRODUCT,
   SAVE_PRODUCT_ERROR,
   SAVE_PRODUCT_SUCCESS,
   DELETE_PRODUCT,
   DELETE_PRODUCT_ERROR,
   DELETE_PRODUCT_SUCCESS,
} from 'Actions/types';
import api from '../api';
import qs from 'qs';
import { notification } from 'antd';

export const listProduct = (filter) => dispatch => {
   return new Promise((resolve, reject) => {
      dispatch({ type: LIST_PRODUCT});
      return api.get('/product/list',{
         params: { ...filter },
         paramsSerializer: params => {
             return qs.stringify(params, { arrayFormat: "repeat" });
         }
     })
         .then(res => {
         console.log(res);
         dispatch({ type: LIST_PRODUCT_SUCCESS, payload: res.data.data, message:res.data.msg });
         // NotificationManager.success(res.data.msg);
         resolve(true)
      })
         .catch(error => {
            // reject(error);
            NotificationManager.error(error.response.data.msg);
            dispatch({ type: LIST_PRODUCT_ERROR, payload: error.response.data, message: error.response.data.msg });
         })
   })
}
export const saveProduct = (body) => dispatch => {
   return new Promise((resolve, reject) => {
      dispatch({ type: SAVE_PRODUCT});
      return api.post('/product/save', body)
         .then(res => {
         console.log(res);
         dispatch({ type:SAVE_PRODUCT_SUCCESS, payload: res.data.data, message:res.data.msg });
         NotificationManager.success(res.data.msg);
         resolve(true)
      })
         .catch(error => {
            // reject(error);
            NotificationManager.error(error.response.data.msg);
            dispatch({ type: SAVE_PRODUCT_ERROR, payload: error.response.data, message: error.response.data.msg });
         })
   })
}
export const deleteProduct = (body) => dispatch => {
   return new Promise((resolve, reject) => {
      dispatch({ type: DELETE_PRODUCT});
      return api.post('/product/delete', body)
         .then(res => {
         console.log(res);
         dispatch({ type:DELETE_PRODUCT_SUCCESS, payload: res.data.data, message:res.data.msg });
         // const openNotification = () => {
         //    const args = {
         //      message: res.data.msg,
         //      duration: 2,
         //    };
         //    notification.success(args);
         //  };
         NotificationManager.success(res.data.msg);
         openNotification()
         resolve(true)
      })
         .catch(error => {
            // reject(error);
            NotificationManager.error(error.response.data.msg);
            dispatch({ type: DELETE_PRODUCT_ERROR, payload: error.response.data, message: error.response.data.msg });
         })
   })
}