export const ACTION_EXTENTION = 'ACTION_EXTENTION';
export const ACTION_EXTENTION_SUCCESS = 'ACTION_EXTENTION_SUCCESS';
export const ACTION_EXTENTION_ERROR = 'ACTION_EXTENTION_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const actionExtentionAction = (body) => {
	return {
		type: ACTION_EXTENTION,
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
export const actionExtentionReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case ACTION_EXTENTION_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case ACTION_EXTENTION_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case ACTION_EXTENTION:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* actionExtentionService(body) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/ActionAddExtention', Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		...body
	});
}
export function* actionExtentionSaga(action) {
	try {
		const response = yield actionExtentionService(action.body);
		console.log('actionExtentionSaga', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({
					type: ACTION_EXTENTION_SUCCESS,
					data: response.data.Data,
					message: response.data.Message
				});
			} else {
				yield put({
					type: ACTION_EXTENTION_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: ACTION_EXTENTION_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: ACTION_EXTENTION_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
