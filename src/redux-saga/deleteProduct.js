export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { api } from '../services/Services';
import qs from 'qs';

export const deleteProductAction = (body) => {
	return {
		type: DELETE_PRODUCT,
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
export const deleteProductReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case DELETE_PRODUCT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case DELETE_PRODUCT:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* deleteProductService(body) {
	return yield api.post(`/product/delete`, body);
}
export function* deleteProductSaga(action) {
	try {
		const response = yield deleteProductService(action.body);
		console.log('deleteProductSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield put({ type: DELETE_PRODUCT_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: DELETE_PRODUCT_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: DELETE_PRODUCT_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: DELETE_PRODUCT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
