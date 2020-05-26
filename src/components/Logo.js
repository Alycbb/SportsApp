import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
} from 'react-native';

import {LoginSignupString} from "../constants/strings" ;

//display the logo when signup and login
export default class Logo extends Component<{}>{
    render(){
        return(
            <View style={styles.container}>
                <Image style = {{width:200, height:100}} source = {require('../Images/logo.png')}/>
                <Text style={styles.logoText}> {LoginSignupString.Welcome}</Text>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flexGrow: 1,
      justifyContent:'center',
      alignItems:'center'
    },
    logoText:{
        marginVertical: 15,
        fontSize:18,
        fontWeight: "bold"
    }
})
