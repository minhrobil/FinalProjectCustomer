export const ACTION_CLOSE_LOAN = 'ACTION_CLOSE_LOAN';
export const ACTION_CLOSE_LOAN_SUCCESS = 'ACTION_CLOSE_LOAN_SUCCESS';
export const ACTION_CLOSE_LOAN_ERROR = 'ACTION_CLOSE_LOAN_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const actionCloseLoanAction = (body) => {
	return {
		type: ACTION_CLOSE_LOAN,
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
export const actionCloseLoanReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case ACTION_CLOSE_LOAN_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case ACTION_CLOSE_LOAN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case ACTION_CLOSE_LOAN:
			return {
				data: [],
				isLoading: true
			};
		default:
			return state;
	}
};
export function* actionCloseLoanService(body) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/ActionCloseLoan', Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		...body
	});
}
export function* actionCloseLoanSaga(action) {
	try {
		const response = yield actionCloseLoanService(action.body);
		console.log('actionCloseLoanSaga', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({
					type: ACTION_CLOSE_LOAN_SUCCESS,
					data: response.data.Data,
					message: response.data.Message
				});
			} else {
				yield put({
					type: ACTION_CLOSE_LOAN_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: ACTION_CLOSE_LOAN_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: ACTION_CLOSE_LOAN_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
