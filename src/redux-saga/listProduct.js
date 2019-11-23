export const LIST_PRODUCT = 'LIST_PRODUCT';
export const LIST_PRODUCT_SUCCESS = 'LIST_PRODUCT_SUCCESS';
export const LIST_PRODUCT_ERROR = 'LIST_PRODUCT_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const listProductAction = (body) => {
	return {
		type: LIST_PRODUCT,
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
				data: {},
				isLoading: true
			};
		default:
			return defaultGetFormData;
	}
};
export function* listProductService(body) {
	return yield execute('/product/list', Method.get, {
		...body
	});
}
export function* listProductSaga(action) {
	try {
		const response = yield listProductService(action.body);
		console.log('listProductSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield MAsyncStorage.setUserInfo(response.data.data);
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
