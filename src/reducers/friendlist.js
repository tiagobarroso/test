import * as types from '../constants/ActionTypes';
import * as commonTypes from '../constants/CommonTypes'

const initialState = {
  friendsById: [
    {
      name: 'Theodore Roosevelt',
      starred: true,
      genre: commonTypes.GENRE_MASC
    },
    {
      name: 'Condoleezza Rice',
      starred: false,
      genre: commonTypes.GENRE_FEM
    },
    {
      name: 'George Washington',
      starred: false,
      genre: commonTypes.GENRE_MASC
    }
  ],
  page : [],
  pageNumber: 1,
  hasMore: false
};

export default function friends(state = initialState, action) {
  switch (action.type) {

    case types.ADD_FRIEND:
        
      state.friendsById = [
        ...state.friendsById,
        {
          name: action.name
        }
      ];

      return {
        ...state,
        page: handleFriendListSize(state)
      };

    case types.DELETE_FRIEND:
    
      let id = ((state.pageNumber - 1) * commonTypes.PAGE_ENTRIES_SIZE) + action.id;
      state.friendsById = state.friendsById.filter((item, index) => index !== id);
      let page = handleFriendListSize(state);
      
      if(page.length == 0 && state.pageNumber > 1){
        state.pageNumber -= 1;
      }
      
      return {
        ...state,
        page: handleFriendListSize(state)
      };

    case types.STAR_FRIEND:

      id = ((state.pageNumber - 1) * commonTypes.PAGE_ENTRIES_SIZE) + action.id;
      let friends = [...state.friendsById];
      let friend = friends.find((item, index) => index === id);
      friend.starred = !friend.starred;
      
      return {
        ...state,
        page: handleFriendListSize(state)
      };
    
    case types.SET_FRIEND_GENRE:
      
      id = ((state.pageNumber - 1) * commonTypes.PAGE_ENTRIES_SIZE) + action.id;
      friends = [...state.friendsById];
      friend = friends.find((item, index) => index === id);
      friend.genre = Number(action.genre);
      
      return {
        ...state,
        page: handleFriendListSize(state)
      };
    
    case types.NEXT_PAGE:

      state.pageNumber += 1;

      return {
        ...state,
        page: handleFriendListSize(state)
      };

    case types.BACK_PAGE:

      state.pageNumber -= 1;
      
      return {
        ...state,
        page: handleFriendListSize(state)
      };

    default:
      state.page = handleFriendListSize(state) 
      return state;
  }
}

function handleFriendListSize(state){

  let lastIndex = state.pageNumber * commonTypes.PAGE_ENTRIES_SIZE;
  let startIndex = lastIndex - commonTypes.PAGE_ENTRIES_SIZE;

  state.hasMore = (state.friendsById.length > lastIndex)
  return [...state.friendsById].slice(startIndex, lastIndex);
}