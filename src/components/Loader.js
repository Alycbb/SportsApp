//Displays a circular loading indicator
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  ActivityIndicator
} from 'react-native';

import {Actions} from 'react-native-router-flux';

//when the state is loading, show this page
//called by other pages in return()
export default class Loader extends Component<{}>{

  render(){
    return(
      <View style = {styles.container}>
          <ActivityIndicator color="#ffffff" size="large"/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "rgba(0,0,0,0.4)",
    position:"absolute",
    width:"100%",
    height:"100%",
    zIndex: 99,
    justifyContent: "center"
  }
});

