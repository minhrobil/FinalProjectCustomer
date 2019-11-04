import {
  GET_ALL_AIRLINES,
  ADD_A_AIRLINE,
  UPDATE_AIRLINE,
  DELETE_AIRLINE,
  UPDATE_STATUS_AIRLINE,
  CHANGE_STATUS,
  BATCH_DELETE
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';


export const getAllAirlines = (filter = {}) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .get('/airline/list', {
        params: { ...filter },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      })
      .then(res => {
        resolve(res.data);
        dispatch({ type: GET_ALL_AIRLINES, payload: res.data.data });
        // console.log('action: ', res.data.data);
      })
      .catch(error => {
        reject(error.response.data);
        // NotificationManager.error(error.response.data.message);
      });
  });
};

export const createAirline = destination => dispatch => {
  console.log('------', destination);
  return new Promise((resolve, reject) => {
    api
      .post('/airline/save', destination)
      .then(res => {
        dispatch({ type: ADD_A_AIRLINE, payload: res.data.data });
        NotificationManager.success('Create success');
        resolve(res.data);
      })
      .catch(error => {
        reject(error.response.data);
        NotificationManager.error('Can\'t create item');
      });
  });
};

export const updateAirline = data => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post('/airline/save', data)
      .then(res => {
        dispatch({ type: UPDATE_AIRLINE, payload: res.data.data });
        NotificationManager.success('Update success');
        resolve(res.data);
      })
      .catch(error => {
        reject(error.response.data);
        // NotificationManager.error(error.response.data.message);
        NotificationManager.error('Can\'t update');
        // console.log(error);
      });
  });
};

export const updateAirlineStatus = (data) => dispatch => {
  
  return new Promise((resolve, reject) => {
    api
      .post('/common/status', data)
      .then(res => {
        dispatch({type: UPDATE_STATUS_AIRLINE, payload: res.data.data});
        // NotificationManager.success('Update status success');
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        // NotificationManager.error('Can\'t status update');
      })
  })
}

// export const deleteAirline = idAirline => dispatch => {
//   return new Promise((resolve, reject) => {
//     // console.log('res: ');
//     api
//       .post('/airline/delete', { id: idAirline })
//       .then(res => {
//         console.log(res.data.data);

//         dispatch({ type: DELETE_AIRLINE, payload: res.data.data });
//         NotificationManager.success('Deleted success');
//         resolve(res.data);
//       })
//       .catch(error => {
//         reject(error.response.data);
//         NotificationManager.error('Can\'t delete');
//       });
//   });
// };

export const batchDelete = (ids) => dispatch => {
  // console.log('ids',this);
  
  return new Promise((resolve, reject) => {
      api.post('/airline/delete', ids).then(res => {
          dispatch({ type: DELETE_AIRLINE, payload: res.data.data });
          NotificationManager.success('Deleted success');
          resolve(res.data);
      }).catch(error => {
          console.log(error);
          
          NotificationManager.error('Can\'t delete');
          reject(error);
      })
  })
}

// export const changeStatus = (data) => dispatch => {
//   return new Promise((resolve, reject) => {
//       return api.post('/common/status', data).then(res => {
//           dispatch({type: CHANGE_STATUS, payload: res.data.data});
//           resolve(true)
//       }).catch(err => {
//           reject(err);
//       })
//   });
// }
