import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import * as commonTypes from '../constants/CommonTypes'
import styles from './FriendListItem.css';

class FriendListItem extends Component {

  render() {
     
    return (

      <li className={styles.friendListItem} name={FriendListItem.name}>

        <div className={styles.friendInfos}>
          <div><span>{this.props.name}</span></div>
          <div>
            <small>xx friends in common</small>
          </div>
        </div>

        <div className={styles.friendActions}>
          
          <span className="input-group-btn">

            <select className={`form-control ${styles.selectAction}`} 
              value={this.props.gender || ''}
              onChange={(event) => this.props.setFriendGender(this.props.id, event.target.value)}>
              <option value=''>GEN</option>
              <option value={commonTypes.GENRE_MASC}>M</option>
              <option value={commonTypes.GENRE_FEM}>F</option>
            </select>
          
          </span>
          
          <span className="input-group-btn">

            <button className={`btn btn-default ${styles.btnAction}`}
                    onClick={() => this.props.starFriend(this.props.id)}>
              <i className={classnames('fa', {
                'fa-star': this.props.starred,
                'fa-star-o': !this.props.starred
              })} name="star-friend" />
            </button>
            <button className={`btn btn-default ${styles.btnAction}`}
                    onClick={() => this.props.deleteFriend(this.props.id)}>
              <i className="fa fa-trash" />
            </button>

          </span>
        </div>

      </li>
    );
  }
}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired,
  gender: PropTypes.number
};

export default FriendListItem