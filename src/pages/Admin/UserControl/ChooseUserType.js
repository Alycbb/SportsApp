import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


import {connect} from "react-redux";

import {showUserList} from "../../../actions/auth.actions";

import {ErrorUtils} from "../../../utils/auth.utils";

import {Actions} from 'react-native-router-flux';

//choose user type to show user list
class UserType extends Component<{}>{


  showUserList = async (usertype) =>{
    try {
      const response =  await this.props.dispatch(showUserList(usertype));
      if(response.success){
        console.log("finally")

      }else{
        throw response;
      }

      Actions.viewUser({usertype: usertype});


    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

    

    show = (usertype) =>{
      this.showUserList(usertype)
    }

    render(){
        const {UserList: {userList}} = this.props;

        

        const data = [{
          value: 'Athlete',
        },{
          value: 'Coach'
        }];

        return(
            <View style={styles.container}>
                
                <Dropdown containerStyle = {{width:100}}
                    label = "User Type"
                    data = {data}
                    onChangeText = {(value) =>{
                      this.setState({
                        selectedValue: value 
                    });
                    this.show(value);
                    }}/>


            </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },

  checklist:{
      // flexGrow:1,
    justifyContent:'center',
    alignItems:'flex-end',
    paddingVertical:10,
    fontWeight:'bold',
    marginTop:30,
    backgroundColor: '#FFF0F5',
    padding:5,
    borderRadius:7
    

  },

  text:{
      fontSize:19,
      fontWeight:'500',
      color:'#000000',
      textAlign: 'left',
  }


});

mapStateToProps = (state) => ({
    UserList: state.userReducer.UserList
  })
  
  mapDispatchToProps = (dispatch) => ({
    dispatch
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserType);