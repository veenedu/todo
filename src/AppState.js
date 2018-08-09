import {combineReducers,createStore,applyMiddleware} from 'redux'
import {call,takeEvery,put} from 'redux-saga/effects'
import { delay} from 'redux-saga'
import axios from 'axios'
import createSagaMiddleWare from 'redux-saga';


const sagaMiddleWare = createSagaMiddleWare();

//ACTIONS
const GET_TASKS_START     = 'GET_TASKS_START'
const GET_TASKS_SUCCESS    = 'GET_TASKS_SUCCESS'
const ADD_TASK_START      = 'ADD_TASK_START'
const ADD_TASK_SUCCESS      = 'ADD_TASK_SUCCESS'
const TOGGLE_TASKS_START  = 'TOGGLE_TASKS_START';
const TOGGLE_TASKS_SUCCESS  = 'TOGGLE_TASKS_SUCCESS';
const TOGGLE_TASKS_LOCALLY = 'TOGGLE_TASKS_LOCALLY';


//Action Creators
export function addTaskStart(taskText){
  return {
    type:ADD_TASK_START,
    payload:taskText
  }
}

export function addTaskSuccess(task){
  return {type:ADD_TASK_SUCCESS,payload: task}
}

export function toggleTaskStart(task){
  return {
    type:TOGGLE_TASKS_START,
    payload:task
  }
}

export function toggleTaskLocaly(task){
  return {
    type:TOGGLE_TASKS_LOCALLY,
    payload:task
  }
}

export function getTasks(){
  return {type:GET_TASKS_START}
}

export function getTasksSuccess(tasks){
  return {type:GET_TASKS_SUCCESS,payload: tasks}
}


//Reducers
let defaultTasks= {
  loading:null, 
  data:[]
}


function tasksReducer(state=defaultTasks, action){
      if(action.type=== TOGGLE_TASKS_LOCALLY){
          let tasks =  state.data.map((task)=>{
              if(task.id == action.payload.id){
                task.completed = !task.completed
              }
              return task;
          })
          return {...state,data:tasks,loading:null}
      }

      // if(action.type === TOGGLE_TASKS_START){
      //   return {...state,loading:'updating task....'}
      // }

      if(action.type === GET_TASKS_START){
        return {...state,loading:'Fetching tasks....'}
      }

      if(action.type === ADD_TASK_START){
        return {...state,loading:'Adding task....'}
      }


      if(action.type === GET_TASKS_SUCCESS || action.type===ADD_TASK_SUCCESS){
        return {...state,data:state.data.concat(action.payload), loading:null}
      }

      return state;
}


function userReducer(){
  return null;
}

let rootReducer ={
  tasks: tasksReducer,
  user:userReducer
}


//Sagas
//'s' at begining of function names indicates they are sagas

//Saga codes
function* sGetTasks(action){
  yield delay(1000)
  let response = yield call(axios,{url:`/getTasks`})
  let tasks = response.data;
  yield put(getTasksSuccess(tasks.data));
}

function* sAddTask(action){
  yield delay(1000)
  let response = yield call(axios,{url:`/addTask`,method:'POST',data:{taskText:action.payload}})
  let task = response.data.task;
  yield put(addTaskSuccess(task));
}

function* sToggleTask(action){
  //Perform action
  yield put(toggleTaskLocaly(action.payload));  
  //update server
  let response = yield call(axios,{url:`/toggleTask`,method:'POST',data:{taskId:action.payload.id}})
  
  //If request fails, reverse it
  if(!response.data.success){
    yield put(toggleTaskLocaly(action.payload));  
  }
}

function* rootSaga(){
  yield takeEvery(GET_TASKS_START,sGetTasks)
  yield takeEvery(ADD_TASK_START,sAddTask)
  yield takeEvery(TOGGLE_TASKS_START,sToggleTask)
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
