export const DELETE_PAYMENT = 'DELETE_PAYMENT';
export const DELETE_PAYMENT_SUCCESS = 'DELETE_PAYMENT_SUCCESS';
export const DELETE_PAYMENT_ERROR = 'DELETE_PAYMENT_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const deletePaymentAction = (body) => {
	return {
		type: DELETE_PAYMENT,
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
export const deletePaymentReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case DELETE_PAYMENT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case DELETE_PAYMENT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case DELETE_PAYMENT:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* deletePaymentService(body) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/DeletePayment', Method.GET, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		...body
	});
}
export function* deletePaymentSaga(action) {
	try {
		const response = yield deletePaymentService(action.body);
		console.log('deletePayent', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({
					type: DELETE_PAYMENT_SUCCESS,
					data: response.data.Data,
					message: response.data.Message
				});
			} else {
				yield put({
					type: DELETE_PAYMENT_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: DELETE_PAYMENT_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: DELETE_PAYMENT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
