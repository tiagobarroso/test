import React, { Component, PropTypes } from 'react';
import * as types from '../constants/CommonTypes';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

class FriendList extends Component {
  render () {
    return (
      <ul className={styles.friendList}>
        {
          this.props.friends
          .map((friend, index) => {
            
            return (
              <FriendListItem
                key={index}
                id={index}
                name={friend.name}
                starred={friend.starred}
                gender={friend.gender}
                {...this.props.actions} />
            );
          })
        }
      </ul>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
