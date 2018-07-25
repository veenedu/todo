import React, { Component } from 'react';

import Checked from 'react-icons/lib/md/check'
import Unchecked from 'react-icons/lib/io/android-checkbox-outline-blank'

const styles= {
  container:{
    display:'flex',
    backgroundColor:'#f4f4f4',
    borderBottom:'1px solid #ddd',
    flex:1
  },
  left:{
    display:'flex',
    padding:12
  },
  right:{
    flex:1,
    display:'flex',
    alignItems:'center',
    paddingLeft:16
  }
}

export default function TodoRow(props){
  let {task, onToggle}= props;
  return <div style={styles.container}>
        <div  style={styles.left} onClick={()=>{onToggle(task)}}>
          {task.completed? <Checked /> : <Unchecked />}
        </div>
        <div  style={{...styles.right, textDecoration: task.completed && 'line-through' }}>{task.text}</div>
  </div>
}
