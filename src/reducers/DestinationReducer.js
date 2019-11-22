import {
    GET_ALL_DESTINATION,
    ADD_A_DESTINATION,
    UPDATE_DESTINATION,
    DELETE_DESTINATION,
    BATCH_DELETE
} from 'Actions/types';

const INIT_STATE = {
    listDestination: [],
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
        case GET_ALL_DESTINATION: {
            return {
                ...state,
                listDestination: action.payload.list,
                paging: action.payload.paging
            };
        }

        case UPDATE_DESTINATION: {
            var { id } = action.payload;


            var index = findIndex(state.listDestination, id);
            
            const list = [...state.listDestination];
            list[index] = action.payload;

            return {
                ...state,
                listDestination: list

            };


        }

        case DELETE_DESTINATION: {
            state.listDestination = state.listDestination.filter(listDestination => listDestination.id.toString() !== action.payload.id.toString());
            return {
                ...state
            }
        }

        case BATCH_DELETE: {
            let newList = state.listDestination.filter(account => {
                return action.payload.indexOf(account.id) < 0; 
            });
            let newPaging = {...state.paging};
            newPaging.count = state.paging - 1;
            return{
                ...state,
                listDestination: newList,
                paging: newPaging   
            }
        }

        case ADD_A_DESTINATION: {
            state.listDestination.unshift(action.payload);
            return { ...state };
        }
        default: return state;
    }
}