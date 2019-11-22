const LIST_ACCOUNT = 'LIST_ACCOUNT';
const LIST_ACCOUNT_SUCCESS = 'LIST_ACCOUNT_SUCCESS';
const LIST_ACCOUNT_ERROR = 'LIST_ACCOUNT_ERROR';
const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
const SAVE_ACCOUNT_SUCCESS = 'SAVE_ACCOUNT_SUCCESS';
const SAVE_ACCOUNT_ERROR = 'SAVE_ACCOUNT_ERROR';
const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
const DELETE_ACCOUNT_ERROR = 'DELETE_ACCOUNT_ERROR';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';
import initState from './initState';

const listAccountAction = (filter = {}, type) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: LIST_ACCOUNT });
		return api
			.get(`/customer/list/${type}`, {
				params: { ...filter },
				paramsSerializer: (params) => {
					return qs.stringify(params, { arrayFormat: 'repeat' });
				}
			})
			.then((res) => {
				console.log(res);
				dispatch({ type: LIST_ACCOUNT_SUCCESS, payload: res.data.data, message: res.data.msg });
				// NotificationManager.success(res.data.msg);
				resolve(true);
			})
			.catch((error) => {
				reject(error);
				NotificationManager.error(error.response.data.msg);
				dispatch({ type: LIST_ACCOUNT_ERROR, payload: error.response.data, message: error.response.data.msg });
			});
	});
};
const saveAccountAction = (data) => (dispatch) => {
	dispatch({ type: SAVE_ACCOUNT });
	return new Promise((resolve, reject) => {
		return api
			.post('/customer/save', data)
			.then((res) => {
				console.log(res);
				dispatch({ type: SAVE_ACCOUNT_SUCCESS, payload: res.data.data, message: res.data.msg });
				NotificationManager.success(res.data.msg);
				resolve(true);
			})
			.catch((error) => {
				// reject(error);
				NotificationManager.error(error.response.data.msg);
				dispatch({ type: SAVE_ACCOUNT_ERROR, payload: error.response.data, message: error.response.data.msg });
			});
	});
};
const deleteAccountAction = (data) => (dispatch) => {
	dispatch({ type: DELETE_ACCOUNT });
	return new Promise((resolve, reject) => {
		return api
			.post('/customer/delete', data)
			.then((res) => {
				console.log(res);
				dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: res.data.data, message: res.data.msg });
				NotificationManager.success(res.data.msg);
				resolve(true);
			})
			.catch((error) => {
				// reject(error);
				NotificationManager.error(error.response.data.msg);
				dispatch({
					type: DELETE_ACCOUNT_ERROR,
					payload: error.response.data,
					message: error.response.data.msg
				});
			});
	});
};
const listAccountReducer = (state = initState, action) => {
	switch (action.type) {
		case LIST_ACCOUNT:
			return { ...state, isLoading: true };
		case LIST_ACCOUNT_SUCCESS:
			return { ...state, isLoading: false, isSuccess: true, data: action.payload, message: action.message };
		case LIST_ACCOUNT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				data: action.payload,
				message: action.message
			};
		default:
			return state;
	}
};
const saveAccountReducer = (state = initState, action) => {
	switch (action.type) {
		case SAVE_ACCOUNT:
			return { ...state, isLoading: true };
		case SAVE_ACCOUNT_SUCCESS:
			return { ...state, isLoading: false, isSuccess: true, data: action.payload, message: action.message };
		case SAVE_ACCOUNT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				data: action.payload,
				message: action.message
			};
		default:
			return initState;
	}
};
const deleteAccountReducer = (state = initState, action) => {
	switch (action.type) {
		case DELETE_ACCOUNT:
			return { ...state, isLoading: true };
		case DELETE_ACCOUNT_SUCCESS:
			return { ...state, isLoading: false, isSuccess: true, data: action.payload, message: action.message };
		case DELETE_ACCOUNT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				data: action.payload,
				message: action.message
			};
		default:
			return initState;
	}
};
export {
	listAccountAction,
	listAccountReducer,
	saveAccountAction,
	saveAccountReducer,
	deleteAccountAction,
	deleteAccountReducer
};
