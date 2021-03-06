import React, { Component } from 'react';
import TaskForm from './TaskForm'
import TodoRow from './TodoRow'
import {connect} from 'react-redux'
import {addTask,toggleTask} from './AppState'

const styles= {
  container:{
    display:'flex',
    flexDirection:'column',
    width:700,
    margin:'20px auto'
  },
  formContainer:{
    display:'flex',
  },
  listContainer:{
    display:'flex',
    marginTop:15,
    flexDirection:'column',
  }
}

class Layout extends Component {
  render() {
    let {addTask,toggleTask,tasks} = this.props;
    return (
      <div style={styles.container}>
            <div style={styles.formContainer}>
                <TaskForm addTask={addTask} />
            </div>
            <div style={styles.listContainer}>
                {tasks.data.map((task,i)=>{
                    return <TodoRow task={task} onToggle={toggleTask} key={i} />
                })}
            </div>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps,{addTask,toggleTask})(Layout);
