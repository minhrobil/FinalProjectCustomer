import {
    GET_ALL_CONTRACT,

} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getAllContract = (filter = {}) => dispatch => {

    return new Promise((resolve, reject) => {
        api.get('/contract/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ALL_CONTRACT, payload: res.data.data });

        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);

            })
    })
}
