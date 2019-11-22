export const GET_PAYMENT_CUSTOMIZE = 'GET_PAYMENT_CUSTOMIZE';
export const GET_PAYMENT_CUSTOMIZE_SUCCESS = 'GET_PAYMENT_CUSTOMIZE_SUCCESS';
export const GET_PAYMENT_CUSTOMIZE_ERROR = 'GET_PAYMENT_CUSTOMIZE_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const getPaymentCustomizeAction = (body) => {
	return {
		type: GET_PAYMENT_CUSTOMIZE,
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
export const getPaymentCustomizeReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_PAYMENT_CUSTOMIZE_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false
			};
		case GET_PAYMENT_CUSTOMIZE_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case GET_PAYMENT_CUSTOMIZE:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* getPaymentCustomizeService(body) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/GetPaymentCustomize', Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		...body
	});
}
export function* getPaymentCustomizeSaga(action) {
	try {
		const response = yield getPaymentCustomizeService(action.body);
		console.log('getPaymentCustomize', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_PAYMENT_CUSTOMIZE_SUCCESS, data: response.data.Data });
			} else {
				yield put({
					type: GET_PAYMENT_CUSTOMIZE_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_PAYMENT_CUSTOMIZE_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_PAYMENT_CUSTOMIZE_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
