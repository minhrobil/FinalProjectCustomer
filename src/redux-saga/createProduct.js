export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { api } from '../services/Services';
import qs from 'qs';

export const createProductAction = (body) => {
	return {
		type: CREATE_PRODUCT,
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
export const createProductReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case CREATE_PRODUCT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case CREATE_PRODUCT:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* createProductService(body) {
	return yield api.post(`/product/save`, body);
}
export function* createProductSaga(action) {
	try {
		const response = yield createProductService(action.body);
		console.log('createProductSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield put({ type: CREATE_PRODUCT_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: CREATE_PRODUCT_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: CREATE_PRODUCT_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: CREATE_PRODUCT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
