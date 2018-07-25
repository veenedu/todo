import React, { Component } from 'react';

const styles= {
  form:{
    display:'flex',
    border:'1px solid #eee'
  },
  left:{
    flex:1,
  },
  right:{
    width:150,
    background:'#2196f3',
  },
  input:{
    width:'100%',
    padding:7,
    outline:'none',
    border:'none'
  },
  button:{
    width:'95%',
    padding:4,
    border:'none',
    color:'#fff',
    fontSize:16,
    background:'#2196f3',
    outline:'none',
  }
}

class TaskForm extends Component {
  handleSubmit =(e)=>{
    e.preventDefault()
    let taskText  =this.refs.taskText.value;
    this.props.addTask(taskText) //trigger action
    this.refs.taskText.value='' //clear textbox
  }
  render() {
    return (
      <form style={styles.form} onSubmit={this.handleSubmit}>
          <div style={styles.left}>
                <input style={styles.input} ref="taskText" />
          </div>
          <div style={styles.right}>
            <input style={styles.button} type="submit" value="submit" />
          </div>
      </form>
    );
  }
}

export default TaskForm;
