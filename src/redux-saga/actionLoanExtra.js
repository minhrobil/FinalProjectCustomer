export const ACTION_LOAN_EXTRA = 'ACTION_LOAN_EXTRA';
export const ACTION_LOAN_EXTRA_SUCCESS = 'ACTION_LOAN_EXTRA_SUCCESS';
export const ACTION_LOAN_EXTRA_ERROR = 'ACTION_LOAN_EXTRA_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const actionLoanExtraAction = (body) => {
	return {
		type: ACTION_LOAN_EXTRA,
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
export const actionLoanExtraReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case ACTION_LOAN_EXTRA_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case ACTION_LOAN_EXTRA_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case ACTION_LOAN_EXTRA:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* actionLoanExtraService(body) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/AddOrSubLoanExtra', Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		...body
	});
}
export function* actionLoanExtraSaga(action) {
	try {
		const response = yield actionLoanExtraService(action.body);
		console.log('actionLoanExtraizeSaga', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({
					type: ACTION_LOAN_EXTRA_SUCCESS,
					data: response.data.Data,
					message: response.data.Message
				});
			} else {
				yield put({
					type: ACTION_LOAN_EXTRA_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: ACTION_LOAN_EXTRA_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: ACTION_LOAN_EXTRA_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
