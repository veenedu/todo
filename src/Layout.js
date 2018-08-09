import React, { Component } from 'react';
import {connect} from 'react-redux'
import TasksApp from './TasksApp';

class Layout extends Component {
  render() {
    let {user} = this.props;
    return (
      <TasksApp />
    );
  }
}

const mapStateToProps = function(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Layout);