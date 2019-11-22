export const ACTION_PAYMENT_CUSTOMIZE = 'ACTION_PAYMENT_CUSTOMIZE';
export const ACTION_PAYMENT_CUSTOMIZE_SUCCESS = 'ACTION_PAYMENT_CUSTOMIZE_SUCCESS';
export const ACTION_PAYMENT_CUSTOMIZE_ERROR = 'ACTION_PAYMENT_CUSTOMIZE_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const actionPaymentCustomizeAction = (body) => {
	return {
		type: ACTION_PAYMENT_CUSTOMIZE,
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
export const actionPaymentCustomizeReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case ACTION_PAYMENT_CUSTOMIZE_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case ACTION_PAYMENT_CUSTOMIZE_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case ACTION_PAYMENT_CUSTOMIZE:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* actionPaymentCustomizeService(body) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/ActionPaymentCustomize', Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		...body
	});
}
export function* actionPaymentCustomizeSaga(action) {
	try {
		const response = yield actionPaymentCustomizeService(action.body);
		console.log('actionPaymentCustomizeSaga', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({
					type: ACTION_PAYMENT_CUSTOMIZE_SUCCESS,
					data: response.data.Data,
					message: response.data.Message
				});
			} else {
				yield put({
					type: ACTION_PAYMENT_CUSTOMIZE_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: ACTION_PAYMENT_CUSTOMIZE_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: ACTION_PAYMENT_CUSTOMIZE_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
