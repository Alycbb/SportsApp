import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import {LoginSignupString} from "../constants/strings";

import Logo from "../components/Logo";
import InputText from "../components/InputText";
import QuesTem from "../components/QuesTem";
import UserType from "../components/userType";
import Grade_dropDown from "../components/grade_dropdown";



import {createNewUser} from "../actions/auth.actions";
import Loader from "../components/Loader";
import {ErrorUtils} from "../utils/auth.utils";

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

  errorTest:{
    color:"#000000",
    fontSize:14,
    paddingHorizontal:16,
    paddingBottom:8
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  }
});

class SignUp extends Component<{}>{

  state = {
    radioSelected: 'Athlete'
  }

  componentWillMount () {
    this.props.initialize({ userType: this.state.radioSelected});
  } 

  goBack(){
    Actions.pop();
  }

  //dispatch createNewUser action from "auth.action.js"
  createNewUser = async (values) =>{
    try {
        const response =  await this.props.dispatch(createNewUser(values));
        if(response.success){
          Alert.alert(
            'Success!',
            'SignUp success',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          Actions.login();
        }else{
          throw response;
        }
      } catch (error) {
        const newError = new ErrorUtils(error, "Signup Error");
        newError.showAlert();
      }
  }

  onSubmit = (values) =>{
    this.createNewUser(values);
  }

  QuesTem = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
      <View>
          <QuesTem
            onChangeText={onChange}
            label={label}
            {...restInput}
          />
          {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
      </View>
    );
  }; 

  renderGradeDropdownList = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
        <View>
            <Grade_dropDown
            onChangeText={onChange}
            label={label}
            {...restInput}
            />
            {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
        </View>
    );
  };

  renderUserType = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
      <View>
          <UserType
            onChangeText={onChange}
            label={label}
            {...restInput}
          />
          {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
      </View>
    );
  }; 

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

  radioClick(option) {
    this.setState({
      radioSelected: option
    })
  }


  render(){
    const {handleSubmit, createUser} = this.props;

    const UserTypes = [
      {
        option: LoginSignupString.Athlete
      },
      {
        option: LoginSignupString.Coach
      },
      {
        option: LoginSignupString.Admin
      },
    ];

    const usertype = UserTypes.map((val) => {
      return (
      <View style={styles.container}>
          <TouchableOpacity key={val.option} onPress={this.radioClick.bind(this, val.option)}>
          <View style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {
              val.option == (this.state && this.state.radioSelected || false) ?
                <View style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#000',
                }} />
                : null
            }
          </View>
        </TouchableOpacity>
        <Text key ={val.option} style={styles.text}>{val.option}</Text>
      </View>
      )
  });




    return(
      <View style = {styles.container} >
        {createUser.isLoading && <Loader />}
        <Logo/>
        <Field
            name="name"
            placeholder="Name"
            component={this.renderTextInput} />
        <Field 
            name="email" 
            placeholder="Email"
            component={this.renderTextInput} />
        <Field 
            name="password" 
            secureTextEntry={true}
            placeholder="Password"
            component={this.renderTextInput} />
          <Field 
            name="category" 
            secureTextEntry={true}
            placeholder="Grade"
            component={this.renderGradeDropdownList} />

        <Field name="userType" component={this.renderUserType} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.buttonText}>{LoginSignupString.SignUp}</Text>
        </TouchableOpacity>
        {/* {usertype} */}
        <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>{LoginSignupString.HaveAccount}</Text>
            <TouchableOpacity onPress={this.goBack}>
              <Text style={styles.signupbotton}> {LoginSignupString.LogIn} </Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  }
}

const validate = (values) => {
  const errors = {};
  if(!values.name){
    errors.name = LoginSignupString.RequireName
  }

  if(!values.email){
    errors.email = LoginSignupString.RequireEmail
  }

  if(!values.password){
    errors.password = LoginSignupString.RequirePassword
  }

  return errors;
};

//called every time the store state changes.
mapStateToProps = (state) => ({
  createUser:state.authReducer.createUser
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "register",
    validate
  })
)(SignUp);