import {
  LIST_REVIEW,
    ADD_REVIEW,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    UPDATE_STATUS_REVIEW
} from 'Actions/types';

const INIT_STATE = {
  listReview: [],
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
      case LIST_REVIEW: {
          return {
              ...state,
              listReview: action.payload.list,
              paging: action.payload.paging
          };
      }

      case UPDATE_REVIEW: {
          console.log('action',action.payload);
          
          var { id } = action.payload;


          var index = findIndex(state.listReview, id);
          var list = [...state.listReview];
          list[index] = action.payload;
          // state.listCategory[index].title = action.payload.title;
          // state.listCategory[index].type = action.payload.type;
          // state.listCategory[index].alias = action.payload.alias;

          return {
              ...state,
              listReview: list

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

      case DELETE_REVIEW: {
          let newList = state.listReview.filter(account => {
              return action.payload.indexOf(account.id) < 0; 
          });
          let newPaging = {...state.paging};
          newPaging.count = state.paging - 1;
    
          return { 
              ...state, 
              listReview: newList,
              paging: newPaging
          };
      }

      // case DELETE_CATEGORY: {
      //     state.listCategory = state.listCategory.filter(listCategory => listCategory.id.toString() !== action.payload.id.toString());
      //     return {
      //         ...state
      //     }
      // }

      case ADD_REVIEW: {
          // state.listCategory.unshift(action.payload);

          return { ...state };
      }

      default: return state;
  }
}