import MAsyncStorage from '../Utilities/MAsyncStorage';
import apisauce from 'apisauce';
import { Endpoint } from './EndPoint';
import { Constant } from '../Utilities/Constant';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';

const BASE_API = 'http://18.138.58.252/FinalProjectAPI/';
export const api = axios.create({
	baseURL: BASE_API,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
});

api.interceptors.request.use(
	async (config) => {
		const user = await MAsyncStorage.getUserInfo();

		if (user && user.token) {
			config.headers.common['Authorization'] = 'Bearer ' + user.token;
		}
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
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
			Authorization: user ? (user.token ? 'Bearer ' + user.token : undefined) : undefined
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
	return yield execute('login', Method.POST, {
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
