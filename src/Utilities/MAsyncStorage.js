import AsyncStorage from '@react-native-community/async-storage';

const USER_INFORMATION = 'USER_INFORMATION';
const ACCOUNT_INFORMATION = 'ACCOUNT_INFORMATION';
const BASE_URL = 'BASE_URL';

async function getUserInfo() {
	let user = await AsyncStorage.getItem(USER_INFORMATION);
	if (user) {
		return JSON.parse(user);
	} else {
		return null;
	}
}

async function clearAll() {
	return await AsyncStorage.clear();
}

async function logout() {
	return await AsyncStorage.setItem(USER_INFORMATION, '');
}

async function setUserInfo(user) {
	return await AsyncStorage.setItem(USER_INFORMATION, JSON.stringify(user));
}

async function getAccountInfo() {
	let user = await AsyncStorage.getItem(ACCOUNT_INFORMATION);
	if (user) {
		return JSON.parse(user);
	} else {
		return null;
	}
}

async function setAccountInfo(username, password) {
	return await AsyncStorage.setItem(ACCOUNT_INFORMATION, JSON.stringify({ username: username, password: password }));
}

async function setBaseUrl(isV1) {
	await AsyncStorage.setItem(BASE_URL, 'http://18.138.58.252/FinalProjectAPI/');
}

async function getBaseUrl() {
	const url = await AsyncStorage.getItem(BASE_URL);
	if (url) {
		return url;
	} else {
		return 'http://18.138.58.252/FinalProjectAPI/';
	}
}

export default (MAsysncStorage = {
	setUserInfo,
	getUserInfo,
	clearAll,
	logout,
	getAccountInfo,
	setAccountInfo,
	getBaseUrl,
	setBaseUrl
});
