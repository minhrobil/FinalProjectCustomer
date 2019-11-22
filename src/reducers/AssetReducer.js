import {
    GET_ALL_ASSET,
    GET_ASSET_DETAIL,
    ADD_A_ASSET,
    UPDATE_ASSET,
    DELETE_ASSET,
} from 'Actions/types';
const INIT_STATE = {

    listAssets: [],



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
        case GET_ALL_ASSET: {
            return {
                ...state,
                listAssets: action.payload.list,
            };
        }
        case ADD_A_ASSET: {
            state.listAssets.unshift(action.payload)
            return {
                ...state
            }
        }
        case DELETE_ASSET: {
            state.listAssets = state.listAssets.filter(listAssets => listAssets.id.toString() !== action.payload.id.toString());
            return {
                ...state
            }
        }
        case UPDATE_ASSET: {
            var { id } = action.payload;


            var index = findIndex(state.listAssets, id);
            // state.listAssets[index].title = action.payload.title;
            // state.listAssets[index].type = action.payload.type;
            // state.listAssets[index].alias = action.payload.alias;
            const list = [...state.listAssets];
            list[index] = action.payload;

            return {
                ...state,
                listAssets: list

            };


        }
        default: return state;
    }
}