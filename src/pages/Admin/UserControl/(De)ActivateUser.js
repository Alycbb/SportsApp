import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  Alert,
  ScrollView
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import InputText from "../../../components/InputText";
import UserType_dropDown from "../../../components/userType_dropdown";
import Gender_dropDown from "../../../components/gender_dropdown";


import {getUserByName} from "../../../actions/user.action";
import {changeUserStatus} from "../../../actions/user.action";




import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";


import {Actions} from 'react-native-router-flux';
import { AlertStrings, UserControlStrings } from '../../../constants/strings';

//page to De/Activate User Status
class ChangeUserStatus extends Component<{}>{

    state = {
        thisUser: ''
    };

  

  getUserByName = async (values) =>{
    this.setState({
        thisUser: values
    })
    const response =  await this.props.dispatch(getUserByName(values));
    if(response.responseBody != 'data not found'){
        console.log('match success')
    }else{
        Alert.alert(
            AlertStrings.Error,
            AlertStrings.NoRecord,
            [
                {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
            );
    }
    Actions.refresh();
  }

  changeUserStatus = async(userID, status) =>{
    try {
      const response =  await this.props.dispatch(changeUserStatus({userID: userID, status: status}));
      this.props.dispatch(getUserByName(this.state.thisUser))
      if(response.success){
        Alert.alert(
          '',
          AlertStrings.Success,
          [
            {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );

      }else{
        throw response;
      }
      Actions.refresh();


    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
}

  

  onSubmit = (values) =>{
    this.getUserByName(values);
  }
 
  changeStatus(userID, status){
      this.changeUserStatus(userID, status);
  }


  renderTextInput = (field) =>{
    const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input:{onChange, ...restInput}} = field;
    return(
      <View>
        <InputText 
            onChangeText={onChange}
            maxLength={maxLength}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            label={label}
            {...restInput}/>
        {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
      </View>
    );
  }

  render(){
    const {handleSubmit} = this.props;
    const {userInfo: {OneUser}} = this.props;
    const view = OneUser ? OneUser: {user: []};
    console.log(view)
      
      return(
        <View style = {styles.container} >
        {/* {createUser.isLoading && <Loader />} */}
        <Field name="userName" placeholder="userName" component={this.renderTextInput} />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.buttonText}>{UserControlStrings.Next}</Text>
        </TouchableOpacity>

        {/* when there is no record found after useName input, null, otherwise show user information */}
        {  view.user.name == null ?
            null
            :
            <View>
                <View style= {{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold', fontSize: 17}}>{UserControlStrings.Name}</Text>
                    <Text style={{marginLeft: 10, marginTop: 1}}>{view.user.name}</Text>
                </View>
                <View style= {{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold', fontSize: 17}}>{UserControlStrings.Email}</Text>
                    <Text style={{marginLeft: 10, marginTop: 1}}>{view.user.email}</Text>
                </View>
                <View style= {{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold', fontSize: 17}}>{UserControlStrings.UserStatus}</Text>
                    <Text style={{marginLeft: 10, marginTop: 1}}>{view.user.status}</Text>
                </View>
            </View>}

            {/* when user status is frozen, show "activate" button, otherwise show "Deactivate" button */}
        {  view.user.status == 'frozen' ?
            <View>
                <TouchableOpacity style={{backgroundColor:'peachpuff', borderRadius:5, width: 100, marginTop:5}} onPress={() => this.changeStatus(view.user._id, 'active')}>
                    <Text style={{fontSize:16, fontWeight:'500', color:'#000000', textAlign:'center'}}>{UserControlStrings.Activate}</Text>
                </TouchableOpacity>
            </View>
            :
            null}

        {  view.user.status == 'active' ?
            <View>
                <TouchableOpacity style={{backgroundColor:'grey', borderRadius:5, width: 100, marginTop:5}} onPress={() => this.changeStatus(view.user._id, 'frozen')}>
                    <Text style={{fontSize:16, fontWeight:'500', color:'#000000', textAlign:'center'}}>{UserControlStrings.Deactivate}</Text>
                </TouchableOpacity>
            </View>
            :
            null}
       
        
        
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

  button:{
    backgroundColor:'#4682B4',
    borderRadius:25,
    width:250,
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

mapStateToProps = (state) => ({
    userInfo: state.userReducer.getUserByName
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "UserStatus"
  })
)(ChangeUserStatus);
