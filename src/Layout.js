import React, { Component } from 'react';
import {connect} from 'react-redux'
import TasksApp from './TasksApp';
import UserManagement from './UserManagement';

class Layout extends Component {
  render() {
    let {user} = this.props;
    let Component = !user? UserManagement : TasksApp
    return <Component />
  }
}

const mapStateToProps = function(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Layout);