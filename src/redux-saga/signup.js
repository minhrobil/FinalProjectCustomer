export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const signupAction = (body) => {
	return {
		type: SIGNUP,
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
export const signupReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case SIGNUP_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case SIGNUP:
			return {
				data: {},
				isLoading: true
			};
		default:
			return defaultGetFormData;
	}
};
export function* signupService(body) {
	return yield execute('/signup', Method.POST, {
		...body
	});
}
export function* signupSaga(action) {
	try {
		const response = yield signupService(action.body);
		console.log('signup', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({ type: SIGNUP_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: SIGNUP_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: SIGNUP_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: SIGNUP_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
