import React, { Component } from 'react';
import Layout from './Layout'
import {Provider} from 'react-redux'
import {store,getTasks} from './AppState'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Layout />
      </Provider>
    );
  }
}

store.dispatch(getTasks())


export default App;
