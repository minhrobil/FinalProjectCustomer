export const GET_HISTORY_EXTENTION = 'GET_HISTORY_EXTENTION';
export const GET_HISTORY_EXTENTION_SUCCESS = 'GET_HISTORY_EXTENTION_SUCCESS';
export const GET_HISTORY_EXTENTION_ERROR = 'GET_HISTORY_EXTENTION_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const getHistoryExtentionAction = (LoanID) => {
	return {
		type: GET_HISTORY_EXTENTION,
		LoanID
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const getHistoryExtentionReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_HISTORY_EXTENTION_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false
			};
		case GET_HISTORY_EXTENTION_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case GET_HISTORY_EXTENTION:
			return {
				data: [],
				isLoading: true
			};
		default:
			return state;
	}
};
export function* getHistoryExtentionService(LoanID) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/GetHistoryExtention', Method.GET, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		LoanID
	});
}
export function* getHistoryExtentionSaga(action) {
	try {
		const response = yield getHistoryExtentionService(action.LoanID);
		console.log('getHistoryExtentionService', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_HISTORY_EXTENTION_SUCCESS, data: response.data.Data.reverse() });
			} else {
				yield put({
					type: GET_HISTORY_EXTENTION_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_HISTORY_EXTENTION_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_HISTORY_EXTENTION_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
