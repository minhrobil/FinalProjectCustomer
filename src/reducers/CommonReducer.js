import {
    CHANGE_STATUS,
    PUBLISH_STATUSES,
    UNPUBLISH_STATUSES
} from 'Actions/types';

const INIT_STATE = {

}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_STATUS: {
            return {...state};
        }
        case PUBLISH_STATUSES: {
            return {...state}
        }
        case UNPUBLISH_STATUSES: {
            return {...state}
        }
    }
}