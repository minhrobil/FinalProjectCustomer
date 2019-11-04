/**
 * Auth User Reducers
 */
import {
    
} from 'Actions/types';
import { UPLOAD_IMAGE, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_SUCCESS } from '../actions/types';

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

var uploadImage = (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return { ...state, isLoading: true };
        case UPLOAD_IMAGE_ERROR:
            return { ...state, isLoading: false, isSuccess:true, data: action.payload, message:action.message  };
        case UPLOAD_IMAGE_SUCCESS:
            return { ...state, isLoading: false, isSuccess:false, isError:true, data: action.payload, message:action.message };
        default: return state
    }
}
export {
    uploadImage
}