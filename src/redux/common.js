const CHANGE_STATUS = 'CHANGE_STATUS';
const CHANGE_STATUS_SUCCESS = 'CHANGE_STATUS_SUCCESS';
const CHANGE_STATUS_ERROR = 'CHANGE_STATUS_ERROR';
const PUBLISH = 'PUBLISH';
const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
const PUBLISH_ERROR = 'PUBLISH_ERROR';
const UNPUBLISH = 'UNPUBLISH';
const UNPUBLISH_SUCCESS = 'UNPUBLISH_SUCCESS';
const UNPUBLISH_ERROR = 'UNPUBLISH_ERROR';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';
import initState from './initState';

const changeStatusAction = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: CHANGE_STATUS });
		return api
			.post('/common/status', data)
			.then((res) => {
				console.log(res);
				dispatch({ type: CHANGE_STATUS_SUCCESS, payload: res.data.data, message: res.data.msg });
				NotificationManager.success(res.data.msg);
				resolve(true);
			})
			.catch((error) => {
				reject(error);
				NotificationManager.error(error.response.data.msg);
				dispatch({ type: CHANGE_STATUS_ERROR, payload: error.response.data, message: error.response.data.msg });
			});
	});
};
const publishAction = (data) => (dispatch) => {
	dispatch({ type: PUBLISH });
	return new Promise((resolve, reject) => {
		return api
			.post('/common/publish', data)
			.then((res) => {
				console.log(res);
				dispatch({ type: PUBLISH_SUCCESS, payload: res.data.data, message: res.data.msg });
				NotificationManager.success(res.data.msg);
				resolve(true);
			})
			.catch((error) => {
				// reject(error);
				NotificationManager.error(error.response.data.msg);
				dispatch({ type: PUBLISH_ERROR, payload: error.response.data, message: error.response.data.msg });
			});
	});
};
const unpublishAction = (data) => (dispatch) => {
	dispatch({ type: UNPUBLISH });
	return new Promise((resolve, reject) => {
		return api
			.post('/common/unpublish', data)
			.then((res) => {
				console.log(res);
				dispatch({ type: UNPUBLISH_SUCCESS, payload: res.data.data, message: res.data.msg });
				NotificationManager.success(res.data.msg);
				resolve(true);
			})
			.catch((error) => {
				// reject(error);
				NotificationManager.error(error.response.data.msg);
				dispatch({ type: UNPUBLISH_ERROR, payload: error.response.data, message: error.response.data.msg });
			});
	});
};
const changeStatusReducer = (state = initState, action) => {
	switch (action.type) {
		case CHANGE_STATUS:
			return { ...state, isLoading: true };
		case CHANGE_STATUS_SUCCESS:
			return { ...state, isLoading: false, isSuccess: true, data: action.payload, message: action.message };
		case CHANGE_STATUS_ERROR:
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
const publishReducer = (state = initState, action) => {
	switch (action.type) {
		case PUBLISH:
			return { ...state, isLoading: true };
		case PUBLISH_SUCCESS:
			return { ...state, isLoading: false, isSuccess: true, data: action.payload, message: action.message };
		case PUBLISH_ERROR:
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
const unpublishReducer = (state = initState, action) => {
	switch (action.type) {
		case UNPUBLISH:
			return { ...state, isLoading: true };
		case UNPUBLISH_SUCCESS:
			return { ...state, isLoading: false, isSuccess: true, data: action.payload, message: action.message };
		case UNPUBLISH_ERROR:
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
export { changeStatusAction, publishAction, unpublishAction, changeStatusReducer, publishReducer, unpublishReducer };
