import {
    LIST_ITINERARIES,
    ADD_ITINERARIES,
    UPDATE_ITINERARIES,
    DELETE_ITINERARIES,
    BATCH_DELETE,
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getItineraries = (filter = {}) => dispatch => {
    console.log("filterf",filter)
    return new Promise((resolve, reject) => {
       
        api.get('/itinerary/list', {
            params: {...filter},
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });  
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: LIST_ITINERARIES, payload: res.data.data });
            console.log('ok');
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);
                console.log(error);
            })
    })
}
export const createACategory = (category) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/category/save', category).then(res => {
            console.log(res.data);
            dispatch({ type: ADD_ITINERARIES, payload: res.data.data });
            resolve(res.data);
           
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);
               
            })
    })
}

export const updateCategory = ( data) => dispatch => {
    return new Promise((resolve, reject) => {
         api.post('/category/save', data).then(response => {
            
        dispatch({ type: UPDATE_ITINERARIES, payload: response.data.data });
        NotificationManager.success(response.data.msg);
        
         
     
            resolve(response.data);
           
        }).catch(error => {
                NotificationManager.error(error.response.data.msg);
                 reject(error.response.data);
                
             
            })
    })
}

// export const updateParent = ( data) => dispatch => {
//     return new Promise((resolve, reject) => {
//          api.post('/category/save', data).then(response => {
            
//         dispatch({ type: UPDATE_CATEGORY, payload: response.data.data });
//         NotificationManager.success(response.data.msg);
        
         
     
//             resolve(response.data);
           
//         }).catch(error => {
//                 NotificationManager.error(error.response.data.msg);
//                  reject(error.response.data);
                
             
//             })
//     })
// }


export const deleteCategory = (idCategory) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/category/delete', idCategory).then(res => {
            dispatch({ type: DELETE_ITINERARIES, payload: res.data.data });
            resolve(res.data);
            NotificationManager.success('Delete Success');
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}

export const batchDelete = (idCategory) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/category/delete', idCategory).then(res => {
            dispatch({ type: BATCH_DELETE, payload: res.data.data });
            resolve(res.data);
            NotificationManager.success('Delete Success');
        }).catch(error => {
            reject(error);
            // NotificationManager.error(error)
        })
    })
}