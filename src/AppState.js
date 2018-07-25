// import {combineReducers,createStore} from 'redux'
let combineReducers= require('redux').combineReducers
let createStore= require('redux').createStore

//ACTIONS
const GET_TASKS     = 'GET_TASKS'
const ADD_TASK      = 'ADD_TASK'
const TOGGLE_TASKS  = 'TOGGLE_TASKS';


export function addTask(taskText){
  return {
    type:ADD_TASK,
    payload:taskText
  }
}

export function toggleTask(task){
  return {
    type:TOGGLE_TASKS,
    payload:task
  }
}


//Reducers
let defaultTasks= {
  state:'loaded', //loading, loaded
  data:[]
}

//

let _count=1;
function taskGenerator(taskText){
  return {
    id: _count++,
    text:taskText,
    completed:false
  }
}

function tasksReducer(state=defaultTasks, action){
      if(action.type===ADD_TASK){
        return {...state,data:state.data.concat(taskGenerator(action.payload))}
      }

      if(action.type===TOGGLE_TASKS){
          let tasks =  state.data.map((task)=>{
              if(task.id == action.payload.id){
                task.completed = !task.completed
              }
              return task;
          })
          return {...state,data:tasks}
      }
      return state;
}


let rootReducer ={
  tasks: tasksReducer
}


let store = createStore(combineReducers(rootReducer));

export {store};



// store.subscribe(function(){
//   console.log(store.getState().tasks);
// })

// store.dispatch(addTask('Task 1'))
// store.dispatch(addTask('Task 2'))
// store.dispatch(addTask('Task 3'))
// store.dispatch(toggleTask({id:3}))
