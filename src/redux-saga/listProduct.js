export const LIST_PRODUCT = 'LIST_PRODUCT';
export const LIST_PRODUCT_SUCCESS = 'LIST_PRODUCT_SUCCESS';
export const LIST_PRODUCT_ERROR = 'LIST_PRODUCT_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { api } from '../services/Services';
import qs from 'qs';

export const listProductAction = (filter) => {
	return {
		type: LIST_PRODUCT,
		filter
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: {
		list: []
	}
};
export const listProductReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case LIST_PRODUCT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case LIST_PRODUCT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case LIST_PRODUCT:
			return {
				data: {
					list: []
				},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* listProductService(filter) {
	return yield api.get(`/product/list`, {
		params: { ...filter },
		paramsSerializer: (params) => {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		}
	});
}
export function* listProductSaga(action) {
	try {
		const response = yield listProductService(action.filter);
		console.log('listProductSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield put({ type: LIST_PRODUCT_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: LIST_PRODUCT_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: LIST_PRODUCT_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: LIST_PRODUCT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
