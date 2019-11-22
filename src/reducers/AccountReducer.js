import { GET_ALL_ACCOUNT, ADD_A_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT, BATCH_DELETE } from 'Actions/types';
const INIT_STATE = {
	listAccount: [],
	paging: {
		count: 0,
		totalPage: 1,
		perpage: 1,
		page: 1
	}
};
function findIndex(arrID, id) {
	if (arrID.length) {
		for (let i = 0; i < arrID.length; i++) {
			if (arrID[i].id.toString() === id.toString()) return i;
		}
	}
	return -1;
}

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_ALL_ACCOUNT: {
			let newList = [ ...action.payload.list ];
			// console.log('===========', newList == state.listAccount);
			return {
				...state,
				listAccount: newList,
				paging: action.payload.paging
			};
		}
		case ADD_A_ACCOUNT: {
			state.listAccount.unshift(action.payload);
			return { ...state };
		}
		case UPDATE_ACCOUNT: {
			let { id } = action.payload;
			let index = findIndex(state.listAccount, id);
			const list = [ ...state.listAccount ];
			list[index] = action.payload;

			return {
				...state,
				listAccount: list
			};
		}
		case DELETE_ACCOUNT: {
			state.listAccount = state.listAccount.filter(
				(listAccount) => listAccount.id.toString() !== action.payload.id.toString()
			);
			state.paging.count = state.paging.count - 1;
			return { ...state };
		}
		case BATCH_DELETE: {
			let newList = state.listAccount.filter((account) => {
				return action.payload.indexOf(account.id) < 0;
			});
			let newPaging = { ...state.paging };
			newPaging.count = state.paging - action.payload.length;

			return {
				...state,
				listAccount: newList,
				paging: newPaging
			};
		}

		default:
			return state;
	}
};
