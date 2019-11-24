export const LIST_ORDER_HISTORY = 'LIST_ORDER_HISTORY';
export const LIST_ORDER_HISTORY_SUCCESS = 'LIST_ORDER_HISTORY_SUCCESS';
export const LIST_ORDER_HISTORY_ERROR = 'LIST_ORDER_HISTORY_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { api } from '../services/Services';
import qs from 'qs';

export const listOrderHistoryAction = (filter) => {
	return {
		type: LIST_ORDER_HISTORY,
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
export const listOrderHistoryReducer = (state = defaultGetFormData, action) => {
	console.log(action);

	switch (action.type) {
		case LIST_ORDER_HISTORY_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case LIST_ORDER_HISTORY_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case LIST_ORDER_HISTORY:
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
export function* listOrderHistoryService(filter) {
	return yield api.get(`/order/list`, {
		params: { ...filter },
		paramsSerializer: (params) => {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		}
	});
}
export function* listOrderHistorySaga(action) {
	try {
		const response = yield listOrderHistoryService(action.filter);
		console.log('listOrderHistorySaga', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield put({ type: LIST_ORDER_HISTORY_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({
					type: LIST_ORDER_HISTORY_ERROR,
					code: response.data.status_code,
					message: response.data.msg
				});
			}
		} else {
			yield put({
				type: LIST_ORDER_HISTORY_ERROR,
				code: response.data.status_code,
				message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: LIST_ORDER_HISTORY_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
