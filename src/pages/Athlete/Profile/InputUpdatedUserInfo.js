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

import Grade_dropDown from "../../../components/grade_dropdown";
import InputText from "../../../components/InputText";
import QuesTem from "../../../components/QuesTem";

import {AlertStrings} from "../../../constants/strings";
import {UserControlStrings} from "../../../constants/strings";

import {getUserByName} from "../../../actions/user.action";
import {logoutUser} from "../../../actions/auth.actions";
import {updateUserInfo} from "../../../actions/auth.actions";

import {Actions} from 'react-native-router-flux';
import {ErrorUtils} from "../../../utils/auth.utils";
import { ScrollView } from 'react-native-gesture-handler';

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

//input Update user information
class InputNewInfo extends Component<{}>{
    componentWillMount () {
        this.props.initialize({ userID: this.props.userid, newUserName: this.props.username, email: this.props.email, weight: this.props.weight, height: this.props.height, newGrade: this.props.category });
      } 

      updateUserInfo = async(values) =>{
        try {
          const response =  await this.props.dispatch(updateUserInfo(values));
          if(response.success){
            Alert.alert(
                '',
                AlertStrings.Success,
                [
                  {text: AlertStrings.OK, onPress: () => {this.props.dispatch(getUserByName({userName: this.props.username})); Actions.pop()}},
                ],
                {cancelable: false},
              );
          }else{
            throw response;
          }
          

        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    }
  
    onSubmit = (values) =>{
        if(values.newPassword === values.newPasswordAgain){
            this.updateUserInfo(values)
        }else{
            Alert.alert(
                AlertStrings.Error,
                AlertStrings.PasswordNotMatch,
                [
                  {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
    }

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
      };

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

      

  render(){
    const {handleSubmit} = this.props;

    const {getUser: {userDetails}} = this.props;

    // const newPasswordDFirst = (event, newValue, previousValue, name) => {
    //     console.log(newValue)
    //   };

    //   const newPasswordSecond = (event, newValue, previousValue, name) => {
    //     console.log(newValue)
    //   };

    return(
        <View style = {styles.container} >
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Field
                    name="userID"
                    component={this.QuesTem} />
                <Field
                    name="newUserName"
                    placeholder="Name"
                    component={this.renderTextInput} />
                <Field
                    name="email"
                    placeholder="Email"
                    component={this.renderTextInput} />
                <Field 
                    name="newPassword" 
                    secureTextEntry={true}
                    placeholder="newPassword"
                    component={this.renderTextInput}/>
                <Field 
                    name="newPasswordAgain" 
                    secureTextEntry={true}
                    placeholder="Re-enter newPassword"
                    component={this.renderTextInput} />
                <Field 
                    name="weight" 
                    placeholder="weight"
                    component={this.renderTextInput} />
                <Field 
                    name="height" 
                    placeholder="height"
                    component={this.renderTextInput} />

                {/* <Field 
                    name="newGrade" 
                    placeholder="Grade"
                    component={this.renderGradeDropdownList} /> */}

                <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                    <Text style={styles.buttonText}>{UserControlStrings.Submit}</Text>
                </TouchableOpacity>
            </ScrollView>
       
        
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: "updateUserInfo",
    })
  )(InputNewInfo);
