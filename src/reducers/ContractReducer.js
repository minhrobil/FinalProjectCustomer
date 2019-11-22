import {
    GET_ALL_CONTRACT,
    
} from 'Actions/types';

const INIT_STATE = {
    listContract: [],
    paging: {
        count: 0,
        totalPage: 1,
        perpage: 1,
        page: 1
    },
    
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CONTRACT: {
            return {
                ...state,
                listContract: action.payload.list,
                paging: action.payload.paging
            };
        }
      
        default: return state;
    }
}