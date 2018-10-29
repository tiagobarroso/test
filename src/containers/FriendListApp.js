import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend, setFriendGender, nextPage, backPage} from '../actions/FriendsActions';
import { FriendList, AddFriendInput } from '../components';
import Paginator from '../components/Paginator';

class FriendListApp extends Component {

  render () {
    
    const { friendlist: { page }} = this.props;
    const { friendlist: { pageNumber }} = this.props;
    const { friendlist: { hasMore }} = this.props;
    
    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend,
      setFriendGender: this.props.setFriendGender,
      nextPage: this.props.nextPage,
      backPage: this.props.backPage
    };

    return (
      <div>
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={page} actions={actions} />
      </div>
      <div>
        <Paginator itensCount={page.length} pageNumber={pageNumber} actions={actions} hasMore={hasMore} />
      </div>
     </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  setFriendGender,
  nextPage,
  backPage
})(FriendListApp)
