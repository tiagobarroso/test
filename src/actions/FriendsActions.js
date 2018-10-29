import * as types from '../constants/ActionTypes';

export function addFriend(name) {
  return {
    type: types.ADD_FRIEND,
    name
  };
}

export function deleteFriend(id) {
  return {
    type: types.DELETE_FRIEND,
    id
  };
}

export function starFriend(id) {
  return {
    type: types.STAR_FRIEND,
    id
  };
}

export function setFriendGender(id, gender) {
  return {
    type: types.SET_FRIEND_GENRE,
    id,
    gender
  };
}

export function resetState() {
  return {
    type: types.RESET_STATE
  };
}

export function nextPage() {
  return {
    type: types.NEXT_PAGE
  };
}

export function backPage() {
  return {
    type: types.BACK_PAGE
  };
}
