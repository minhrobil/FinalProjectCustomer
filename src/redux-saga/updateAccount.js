export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_ERROR = 'UPDATE_ACCOUNT_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const updateAccountAction = (body) => {
	return {
		type: UPDATE_ACCOUNT,
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
export const updateAccountReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case UPDATE_ACCOUNT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case UPDATE_ACCOUNT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case UPDATE_ACCOUNT:
			return {
				data: {},
				isLoading: true
			};
		default:
			return defaultGetFormData;
	}
};
export function* updateAccountService(body) {
	return yield execute('/user/save', Method.POST, {
		...body
	});
}
export function* updateAccountSaga(action) {
	try {
		const response = yield updateAccountService(action.body);
		console.log('updateAccountSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({ type: UPDATE_ACCOUNT_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: UPDATE_ACCOUNT_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: UPDATE_ACCOUNT_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: UPDATE_ACCOUNT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
