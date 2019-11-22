export const GET_HISTORY_PAYMENT = 'GET_HISTORY_PAYMENT';
export const GET_HISTORY_PAYMENT_SUCCESS = 'GET_HISTORY_PAYMENT_SUCCESS';
export const GET_HISTORY_PAYMENT_ERROR = 'GET_HISTORY_PAYMENT_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const getHistoryPaymentAction = (LoanID) => {
	return {
		type: GET_HISTORY_PAYMENT,
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
export const getHistoryPaymentReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_HISTORY_PAYMENT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false
			};
		case GET_HISTORY_PAYMENT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case GET_HISTORY_PAYMENT:
			return {
				data: [],
				isLoading: true
			};
		default:
			return state;
	}
};
export function* getHistoryPaymentService(LoanID) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/GetHistoryPayment', Method.GET, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		LoanID
	});
}
export function* getHistoryPaymentSaga(action) {
	try {
		const response = yield getHistoryPaymentService(action.LoanID);
		console.log('getHistoryPayment', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_HISTORY_PAYMENT_SUCCESS, data: response.data.Data.reverse() });
			} else {
				yield put({
					type: GET_HISTORY_PAYMENT_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_HISTORY_PAYMENT_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_HISTORY_PAYMENT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
