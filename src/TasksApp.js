import React, { Component } from 'react';
import TaskForm from './TaskForm'
import TodoRow from './TodoRow'
import {connect} from 'react-redux'
import {addTaskStart,toggleTaskStart} from './AppState'
import Loading from './Loading'

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

class TasksApp extends Component {
  render() {
    let {addTask,toggleTask,tasks} = this.props;
    return (
      <div style={styles.container}>
            <div style={styles.formContainer}>
                <TaskForm addTask={addTask} />
            </div>
            <div>
              <Loading loading={tasks.loading} />
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

export default connect(mapStateToProps,{addTask:addTaskStart,toggleTask:toggleTaskStart})(TasksApp);