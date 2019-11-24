export const AUTOCOMPLETE_ADDRESS = 'AUTOCOMPLETE_ADDRESS';
export const AUTOCOMPLETE_ADDRESS_SUCCESS = 'AUTOCOMPLETE_ADDRESS_SUCCESS';
export const AUTOCOMPLETE_ADDRESS_ERROR = 'AUTOCOMPLETE_ADDRESS_ERROR';
import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
import { api } from '../services/Services';

export const autocompleteAddressAction = (string) => {
	return {
		type: AUTOCOMPLETE_ADDRESS,
		string
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const autocompleteAddressReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case AUTOCOMPLETE_ADDRESS_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case AUTOCOMPLETE_ADDRESS_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case AUTOCOMPLETE_ADDRESS:
			return {
				data: [],
				isLoading: true
			};
		default:
			return state;
	}
};
export function* autocompleteAddressService(string) {
	return yield api.get(
		`https://maps.googleapis.com/maps/api/place/autocomplete/json?&types=geocode&language=vi&region=vn&components=country:vn&key=AIzaSyAX2PANITOz9OwOu1oaj3QGZGQelGywIyA&input=` +
			string,
		{}
	);
}
export function* autocompleteAddressSaga(action) {
	try {
		const response = yield autocompleteAddressService(action.string);
		console.log('autocompleteAddressSaga', response);
		if (response.status === 200) {
			if (response.data.status === 'OK') {
				yield put({
					type: AUTOCOMPLETE_ADDRESS_SUCCESS,
					data: response.data.predictions,
					message: response.data.status
				});
			} else {
				yield put({
					type: AUTOCOMPLETE_ADDRESS_ERROR
					// code: response.data.status_code,
					// message: response.data.msg
				});
			}
		} else {
			yield put({
				type: AUTOCOMPLETE_ADDRESS_ERROR
				// code: response.data.status_code,
				// message: response.data.msg
			});
		}
	} catch (error) {
		yield put({ type: AUTOCOMPLETE_ADDRESS_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
