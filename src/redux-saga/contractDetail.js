export const GET_CONTRACT_DETAIL = 'GET_CONTRACT_DETAIL';
export const GET_CONTRACT_DETAIL_SUCCESS = 'GET_CONTRACT_DETAIL_SUCCESS';
export const GET_CONTRACT_DETAIL_ERROR = 'GET_CONTRACT_DETAIL_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const getContractDetailAction = (LoanID) => {
	return {
		type: GET_CONTRACT_DETAIL,
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
export const getContractDetailReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_CONTRACT_DETAIL_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false
			};
		case GET_CONTRACT_DETAIL_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case GET_CONTRACT_DETAIL:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};
export function* getContractDetailService(LoanID) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute('/Loan/GetLoanByID', Method.GET, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		ControllerName: 'Loan',
		LoanID
	});
}
export function* getContractDetailSaga(action) {
	try {
		const response = yield getContractDetailService(action.LoanID);
		console.log('getContractDetail', response);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_CONTRACT_DETAIL_SUCCESS, data: response.data.Data });
			} else {
				yield put({
					type: GET_CONTRACT_DETAIL_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_CONTRACT_DETAIL_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_CONTRACT_DETAIL_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
