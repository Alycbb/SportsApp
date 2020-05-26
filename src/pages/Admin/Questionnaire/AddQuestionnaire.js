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


import {addNewQuestionnaire} from "../../../actions/question.action";



import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";


import {Actions} from 'react-native-router-flux';
import { AlertStrings, QuestionString } from '../../../constants/strings';

//page to add new questionnaire
class AddQuestionnaire extends Component<{}>{


    addNewQuestionnaire = async(values) =>{
        try {
          //dispatch action to add questionnaire
        const response =  await this.props.dispatch(addNewQuestionnaire(values));
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
        //jump back to previous page
        Actions.pop();


        } catch (error) {
        const newError = new ErrorUtils(error, "Error");
        newError.showAlert();
        }
    }

  onSubmit = (values) =>{
    this.addNewQuestionnaire(values);
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

      
      return(
        <View style = {styles.container} >
          {/* input questionnaire name */}
            <Field name="name" placeholder="Questionnaire Name" component={this.renderTextInput} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                <Text style={styles.buttonText}>{QuestionString.Submit}</Text>
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
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "newQuestionnaire"
  })
)(AddQuestionnaire);
