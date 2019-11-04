import {
    GET_ALL_TOUR,
    ADD_A_TOUR,
    UPDATE_TOUR,
    UPDATE_DEPARTURE_IN_TOUR,
    DELETE_TOUR,
    GET_TOUR_DETAIL,
    GET_TOUR_RATES
} from 'Actions/types';

const INIT_STATE = {
    listTour: [],
    currentTour: {},
    paging: {
        count: 0,
        totalPage: 1,
        perpage: 1,
        page: 1
    },
    listRates: []
    
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
        case GET_ALL_TOUR: {
            return {
                ...state,
                listTour: action.payload.list,
                paging: action.payload.paging
            };
        }
      
        case UPDATE_TOUR: {
            var { id } = action.payload;
    
    
            var index = findIndex(state.listTour, id);  
            state.listTour[index].title = action.payload.title;
            state.listTour[index].code = action.payload.code;
            state.listTour[index].alias = action.payload.alias;
            state.listTour[index].userid = action.payload.userid;
            state.listTour[index].city_id = action.payload.city_id;
      
            return {
                ...state,
                listTour: state.listTour
    
            };
    
    
        }

        case UPDATE_DEPARTURE_IN_TOUR: {
            return {...state}
        }

        case GET_TOUR_DETAIL: {
            console.log(action.payload)
            return {...state, currentTour: action.payload}
        }

        case DELETE_TOUR:{
            state.listTour= state.listTour.filter(listTour=> listTour.id.toString() !== action.payload.id.toString());
            return{
                ...state
            }
        }
        case ADD_A_TOUR: {
            state.listTour.unshift(action.payload);
            return { ...state };
        }
        case GET_TOUR_RATES: {
            return { ...state, listRates: action.payload };
        }
        default: return state;
    }
}