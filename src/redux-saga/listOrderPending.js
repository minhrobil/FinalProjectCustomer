export const LIST_ORDER_PENDING = 'LIST_ORDER_PENDING';
export const LIST_ORDER_PENDING_SUCCESS = 'LIST_ORDER_PENDING_SUCCESS';
export const LIST_ORDER_PENDING_ERROR = 'LIST_ORDER_PENDING_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { api } from '../services/Services';
import qs from 'qs';

export const listOrderPendingAction = (filter) => {
	return {
		type: LIST_ORDER_PENDING,
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
export const listOrderPendingReducer = (state = defaultGetFormData, action) => {
	console.log(action);

	switch (action.type) {
		case LIST_ORDER_PENDING_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case LIST_ORDER_PENDING_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case LIST_ORDER_PENDING:
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
export function* listOrderPendingService(filter) {
	return yield api.get(`/order/list`, {
		params: { ...filter },
		paramsSerializer: (params) => {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		}
	});
}
export function* listOrderPendingSaga(action) {
	try {
		const response = yield listOrderPendingService(action.filter);
		console.log('listOrderPendingSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield put({ type: LIST_ORDER_PENDING_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: LIST_ORDER_PENDING_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: LIST_ORDER_PENDING_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: LIST_ORDER_PENDING_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
