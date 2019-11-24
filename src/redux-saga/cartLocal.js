export const SET_CART_LOCAL = 'SET_CART_LOCAL';
export const SET_CART_LOCAL_SUCCESS = 'SET_CART_LOCAL_SUCCESS';

export const DELETE_CART_LOCAL = 'DELETE_CART_LOCAL';
export const DELETE_CART_LOCAL_SUCCESS = 'DELETE_CART_LOCAL_SUCCESS';

import { put } from 'redux-saga/effects';
import { Services } from '../services/Services';
import MAsyncStorage from '../Utilities/MAsyncStorage';
import { execute, Method } from '../services/Services';
export const setCartLocalAction = (data) => {
	return {
		type: SET_CART_LOCAL,
		data
	};
};
export const deleteCartLocalAction = () => {
	return {
		type: DELETE_CART_LOCAL
	};
};
const defaultGetFormData = {
	data: null
};
export const cartLocalReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case SET_CART_LOCAL_SUCCESS:
			return {
				data: action.data
			};
		case DELETE_CART_LOCAL_SUCCESS:
			return {
				data: null
			};
		default:
			return state;
	}
};

export function* setCartLocalSaga(action) {
	try {
		console.log('setCartLocalSaga');
		yield put({ type: SET_CART_LOCAL_SUCCESS, data: action.data });
	} catch (error) {
		// yield put({ type: SIGNUP_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
export function* deleteCartLocalSaga(action) {
	try {
		console.log('deleteCartLocalSaga');
		yield put({ type: DELETE_CART_LOCAL_SUCCESS });
	} catch (error) {
		// yield put({ type: SIGNUP_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
