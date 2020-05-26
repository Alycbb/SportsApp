//The first loading file
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';


import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'


import Main from "./Main";

import persist from "./config/store"

const persistStore = persist();

export default class App extends Component<{}>{
  render(){
    return(
      <Provider store={persistStore.store}>
        <PersistGate loading = {null} persistor={persistStore.persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  }
})
