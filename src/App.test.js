import React from 'react';
import App from './containers/FriendListApp';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';

import reducers from './reducers/friendlist';

import * as commonTypes from './constants/CommonTypes'
import FriendListItem from './components/FriendListItem';
import {addFriend, deleteFriend, starFriend, setFriendGender, resetState, nextPage, backPage} from './actions/FriendsActions';

Enzyme.configure({ adapter: new Adapter() });

// html element name selector
const ELM_NAME_STAR_FRIEND = 'star-friend';
const ELM_NAME_PAG_BACK_BTN = 'back-btn';
const ELM_NAME_PAG_NEXT_BTN = 'next-btn';

function getStore(){
  
  const createStore = require('redux').createStore;
  const store = createStore(reducers);

  store.dispatch(resetState())

  return store;
}

function renderApp(){
  
  let store = getStore();

  return Enzyme.render(<App store={store} friendlist={store.getState()} />);
}

function mountApp(){

  let store = getStore();

  return Enzyme.mount(<App store={store} friendlist={store.getState()} />);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

beforeAll(() => {

  const info = 'It is the application set of tests \n' +
  'There are two categories of tests, [DOM] and [REDUCER] \n' +
  '[DOM] : It\'s gonna test the behavior from the HTML perpective \n' +
  '[REDUCER] : It\'s gonna test the reducer action results';

  console.info(info);
});

it('[DOM] at intial state the list should have N (page size limit) items', () => {

  let app = renderApp(); 

  let listItems = app.find(`[name='${FriendListItem.name}']`);
  
  expect(listItems).toHaveLength(commonTypes.PAGE_ENTRIES_SIZE);
});

it('[DOM] at initial state the first item should be starred', () => {

  let app = renderApp();

  // get the main result list
  let listItems = app.find(`[name=${FriendListItem.name}]`);
  // get the first  item
  let firstItem = listItems.first(); 

  expect(firstItem.find(`[name=${ELM_NAME_STAR_FRIEND}]`).hasClass('fa-star')).toBeTruthy();
});

it('[DOM] at initial state the second item should not be starred', () => {

  let app = renderApp();

  // get the main result list
  let listItems = app.find(`[name=${FriendListItem.name}]`);
  let lastItem = listItems.last(); 

  expect(lastItem.find(`[name=${ELM_NAME_STAR_FRIEND}]`).hasClass('fa-star-o')).toBeTruthy();
});

it('[DOM] at initial state starring the second item it should has the style changed', () => {

  let app = mountApp();

  // get the main result list
  let listItems = app.find(`[name="${FriendListItem.name}"]`);
  let lastItem = listItems.last(); 

  let star = lastItem.find(`[name="${ELM_NAME_STAR_FRIEND}"]`);

  star.simulate('click');

  listItems = app.find(`[name="${FriendListItem.name}"]`);
  lastItem = listItems.last();

  expect(lastItem.find(`[name="${ELM_NAME_STAR_FRIEND}"]`).hasClass('fa-star')).toBeTruthy();

});

it('[DOM] at initial state the pagination back button should not exists', () => {
  
  let app = renderApp();

  let backBtn = app.find(`[name=${ELM_NAME_PAG_BACK_BTN}]`);

  expect(backBtn).toHaveLength(0);
});

it('[DOM] at initial state the pagination next button should exists', () => {
  
  let app = renderApp();

  let nextBtn = app.find(`[name=${ELM_NAME_PAG_NEXT_BTN}]`);

  expect(nextBtn).toHaveLength(1);
});

it('[DOM] at initial state after one next pagination the list should have 1 (one item)', () => {
  
  // TODO : This test is not passing
  // for some reason, after simulate the click event
  // the event is fired and the application state is updated
  // but the retrieved HTML doesn't change
  // https://github.com/airbnb/enzyme/issues/1153

  let app = mountApp();
  let appInstance = app.instance();

  let nextBtn = app.find('[name="next-btn"]');

  let listItems = app.find(`[name="${FriendListItem.name}"]`);

  nextBtn.simulate('click');

  app = app.update();

  app.setState(app.props().store.getState(), () => {

    app.instance().forceUpdate(()=> {

        app = app.update();
        listItems = app.find(`[name="${FriendListItem.name}"]`);
    
        expect(listItems).toHaveLength(1);
    
    });
  });
 
});

it('[reducer] from initial state add a new register', () => {
  
  const createStore = require('redux').createStore;
  let store = createStore(reducers);

  let initialCount = store.getState().friendsById.length;

  store.dispatch(addFriend('test'));

  expect(store.getState().friendsById).toHaveLength(initialCount + 1);
});

it('[reducer] from initial state delete a register', () => {
  
  const createStore = require('redux').createStore;
  let store = createStore(reducers);

  let initialCount = store.getState().friendsById.length;

  store.dispatch(deleteFriend(0));

  expect(store.getState().friendsById).toHaveLength(initialCount - 1);
});

it('[reducer] from initial state add N random new registers', () => {
  
  const createStore = require('redux').createStore;
  let store = createStore(reducers);

  let initialCount = store.getState().friendsById.length;

  var items = getRandomInt(50, 500);

  for(var i=0; i < items; i++){
    store.dispatch(addFriend('test'));
  }

  expect(store.getState().friendsById).toHaveLength(initialCount + items);
});

it('[reducer] from initial state add and then delete N random registers', () => {
  
  let store = getStore()

  let initialCount = store.getState().friendsById.length;

  var addedItems = getRandomInt(50, 100);

  for(var i=0; i < addedItems; i++){
    store.dispatch(addFriend('test'));
  }

  var delItems = getRandomInt(1, 50);

  for(var i=0; i < delItems; i++){
    store.dispatch(deleteFriend(i));
  }

  let expectedLength = ((initialCount + addedItems) - delItems);

  expect(store.getState().friendsById).toHaveLength(expectedLength);
});

it('[reducer] from initial state after star a register', () => {
  
  let store = getStore();

  store.dispatch(starFriend(2));

  let stared = Boolean(store.getState().friendsById[2].starred);

  expect(stared).toBeTruthy();
});

it('[reducer] from initial state change a user gender', () => {
  
  let store = getStore();

  let initialCount = store.getState().friendsById.length;

  store.dispatch(addFriend('test'));

  store.dispatch(setFriendGender(initialCount, commonTypes.GENRE_FEM));

  expect(store.getState().friendsById[initialCount].gender).toBe(commonTypes.GENRE_FEM);
});

it('[reducer] from initial state add N random registers and update all with a single gender', () => {
  
  let store = getStore();

  let initialCount = store.getState().friendsById.length;

  var addedItems = getRandomInt(50, 100);

  for(var i=0; i < addedItems; i++){
    store.dispatch(addFriend('test'));
  }

  let totalCount = initialCount + addedItems;

  for(var i=0; i < totalCount; i++){
    store.dispatch(setFriendGender(i, (Math.random() >= 0.5) ? commonTypes.GENRE_MASC : commonTypes.GENRE_FEM));
  }

  for(var i=0; i < totalCount; i++){
    store.dispatch(setFriendGender(i, commonTypes.GENRE_MASC));
  }

  for(var i=0; i < totalCount; i++){
    expect(store.getState().friendsById[i].gender).toBe(commonTypes.GENRE_MASC)
  }

});