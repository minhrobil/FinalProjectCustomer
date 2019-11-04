import {
    GET_ALL_TOUR,
    ADD_A_TOUR,
    GET_TOUR_DETAIL,
    UPDATE_TOUR,
    UPDATE_DEPARTURE_IN_TOUR,
    DELETE_TOUR,
    GET_TOUR_RATES
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getAllTour = (filter = {}) => dispatch => {

    return new Promise((resolve, reject) => {
        api.get('/tour/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ALL_TOUR, payload: res.data.data });
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.message);

        })
    })
}

export const createTour = (destination) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/tour/save', destination).then(res => {
            console.log(res.data);
            dispatch({ type: ADD_A_TOUR, payload: res.data.data });
            resolve(res.data);

        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.message);

            })
    })
}

export const updateTour = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/tour/save', data).then(response => {

            dispatch({ type: UPDATE_TOUR, payload: response.data.data });
            NotificationManager.success(response.data.msg);
            resolve(response.data);
        }).catch(error => {
            NotificationManager.error(error.response.data.msg);
            reject(error.response.data);
        })
    })
}

export const updateDepartureInTour = (id, data) => dispatch => {
    console.log(id, data);
    return new Promise((resolve, reject) => {
        api.post(`/tour/update_departure/${id}`, data).then(response => {
            dispatch({ type: UPDATE_DEPARTURE_IN_TOUR, payload: response.data.data });
            NotificationManager.success(response.data.msg);
            resolve(response.data);
        }).catch(error => {
            NotificationManager.error(error.response.data.msg);
            reject(error.response.data);
        })
    })
}

export const deleteTour = (idTour) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/tour/delete', idTour).then(res => {
            dispatch({ type: DELETE_TOUR, payload: res.data.data });
            resolve(res.data);
            NotificationManager.success('Delete Success');
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}

export const getTourDetail = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/tour/load/${id}`).then(res => {
            console.log(res)
            dispatch({ type: GET_TOUR_DETAIL, payload: res.data.data });
            resolve(res.data.data);
        }).catch(error => {
            reject(error.response);
            // NotificationManager.error(error.response.data)
        })
    })
} 

export const getTourRates = (filter) => dispatch => {
    console.log(filter)
    return new Promise((resolve, reject) => {
        return api.get('/tour/list_rate', {params: filter}).then(res => {
            dispatch({ type: GET_TOUR_RATES, payload: res.data.data });
            resolve(res.data.data);
        }).catch(error => {
            reject(error.response);
            // NotificationManager.error(error.response.data)
        })
    })
} 