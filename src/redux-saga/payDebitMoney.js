export const PAY_DEBIT_MONEY = 'PAY_DEBIT_MONEY';
export const PAY_DEBIT_MONEY_SUCCESS = 'PAY_DEBIT_MONEY_SUCCESS';
export const PAY_DEBIT_MONEY_ERROR = 'PAY_DEBIT_MONEY_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const payDebitMoneyAction = (body) => {
	return {
		type: PAY_DEBIT_MONEY,
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
export const payDebitMoneyReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case PAY_DEBIT_MONEY_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case PAY_DEBIT_MONEY_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case PAY_DEBIT_MONEY:
			return {
				data: [],
				isLoading: true
			};
		default:
			return state;
	}
};
export function* payDebitMoneyService(body) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/ActionPayDebitMoney', Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		...body
	});
}
export function* payDebitMoneySaga(action) {
	try {
		const response = yield payDebitMoneyService(action.body);
		console.log('payDebitMoneySaga', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({
					type: PAY_DEBIT_MONEY_SUCCESS,
					data: response.data.Data,
					message: response.data.Message
				});
			} else {
				yield put({
					type: PAY_DEBIT_MONEY_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: PAY_DEBIT_MONEY_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: PAY_DEBIT_MONEY_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
