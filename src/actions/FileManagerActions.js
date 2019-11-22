import {
    GET_LIST_FILE_AND_FOLDER,
    CREATE_FOLDER,
    UPLOAD_FILE,
    UPLOAD_IMG,
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getAll = (filter = "", currentfolder) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/media/list?folder=${filter}`).then(res => {
            resolve(res.data);
            dispatch({ type: GET_LIST_FILE_AND_FOLDER, payload: res.data.data, currentfolder });
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);
            })
    })
}

