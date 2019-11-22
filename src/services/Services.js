import MAsyncStorage from '../Utilities/MAsyncStorage';
import apisauce from 'apisauce';
import { Endpoint } from './EndPoint';
import { Constant } from '../Utilities/Constant';
import { NavigationActions, StackActions } from 'react-navigation';

const BASE_API = 'https://api2.mecash.vn/';

export const Method = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE'
};

function getInstance(baseUrl, user) {
	return apisauce.create({
		baseURL: baseUrl,
		timeout: 50000,
		headers: {
			'Content-Type': 'application/json',
			Authorization: user.token ? 'Bearer ' + user.token : undefined
		}
	});
}

export function* execute(endpoint, method, params) {
	let response = undefined;
	const user = yield MAsyncStorage.getUserInfo();
	const baseUrl = yield MAsyncStorage.getBaseUrl();
	switch (method) {
		case Method.GET:
			response = yield getInstance(baseUrl, user).get(endpoint, params);
			break;
		case Method.POST:
			response = yield getInstance(baseUrl, user).post(endpoint, params);
			break;
		case Method.PUT:
			response = yield getInstance(baseUrl, user).put(endpoint, params);
			break;
		case Method.DELETE:
			response = yield getInstance(baseUrl, user).delete(endpoint, params);
			break;
		default:
			response = yield getInstance(baseUrl, user).get(endpoint, params);
			break;
	}
	if (response.data && response.data.Result === -1 && Constant.navigation) {
		Constant.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [ NavigationActions.navigate({ routeName: 'login' }) ]
			})
		);
	}
	console.log('Services Endpoint', endpoint);
	console.log('Services Response', response);
	return response;
}

function* getFormData(params) {
	return yield execute(Endpoint.GET_FORM_DATA, Method.GET, params);
}

function* login(username, password) {
	return yield execute(Endpoint.API_LOG_IN, Method.POST, {
		username: username,
		password: password
	});
}

function* checkSession() {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute(Endpoint.API_CHECK_SESSION, Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token
	});
}

function* getRecentReport() {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute(Endpoint.API_GET_RECENT_REPORT, Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		IsDashboardOwner: 1
	});
}

function* getCommonData() {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute(Endpoint.API_GET_COMMON_DATA, Method.GET, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token
	});
}

function* getDebtReminder(type, page) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute(Endpoint.API_GET_DEBT_REMINDER, Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		TypeProduct: type,
		Status: 1000,
		StaffId: 0,
		GeneralSearch: '',
		Page: page,
		PerPage: 20
	});
}

function* getContracts(type, page, search, startDate, endDate, categoryID) {
	const user = yield MAsyncStorage.getUserInfo();
	return yield execute(Endpoint.API_GET_CONTRACTS, Method.POST, {
		UserID: user.Id,
		ShopID: user.ShopID,
		Token: user.Token,
		TypeProduct: type,
		Status: categoryID,
		GeneralSearch: search ? search : '',
		Page: page,
		PerPage: 20,
		FromDate: startDate,
		ToDate: endDate
	});
}

export const Services = {
	getFormData,
	login,
	checkSession,
	getRecentReport,
	getCommonData,
	getDebtReminder,
	getContracts
};
