import React, {Component, PropTypes} from 'react';
import styles from './FriendListItem.css';

function PageBackBtn(props) {
    
    if(props.pageNumber > 1){
        return (
            <button name="back-btn" className={`btn btn-default ${styles.btnPagLeft}`} 
                onClick={() => props.action()}>
                <i className="fa fa-chevron-left" />
            </button>
        );
    }else{
        return(
            null
        );
    }
}

function PageNextBtn(props) {

    if(props.hasMore){
        return (
            <button name="next-btn" type="button" className={`btn btn-default ${styles.btnPagRight}`}
                    onClick={() => props.action()} id="ixi'">
                <i className="fa fa-chevron-right" />
            </button>    
        );
    }else{
        return(null);
    }
}

class Paginator extends Component {

    render() {
       
        return (
            <div>
                <PageBackBtn pageNumber={this.props.pageNumber} action={this.props.actions.backPage}></PageBackBtn>
                <PageNextBtn hasMore={this.props.hasMore} action={this.props.actions.nextPage}></PageNextBtn>
            </div>
        );       
    }
}

Paginator.propTypes = {
    actions: PropTypes.object.isRequired,
    itensCount: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    hasMore: PropTypes.bool.isRequired
};

export default Paginator