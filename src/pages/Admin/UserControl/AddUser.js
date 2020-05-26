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

import AddUserInput from "../../../components/AddUserInput";
import UserType_dropDown from "../../../components/userType_dropdown";
import Gender_dropDown from "../../../components/gender_dropdown";
import Grade_dropDown from "../../../components/grade_dropdown";





import {createNewUser} from "../../../actions/auth.actions";


import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";


import {Actions} from 'react-native-router-flux';

//Add New User
class AddUser extends Component<{}>{

  componentWillMount () {
    this.props.initialize({ quesTemplate: this.props.tem, QuesType: this.props.QuesType });
  } 

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
          Actions.actionsUC();
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
 
  renderUserTypeDropDown = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
       <View>
          <UserType_dropDown
            onChangeText={onChange}
            label={label}
            {...restInput}
          />
          {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
       </View>
    );
  }; 

  renderGenderDropDown = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
       <View>
          <Gender_dropDown
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

  renderTextInput = (field) =>{
    const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input:{onChange, ...restInput}} = field;
    return(
      <View>
        <AddUserInput 
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
    const {handleSubmit, createUser} = this.props;
      
      return(
        <View style = {styles.container} >
        {createUser.isLoading && <Loader />}
        <Field name="userType" component={this.renderUserTypeDropDown} />
        <Field name="name" placeholder="Name" component={this.renderTextInput} />
        <Field name="email" placeholder="Email" component={this.renderTextInput} />
        <Field name="password" secureTextEntry={true} placeholder="Password" component={this.renderTextInput} />
        <Field name="gender" component={this.renderGenderDropDown} />
        <Field name="category" component={this.renderGradeDropdownList} />

        




        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        
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
    createUser:state.authReducer.createUser
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "User"
  })
)(AddUser);
