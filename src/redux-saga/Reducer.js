import { combineReducers } from 'redux';
import {
	GET_FORM_DATA_ERROR,
	GET_FORM_DATA_SUCCESS,
	GET_FORM_DATA,
	LOG_IN_SUCCESS,
	LOG_IN_ERROR,
	LOG_IN,
	CHECK_SESSION_SUCCESS,
	CHECK_SESSION_ERROR,
	CHECK_SESSION,
	GET_RECENT_REPORT_SUCCESS,
	GET_RECENT_REPORT_ERROR,
	GET_RECENT_REPORT,
	GET_COMMON_DATA_SUCCESS,
	GET_COMMON_DATA_ERROR,
	GET_COMMON_DATA,
	GET_DEBT_REMINDER_SUCCESS,
	GET_DEBT_REMINDER_ERROR,
	GET_DEBT_REMINDER,
	GET_CONTRACTS_SUCCESS,
	GET_CONTRACTS_ERROR,
	GET_CONTRACTS
} from './Action';
import { getContractDetailReducer } from './contractDetail';
import { getHistoryPaymentReducer } from './historyPayment';
import { getPaymentCustomizeReducer } from './paymentCustomize';
import { actionPaymentCustomizeReducer } from './actionPaymentCustomize';
import { deletePaymentReducer } from './deletePayment';
import { getHistoryExtentionReducer } from './historyExtention';
import { actionExtentionReducer } from './actionExtention';
import { getHistoryLoanExtraReducer } from './historyLoanExtra';
import { actionLoanExtraReducer } from './actionLoanExtra';
import { actionCloseLoanReducer } from './actionCloseLoan';
import { getMoneyLoanCloseReducer } from './moneyLoanClose';
import { payDebitMoneyReducer } from './payDebitMoney';
import { signupReducer } from './signup';
import { userInfoReducer } from './userInfo';
import { updateAccountReducer } from './updateAccount';
import { checkTokenReducer } from './checkToken';
import { changePassReducer } from './changePass';
import { listProductReducer } from './listProduct';
import { autocompleteAddressReducer } from './autocompleteAddress';

const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	error: 0,
	canLoadMore: true,
	data: []
};
const getFormData = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_FORM_DATA_SUCCESS:
			return { ...state, ...{ isLoading: false, error: 0, data: action.data } };
		case GET_FORM_DATA_ERROR:
			return { ...state, ...{ isLoading: false, error: 1 } };
		case GET_FORM_DATA:
			return { ...state, ...{ isLoading: true } };
		default:
			return state;
	}
};

const Login = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case LOG_IN_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isError: false,
				isSuccess: true
			};
		case LOG_IN_ERROR:
			return {
				isLoading: false,
				isError: true,
				message: action.message
			};
		case LOG_IN:
			return {
				isLoading: true,
				isError: false
			};
		default:
			return {
				...state,
				isSuccess: false
			};
	}
};

const CheckSession = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CHECK_SESSION_SUCCESS:
			return {
				data: true,
				isLoading: false,
				isError: false
			};
		case CHECK_SESSION_ERROR:
			return {
				isLoading: false,
				isError: true
			};
		case CHECK_SESSION:
			return {
				isLoading: true,
				isError: false
			};
		default:
			return {
				isLoading: false,
				isError: false
			};
	}
};

const GetRecentReport = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_RECENT_REPORT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isError: false
			};
		case GET_RECENT_REPORT_ERROR:
			return {
				isLoading: false,
				isError: true
			};
		case GET_RECENT_REPORT:
			return {
				isLoading: true,
				isError: false
			};
		default:
			return {
				isLoading: false,
				isError: false
			};
	}
};

const GetCommonData = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_COMMON_DATA_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isError: false
			};
		case GET_COMMON_DATA_ERROR:
			return {
				isLoading: false,
				isError: true
			};
		case GET_COMMON_DATA:
			return {
				isLoading: true,
				isError: false
			};
		default:
			return {
				isLoading: false,
				isError: false
			};
	}
};

const GetDebtReminder = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case GET_DEBT_REMINDER_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isError: false,
				isCanLoadMore: action.data.length === 20,
				isRefresh: false
			};
		case GET_DEBT_REMINDER_ERROR:
			return {
				isLoading: false,
				isError: true,
				isCanLoadMore: false,
				isRefresh: false
			};
		case GET_DEBT_REMINDER:
			return {
				isLoading: true,
				isError: false,
				isCanLoadMore: false,
				isRefresh: action.page === 1
			};
		default:
			return {
				isLoading: false,
				isError: false,
				isCanLoadMore: false,
				isRefresh: false
			};
	}
};

let categoryContract = 0;
const GetContracts = (state = defaultGetFormData, action) => {
	if (action.type1) {
		categoryContract = action.type1;
	}
	switch (action.type) {
		case GET_CONTRACTS_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isError: false,
				isCanLoadMore: action.data.length === 20,
				isRefresh: false,
				type: categoryContract
			};
		case GET_CONTRACTS_ERROR:
			return {
				isLoading: false,
				isError: true,
				isCanLoadMore: false,
				isRefresh: false,
				type: categoryContract
			};
		case GET_CONTRACTS:
			return {
				isLoading: true,
				isError: false,
				isCanLoadMore: false,
				isRefresh: action.page === 1,
				type: categoryContract
			};
		default:
			return {
				isLoading: false,
				isError: false,
				isCanLoadMore: false,
				isRefresh: false,
				type: categoryContract
			};
	}
};

const reducer = combineReducers({
	autocompleteAddressReducer,
	listProductReducer,
	changePassReducer,
	checkTokenReducer,
	updateAccountReducer,
	payDebitMoneyReducer,
	getMoneyLoanCloseReducer,
	actionCloseLoanReducer,
	actionLoanExtraReducer,
	getHistoryLoanExtraReducer,
	actionExtentionReducer,
	getHistoryExtentionReducer,
	deletePaymentReducer,
	actionPaymentCustomizeReducer,
	getPaymentCustomizeReducer,
	getHistoryPaymentReducer,
	getContractDetailReducer,
	getFormData,
	Login,
	CheckSession,
	GetRecentReport,
	GetCommonData,
	GetDebtReminder,
	GetContracts,
	signupReducer,
	userInfoReducer
});
export default reducer;
