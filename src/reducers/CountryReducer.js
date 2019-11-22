import {
    GET_ALL_COUNTRY,
    ADD_A_COUNTRY,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
    BATCH_DELETE,
    UPDATE_STATUS_COUNTRY,
} from 'Actions/types';
const INIT_STATE = {

    listCountry: [],
    paging: {
        count: 0,
        totalPage: 1,
        perpage: 1,
        page: 1
    },



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
        case GET_ALL_COUNTRY: {
            return {
                ...state,
                listCountry: action.payload.list,
                paging: action.payload.paging
            };
        }
        case ADD_A_COUNTRY: {
            state.listCountry.unshift(action.payload)
            return {
                ...state
            }
        }
        case DELETE_COUNTRY: {
            state.listCountry = state.listCountry.filter(listCountry => listCountry.id.toString() !== action.payload.id.toString());
            state.paging.count = state.paging.count -1 ;
            return {
                ...state
            }
        }
        case BATCH_DELETE: {
            let newList = state.listCountry.filter(account => {
                return action.payload.indexOf(account.id) < 0; 
            });
            let newPaging = {...state.paging};
            newPaging.count = state.paging - 1;
            newPaging.count = state.paging - action.payload.length;
            return { 
                ...state, 
                listCountry: newList,
                paging: newPaging
            };
          }
        case UPDATE_STATUS_COUNTRY:
        
            let index = findIndex(state.listCountry, action.payload.id);
            let list = [...state.listCountry];
            list[index] = action.payload;
            return {
              ...state,
              listCountry: list
            }
        case UPDATE_COUNTRY: {
            let { id } = action.payload;


            let index = findIndex(state.listCountry, id);
            const list = [...state.listCountry];
            list[index] = action.payload;
           

            return {
                ...state,
                listCountry: list

            };


        }
        default: return state;
    }
}