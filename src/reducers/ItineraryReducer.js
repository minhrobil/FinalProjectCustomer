import {
    LIST_ITINERARIES,
    ADD_ITINERARIES,
    UPDATE_ITINERARIES,
    DELETE_ITINERARIES,
    BATCH_DELETE,
} from 'Actions/types';

const INIT_STATE = {
    items: [],
    currentParent: {},
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
        case LIST_ITINERARIES: {
            return {
                ...state,
                items: action.payload.list,
                paging: action.payload.paging
            };
        }

        case UPDATE_ITINERARIES: {
            var { id } = action.payload;


            var index = findIndex(state.listCategory, id);
            const list = [...state.listCategory];
            list[index] = action.payload;
            // state.listCategory[index].title = action.payload.title;
            // state.listCategory[index].type = action.payload.type;
            // state.listCategory[index].alias = action.payload.alias;

            return {
                ...state,
                listCategory: list

            };


        }

        // case UPADATE_PARENT: {
        //     return {...state}
        // }

        // case GET_ALL_PARENT: {
        //     return {
        //         ...state,
        //         currentParent: action.payload
        //     }
        // }

        case BATCH_DELETE: {
            let newList = state.listCategory.filter(account => {
                return action.payload.indexOf(account.id) < 0; 
            });
            let newPaging = {...state.paging};
            newPaging.count = state.paging - 1;
      
            return { 
                ...state, 
                listCategory: newList,
                paging: newPaging
            };
        }

        case DELETE_ITINERARIES: {
            state.listCategory = state.listCategory.filter(listCategory => listCategory.id.toString() !== action.payload.id.toString());
            return {
                ...state
            }
        }
        case ADD_ITINERARIES: {
            state.listCategory.unshift(action.payload);
            return { ...state };
        }

        default: return state;
    }
}