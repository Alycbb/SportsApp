import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import { Field, reduxForm} from 'redux-form';

import {LoginSignupString, QuestionString, AlertStrings} from "../constants/strings";


import InputText from "../components/InputText";

import {loginUser} from "../actions/auth.actions";
import Logo from "../components/Logo";

import Loader from "../components/Loader";
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },

  signupTextCont:{
      flexGrow:1,
      justifyContent:'center',
      alignItems:'flex-end',
      paddingVertical:16,
      flexDirection: 'row'    
    },

  signupText:{
    fontSize:16
  },

  signupbotton:{
    color:"#4682B4",
    fontSize:16,
    fontWeight:'bold'
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
  },
});

//the page to login
class Login extends Component<{}>{

  signup() {
    Actions.signup()
  }

  //call the login action in "auth.actions"
  loginUser = async (values) =>{
    try {
      const response = await this.props.dispatch(loginUser(values));
      console.log(response);
      if(!response.success){
        throw response;
      }else{
        if(response.responseBody.user.status === 'frozen'){
          console.log("Frozen Account");
          Alert.alert(
            AlertStrings.oops,
            AlertStrings.frozen,
            [
              {
                text: AlertStrings.OK,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
          );
        }else{
          console.log("Login Success");
        }
      }
    } catch (error) {
      console.log(error.responseBody)
      let errorText = LoginSignupString.IncorrectInfo;
        if (error.message) {
          this.errorText = error.message;
          console.log("a");
        } else if (error.responseBody && error.responseBody.message) {
            errorText = error.responseBody.message;
            console.log("b");
        } else if (error.responseBody && error.responseBody === 'wrong password or email') {
          errorText = LoginSignupString.IncorrectInfo
          console.log("c");
        } else if (error.responseBody && error.responseBody === 'Database Disconnected!') {
          errorText = LoginSignupString.DbDisconnected
          console.log("c");
        }


        Alert.alert(
          LoginSignupString.LoginFailed,
          errorText,
          [
            {
              text: AlertStrings.OK,
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
    }
  }


  onSubmit = (values) =>{
    this.loginUser(values);
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
    const { handleSubmit, loginUser} = this.props;
    const {getUser: {userDetails}} = this.props;
    const view = userDetails ? userDetails: '';
    return(
      <View style = {styles.container} >
        {(loginUser && loginUser.isLoading) && <Loader />}
        <Logo/>
        <Field 
            name="email" 
            placeholder={LoginSignupString.Email}
            component={this.renderTextInput} />
        <Field 
            name="password" 
            secureTextEntry={true}
            placeholder={LoginSignupString.Password}
            component={this.renderTextInput} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
          <Text style={styles.buttonText}>{LoginSignupString.LogIn}</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>{LoginSignupString.HaveAccount}</Text>
        <TouchableOpacity onPress={this.signup}>
          <Text style={styles.signupbotton}> {LoginSignupString.SignUp}</Text>
        </TouchableOpacity>
        </View>
    </View>
    )
  }
}

const validate = (values) => {
  const errors = {};
  if(!values.email){
    errors.email = LoginSignupString.RequireEmail
  }

  if(!values.password){
    errors.password = LoginSignupString.RequirePassword
  }
  return errors;
};

mapStateToProps = (state) => ({
  loginUser : state.authReducer.loginUser,
  getUser: state.userReducer.getUser

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "login",
    validate
  })
)(Login);

