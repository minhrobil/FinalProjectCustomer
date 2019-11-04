import {
    GET_LIST_FILE_AND_FOLDER,
    CREATE_FOLDER,
    UPLOAD_FILE,
    UPLOAD_IMG,
} from 'Actions/types';

const INIT_STATE = {
    folders: [],
    docs: [],
    images: [],
    videos: [],
    currentfolder: ""
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_FILE_AND_FOLDER: {
            return { ...action.payload, currentfolder: action.currentfolder };
        }
        default: return state;
    }
}

