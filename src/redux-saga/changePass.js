export const CHANGE_PASS = 'CHANGE_PASS';
export const CHANGE_PASS_SUCCESS = 'CHANGE_PASS_SUCCESS';
export const CHANGE_PASS_ERROR = 'CHANGE_PASS_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const changePassAction = (body) => {
	return {
		type: CHANGE_PASS,
		body
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const changePassReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CHANGE_PASS_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case CHANGE_PASS_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case CHANGE_PASS:
			return {
				data: {},
				isLoading: true
			};
		default:
			return defaultGetFormData;
	}
};
export function* changePassService(body) {
	return yield execute('/user/changePass', Method.POST, {
		...body
	});
}
export function* changePassSaga(action) {
	try {
		const response = yield changePassService(action.body);
		console.log('changePassSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({ type: CHANGE_PASS_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: CHANGE_PASS_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: CHANGE_PASS_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: CHANGE_PASS_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
