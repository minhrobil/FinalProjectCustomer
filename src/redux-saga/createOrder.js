export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { api } from '../services/Services';
import qs from 'qs';

export const createOrderAction = (body) => {
	return {
		type: CREATE_ORDER,
		body
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: {}
};
export const createOrderReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CREATE_ORDER_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case CREATE_ORDER_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case CREATE_ORDER:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* createOrderService(body) {
	return yield api.post(`/order/save`, body);
}
export function* createOrderSaga(action) {
	try {
		const response = yield createOrderService(action.body);
		console.log('createOrderSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield put({ type: CREATE_ORDER_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: CREATE_ORDER_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: CREATE_ORDER_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: CREATE_ORDER_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
