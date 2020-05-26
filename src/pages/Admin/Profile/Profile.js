import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from "react-redux";


import {ProfileStrings} from "../../../constants/strings";

import {logoutUser} from "../../../actions/auth.actions";

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  
  textStyle:{
      color:"#fff",
      fontSize:18
  },
  button:{
    backgroundColor:'#4682B4',
    borderRadius:25,
    width:300,
    paddingVertical:12,
    marginVertical: 10
  },

  buttonText:{
    fontSize:16,
    fontWeight:'500',
    color:'#000000',
    textAlign:'center'
  }

});
// dislay personal information
class Profile extends Component<{}>{

  logoutUser = () => {
    this.props.dispatch(logoutUser());
  }

  render(){
    const {getUser: {userDetails}} = this.props;
    console.log(this.props);
    return(
      <View style = {styles.container}>
          <Text style={styles.textStyle}>{ProfileStrings.Name}{userDetails ? userDetails.user.name : ""}</Text>
          <Text style={styles.textStyle}>{ProfileStrings.Email} {userDetails ? userDetails.user.email : ""}</Text>
          {userDetails.user.userType !== "Administrator" ?
            <View>
              <Text style={styles.textStyle}>{ProfileStrings.Team} {userDetails ? userDetails.user.team[0] : ""}</Text>
            </View>
            :
            null}
          <TouchableOpacity style={styles.button} onPress={() =>this.logoutUser()}>
            <Text style={styles.buttonText}>{ProfileStrings.Logout}</Text>
        </TouchableOpacity>
    </View>
    )
  }
}



mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);