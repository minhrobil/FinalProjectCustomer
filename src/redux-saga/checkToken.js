export const CHECK_TOKEN = 'CHECK_TOKEN';
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS';
export const CHECK_TOKEN_ERROR = 'CHECK_TOKEN_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const checkTokenAction = (body) => {
	return {
		type: CHECK_TOKEN,
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
export const checkTokenReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CHECK_TOKEN_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case CHECK_TOKEN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case CHECK_TOKEN:
			return {
				data: {},
				isLoading: true
			};
		default:
			return defaultGetFormData;
	}
};
export function* checkTokenService(body) {
	return yield execute('/loginWithToken', Method.POST, {});
}
export function* checkTokenSaga(action) {
	try {
		const response = yield checkTokenService(action.body);
		console.log('checkTokenSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({ type: CHECK_TOKEN_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: CHECK_TOKEN_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: CHECK_TOKEN_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: CHECK_TOKEN_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
