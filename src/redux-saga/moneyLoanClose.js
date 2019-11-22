export const GET_MONEY_LOAN_CLOSE = 'GET_MONEY_LOAN_CLOSE';
export const GET_MONEY_LOAN_CLOSE_SUCCESS = 'GET_MONEY_LOAN_CLOSE_SUCCESS';
export const GET_MONEY_LOAN_CLOSE_ERROR = 'GET_MONEY_LOAN_CLOSE_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const getMoneyLoanCloseAction = (LoanID, StrCloseDate) => {
	return {
		type: GET_MONEY_LOAN_CLOSE,
		LoanID,
		StrCloseDate
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const getMoneyLoanCloseReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_MONEY_LOAN_CLOSE_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false
			};
		case GET_MONEY_LOAN_CLOSE_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case GET_MONEY_LOAN_CLOSE:
			return {
				data: [],
				isLoading: true
			};
		default:
			return state;
	}
};
export function* getMoneyLoanCloseService(LoanID, StrCloseDate) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/GetMoneyLoanClose', Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		LoanID,
		StrCloseDate
	});
}
export function* getMoneyLoanCloseSaga(action) {
	try {
		const response = yield getMoneyLoanCloseService(action.LoanID, action.StrCloseDate);
		console.log('getMoneyLoanCloseSaga', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_MONEY_LOAN_CLOSE_SUCCESS, data: response.data.Data });
			} else {
				yield put({
					type: GET_MONEY_LOAN_CLOSE_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_MONEY_LOAN_CLOSE_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_MONEY_LOAN_CLOSE_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
