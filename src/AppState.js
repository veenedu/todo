import {combineReducers,createStore,applyMiddleware} from 'redux'
import {call,takeEvery,put} from 'redux-saga/effects'
import { delay} from 'redux-saga'
import axios from 'axios'
import createSagaMiddleWare from 'redux-saga';


const sagaMiddleWare = createSagaMiddleWare();

//ACTIONS
const GET_TASKS_START     = 'GET_TASKS_START'
const GET_TASKS_SUCCESS    = 'GET_TASKS_SUCCESS'
const ADD_TASK      = 'ADD_TASK'
const TOGGLE_TASKS  = 'TOGGLE_TASKS';


//Action Creators
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

export function getTasks(){
  return {type:GET_TASKS_START}
}


//Reducers
let defaultTasks= {
  state:'loaded', //loading, loaded
  data:[]
}
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


//Sagas

//Saga codes
function* sGetTasks(action){
  let response = yield call(axios,{url:`/getTasks`})
  let tasks = response.data;
}

function* rootSaga(){
  return yield takeEvery(GET_TASKS_START,sGetTasks)
}


let store = createStore(combineReducers(rootReducer),applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export {store};









// store.subscribe(function(){
//   console.log(store.getState().tasks);
// })

// store.dispatch(addTask('Task 1'))
// store.dispatch(addTask('Task 2'))
// store.dispatch(addTask('Task 3'))
// store.dispatch(toggleTask({id:3}))
