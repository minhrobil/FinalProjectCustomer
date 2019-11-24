import { all, put, takeLatest } from 'redux-saga/effects';
import {
	CHECK_SESSION,
	CHECK_SESSION_ERROR,
	CHECK_SESSION_SUCCESS,
	GET_COMMON_DATA,
	GET_COMMON_DATA_ERROR,
	GET_COMMON_DATA_SUCCESS,
	GET_CONTRACTS,
	GET_CONTRACTS_ERROR,
	GET_CONTRACTS_SUCCESS,
	GET_DEBT_REMINDER,
	GET_DEBT_REMINDER_ERROR,
	GET_DEBT_REMINDER_SUCCESS,
	GET_FORM_DATA,
	GET_FORM_DATA_ERROR,
	GET_FORM_DATA_SUCCESS,
	GET_RECENT_REPORT,
	GET_RECENT_REPORT_ERROR,
	GET_RECENT_REPORT_SUCCESS,
	LOG_IN,
	LOG_IN_ERROR,
	LOG_IN_SUCCESS
} from './Action';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { getContractDetailSaga, GET_CONTRACT_DETAIL } from './contractDetail';
import { getHistoryPaymentSaga, GET_HISTORY_PAYMENT } from './historyPayment';
import { getPaymentCustomizeSaga, GET_PAYMENT_CUSTOMIZE } from './paymentCustomize';
import { ACTION_PAYMENT_CUSTOMIZE, actionPaymentCustomizeSaga } from './actionPaymentCustomize';
import { DELETE_PAYMENT, deletePaymentSaga } from './deletePayment';
import { ACTION_EXTENTION, actionExtentionSaga } from './actionExtention';
import { GET_HISTORY_EXTENTION, getHistoryExtentionSaga } from './historyExtention';
import { getHistoryLoanExtraSaga, GET_HISTORY_LOAN_EXTRA } from './historyLoanExtra';
import { actionLoanExtraSaga, ACTION_LOAN_EXTRA } from './actionLoanExtra';
import { actionCloseLoanSaga, ACTION_CLOSE_LOAN } from './actionCloseLoan';
import { getMoneyLoanCloseSaga, GET_MONEY_LOAN_CLOSE } from './moneyLoanClose';
import { payDebitMoneySaga, PAY_DEBIT_MONEY } from './payDebitMoney';
import { signupSaga, SIGNUP } from './signup';
import { setUserInfoSaga, SET_USER_INFO, deleteUserInfoSaga, DELETE_USER_INFO } from './userInfo';
import { UPDATE_ACCOUNT, updateAccountSaga } from './updateAccount';
import { checkTokenSaga, CHECK_TOKEN } from './checkToken';
import { changePassSaga, CHANGE_PASS } from './changePass';
import { listProductSaga, LIST_PRODUCT } from './listProduct';
import { autocompleteAddressSaga, AUTOCOMPLETE_ADDRESS } from './autocompleteAddress';
import { setCartLocalSaga, SET_CART_LOCAL, deleteCartLocalSaga, DELETE_CART_LOCAL } from './cartLocal';
import { createOrderSaga, CREATE_ORDER } from './createOrder';
import { listOrderPendingSaga, LIST_ORDER_PENDING } from './listOrderPending';
import { createProductSaga, CREATE_PRODUCT } from './createProduct';
import { deleteProductSaga, DELETE_PRODUCT } from './deleteProduct';
function* getFormData(action) {
	try {
		const response = yield Services.getFormData(action.params);
		if (response.status === 200) {
			yield put({ type: GET_FORM_DATA_SUCCESS, data: response.data });
		} else {
			yield put({ type: GET_FORM_DATA_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_FORM_DATA_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

function* login(action) {
	try {
		const response = yield Services.login(action.username, action.password);
		console.log('login', response);
		if (response.status === 200) {
			if (response.data.status === 'success') {
				yield MAsyncStorage.setAccountInfo(action.username, action.password);
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({ type: LOG_IN_SUCCESS, data: response.data.data, message: response.data.msg });
			} else {
				yield put({ type: LOG_IN_ERROR, code: response.data.status_code, message: response.data.msg });
			}
		} else {
			yield put({ type: LOG_IN_ERROR, code: response.data.status_code, message: response.data.msg });
		}
	} catch (error) {
		yield put({ type: LOG_IN_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

function* checkSession(action) {
	try {
		const response = yield Services.checkSession();
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: CHECK_SESSION_SUCCESS, data: response.data.Data });
			} else {
				yield put({ type: CHECK_SESSION_ERROR, code: response.data.Result, message: response.data.Message });
			}
		} else {
			yield put({ type: CHECK_SESSION_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: CHECK_SESSION_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

function* getRecentReport(action) {
	try {
		const response = yield Services.getRecentReport();
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_RECENT_REPORT_SUCCESS, data: response.data.Data });
			} else {
				yield put({
					type: GET_RECENT_REPORT_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_RECENT_REPORT_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_RECENT_REPORT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

function* getCommonData(action) {
	try {
		const response = yield Services.getCommonData();
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_COMMON_DATA_SUCCESS, data: response.data.Data });
			} else {
				yield put({ type: GET_COMMON_DATA_ERROR, code: response.data.Result, message: response.data.Message });
			}
		} else {
			yield put({ type: GET_COMMON_DATA_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_COMMON_DATA_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

function* getDebtReminder(action) {
	try {
		const response = yield Services.getDebtReminder(action.type1, action.page);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_DEBT_REMINDER_SUCCESS, data: response.data.Data });
			} else {
				yield put({
					type: GET_DEBT_REMINDER_ERROR,
					code: response.data.Result,
					message: response.data.Message
				});
			}
		} else {
			yield put({ type: GET_DEBT_REMINDER_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_DEBT_REMINDER_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

function* getContracts(action) {
	try {
		const response = yield Services.getContracts(
			action.type1,
			action.page,
			action.search,
			action.startDate,
			action.endDate,
			action.categoryID
		);
		if (response.status === 200) {
			if (response.data.Result === 1) {
				yield put({ type: GET_CONTRACTS_SUCCESS, data: response.data.Data });
			} else {
				yield put({ type: GET_CONTRACTS_ERROR, code: response.data.Result, message: response.data.Message });
			}
		} else {
			yield put({ type: GET_CONTRACTS_ERROR, code: response.status });
		}
	} catch (error) {
		yield put({ type: GET_CONTRACTS_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

function* watchGetContracts() {
	yield takeLatest(GET_CONTRACTS, getContracts);
}

function* watchGetDebtReminder() {
	yield takeLatest(GET_DEBT_REMINDER, getDebtReminder);
}

function* watchAll() {
	yield takeLatest(DELETE_PRODUCT, deleteProductSaga);

	yield takeLatest(CREATE_PRODUCT, createProductSaga);

	yield takeLatest(LIST_ORDER_PENDING, listOrderPendingSaga);

	yield takeLatest(CREATE_ORDER, createOrderSaga);
	yield takeLatest(DELETE_CART_LOCAL, deleteCartLocalSaga);
	yield takeLatest(SET_CART_LOCAL, setCartLocalSaga);
	yield takeLatest(AUTOCOMPLETE_ADDRESS, autocompleteAddressSaga);
	yield takeLatest(LIST_PRODUCT, listProductSaga);
	yield takeLatest(CHANGE_PASS, changePassSaga);
	yield takeLatest(CHECK_TOKEN, checkTokenSaga);
	yield takeLatest(UPDATE_ACCOUNT, updateAccountSaga);
	yield takeLatest(SET_USER_INFO, setUserInfoSaga);
	yield takeLatest(DELETE_USER_INFO, deleteUserInfoSaga);
	yield takeLatest(SIGNUP, signupSaga);
	yield takeLatest(PAY_DEBIT_MONEY, payDebitMoneySaga);
	yield takeLatest(ACTION_CLOSE_LOAN, actionCloseLoanSaga);
	yield takeLatest(GET_MONEY_LOAN_CLOSE, getMoneyLoanCloseSaga);
	yield takeLatest(ACTION_LOAN_EXTRA, actionLoanExtraSaga);
	yield takeLatest(GET_HISTORY_LOAN_EXTRA, getHistoryLoanExtraSaga);
	yield takeLatest(ACTION_EXTENTION, actionExtentionSaga);
	yield takeLatest(GET_HISTORY_EXTENTION, getHistoryExtentionSaga);
	yield takeLatest(DELETE_PAYMENT, deletePaymentSaga);
	yield takeLatest(ACTION_PAYMENT_CUSTOMIZE, actionPaymentCustomizeSaga);
	yield takeLatest(GET_PAYMENT_CUSTOMIZE, getPaymentCustomizeSaga);
	yield takeLatest(GET_HISTORY_PAYMENT, getHistoryPaymentSaga);
	yield takeLatest(GET_CONTRACT_DETAIL, getContractDetailSaga);
	yield takeLatest(GET_FORM_DATA, getFormData);
	yield takeLatest(LOG_IN, login);
	yield takeLatest(CHECK_SESSION, checkSession);
	yield takeLatest(GET_RECENT_REPORT, getRecentReport);
	yield takeLatest(GET_COMMON_DATA, getCommonData);
}

export default function* saga() {
	yield all([ watchAll(), watchGetContracts(), watchGetDebtReminder() ]);
}
