export const GET_HISTORY_LOAN_EXTRA = 'GET_HISTORY_LOAN_EXTRA';
export const GET_HISTORY_LOAN_EXTRA_SUCCESS = 'GET_HISTORY_LOAN_EXTRA_SUCCESS';
export const GET_HISTORY_LOAN_EXTRA_ERROR = 'GET_HISTORY_LOAN_EXTRA_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const getHistoryLoanExtraAction = (LoanID) => {
	return {
		type: GET_HISTORY_LOAN_EXTRA,
		LoanID
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const getHistoryLoanExtraReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_HISTORY_LOAN_EXTRA_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false
			};
		case GET_HISTORY_LOAN_EXTRA_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case GET_HISTORY_LOAN_EXTRA:
			return {
				data: [],
				isLoading: true
			};
		default:
			return state;
	}
};
export function* getHistoryLoanExtraService(LoanID) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/GetHistoryLoanExtra', Method.GET, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		LoanID
	});
}
export function* getHistoryLoanExtraSaga(action) {
	try {
		const response = yield getHistoryLoanExtraService(action.LoanID);
		console.log('getHistoryLoanExtraSaga', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_HISTORY_LOAN_EXTRA_SUCCESS, data: response.data.Data.reverse() });
			} else {
				yield put({
					type: GET_HISTORY_LOAN_EXTRA_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_HISTORY_LOAN_EXTRA_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_HISTORY_LOAN_EXTRA_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
