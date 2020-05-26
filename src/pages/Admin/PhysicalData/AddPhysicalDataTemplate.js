import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import QuestionInput from "../../../components/QuestionInput";
import Loader from "../../../components/Loader";

import {PhysicalDataStrings} from '../../../constants/strings';
import {AlertStrings} from '../../../constants/strings';


import {addPhysicalDataTemplate} from  '../../../actions/physicalData.action';

import {ErrorUtils} from "../../../utils/auth.utils";
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';


//Add Physical Data Template
class AddPhycicalData extends Component<{}>{
  addPhysicalDataTemplate = async(values) =>{
    try {
      // dispatch action to add physical data template
      //pass the value of input data to function
      const response =  await this.props.dispatch(addPhysicalDataTemplate(values));
      
      if(response.success){
        Alert.alert(
          AlertStrings.Success,
          AlertStrings.AddTemplateSuccess,
          [
            {text: AlertStrings.OK, onPress: () => Actions.pop()},
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
  this.addPhysicalDataTemplate(values);
  
}


renderTextInput = (field) =>{
  const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input:{onChange, ...restInput}} = field;
  return(
    <View>
      <QuestionInput 
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
      const {handleSubmit, TemplateAdd} = this.props;

      return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
              {TemplateAdd.isLoading && <Loader />}
            {/* defalut 6 fields for physical datatemplate, if wants more, modify in model in backend */}
              <Field name="templateName" placeholder={PhysicalDataStrings.TemplateName} component={this.renderTextInput} />
              <Field name="field1" placeholder={PhysicalDataStrings.field1} component={this.renderTextInput} />
              <Field name="field2" placeholder={PhysicalDataStrings.field2} component={this.renderTextInput} />
              <Field name="field3" placeholder={PhysicalDataStrings.field3} component={this.renderTextInput} />
              <Field name="field4" placeholder={PhysicalDataStrings.field4}component={this.renderTextInput} />
              <Field name="field5" placeholder={PhysicalDataStrings.field5} component={this.renderTextInput} />
              <Field name="field6" placeholder={PhysicalDataStrings.field6} component={this.renderTextInput} />


              <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                <Text style={styles.buttonText}>{PhysicalDataStrings.Submit}</Text>
              </TouchableOpacity>
          </ScrollView>
          

        </View>  
      )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

  inputBox:{
    width:300,
    backgroundColor:'rgba(255,255,255,0.9)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:16,
    fontWeight: "bold",
    color:'#000000',
    marginVertical: 5
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

mapStateToProps = (state) => ({
  TemplateAdd: state.physicalDataReducer.TemplateAdd
})

mapDispatchToProps = (dispatch) => ({
dispatch
});

export default compose(
connect(mapStateToProps, mapDispatchToProps),
reduxForm({
  form: "physicalDataTemplate"
})
)(AddPhycicalData);
