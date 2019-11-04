/**
 * Auth User Reducers
 */
import {
    
} from 'Actions/types';
import { DELETE_PRODUCT,
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_SUCCESS,
    LIST_PRODUCT,
    LIST_PRODUCT_ERROR, 
    LIST_PRODUCT_SUCCESS, 
    SAVE_PRODUCT, 
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_ERROR 
    } from '../actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
    data:[]
};

var listProduct = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_PRODUCT:
            return { ...state, isLoading: true };
        case LIST_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, isSuccess:true, data: action.payload, message:action.message  };
        case LIST_PRODUCT_ERROR:
            return { ...state, isLoading: false, isSuccess:false, isError:true, data: action.payload, message:action.message };
        default: return state
    }
}
var saveProduct = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SAVE_PRODUCT:
            return { ...state, isLoading: true };
        case SAVE_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, isSuccess:true, data: action.payload, message:action.message  };
        case SAVE_PRODUCT_ERROR:
            return { ...state, isLoading: false, isSuccess:false, isError:true, data: action.payload, message:action.message };
        default: return INIT_STATE
    }
}
var deleteProduct = (state = INIT_STATE, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return { ...state, isLoading: true };
        case DELETE_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, isSuccess:true, data: action.payload, message:action.message  };
        case DELETE_PRODUCT_ERROR:
            return { ...state, isLoading: false, isSuccess:false, isError:true, data: action.payload, message:action.message };
        default: return INIT_STATE
    }
}
export {
    deleteProduct,
    listProduct,
    saveProduct
}