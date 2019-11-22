export const GET_FORM_DATA = 'GET_FORM_DATA';
export const GET_FORM_DATA_SUCCESS = 'GET_FORM_DATA_SUCCESS';
export const GET_FORM_DATA_ERROR = 'GET_FORM_DATA_ERROR';

export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_ERROR';

export const CHECK_SESSION = 'CHECK_SESSION';
export const CHECK_SESSION_SUCCESS = 'CHECK_SESSION_SUCCESS';
export const CHECK_SESSION_ERROR = 'CHECK_SESSION_ERROR';

export const GET_RECENT_REPORT = 'GET_RECENT_REPORT';
export const GET_RECENT_REPORT_SUCCESS = 'GET_RECENT_REPORT_SUCCESS';
export const GET_RECENT_REPORT_ERROR = 'GET_RECENT_REPORT_ERROR';

export const GET_COMMON_DATA = 'GET_COMMON_DATA';
export const GET_COMMON_DATA_SUCCESS = 'GET_COMMON_DATA_SUCCESS';
export const GET_COMMON_DATA_ERROR = 'GET_COMMON_DATA_ERROR';

export const GET_DEBT_REMINDER = 'GET_DEBT_REMINDER';
export const GET_DEBT_REMINDER_SUCCESS = 'GET_DEBT_REMINDER_SUCCESS';
export const GET_DEBT_REMINDER_ERROR = 'GET_DEBT_REMINDER_ERROR';

export const GET_CONTRACTS = 'GET_CONTRACTS';
export const GET_CONTRACTS_SUCCESS = 'GET_CONTRACTS_SUCCESS';
export const GET_CONTRACTS_ERROR = 'GET_CONTRACTS_ERROR';

export const getFormData = (params) => {
	return {
		type: GET_FORM_DATA,
		params: params
	};
};

export const login = (username, password) => {
	return {
		type: LOG_IN,
		username: username,
		password: password
	};
};

export const checkSession = () => {
	return {
		type: CHECK_SESSION
	};
};

export const getRecentReport = () => {
	return {
		type: GET_RECENT_REPORT
	};
};

export const getCommonData = () => {
	return {
		type: GET_COMMON_DATA
	};
};

export const getDebtReminder = (type, page) => {
	return {
		type: GET_DEBT_REMINDER,
		type1: type,
		page: page
	};
};

export const getContracts = (type, page, search, startDate, endDate, categoryID) => {
	return {
		type: GET_CONTRACTS,
		type1: type,
		page: page,
		startDate: startDate,
		endDate: endDate,
		categoryID: categoryID,
		search: search
	};
};
