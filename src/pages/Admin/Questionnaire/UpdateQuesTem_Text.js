import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import {Field, reduxForm} from 'redux-form';

import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";
import {compose} from "redux";

import QusTemplate_dropDown from "../../../components/quesTemplate_dropdown";
import QuestionInput from "../../../components/QuestionInput";
import QuesTem from "../../../components/QuesTem";

import {QuestionString} from "../../../constants/strings";

import {QuestionUpdate} from '../../../actions/question.action';

import {displayQuestions} from '../../../actions/question.action';


import {ErrorUtils} from "../../../utils/auth.utils";

import Loader from "../../../components/Loader";
import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

// Update Question Text
class TemShowUpdateText extends Component<{}>{

  // set default value of Field(TextInput)
  // default value display when this page is loaded
  componentWillMount () {
    this.props.initialize({ 
      OldQuestion: this.props.oldQuestion, 
      Questype: this.props.QuesType, 
      Question: this.props.oldQuestion
    });
  } 

  // dispatch action
  QuestionUpdate = async(values) =>{
      try {
        //dispatch action to update question
        const response =  await this.props.dispatch(QuestionUpdate(values));
        if(response.success){
          Alert.alert(
            QuestionString.Success,
            QuestionString.UpdateSuccess,
            [
              {text: QuestionString.OK, onPress: () =>{
                //dispatch action to display all the questions
                //so when jump back to previous page, the data list get updated immediately
                this.props.dispatch(displayQuestions(this.props.tem));
                Actions.pop({tem: this.props.tem})
              }},
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
      this.QuestionUpdate(values, this.props.oldQuestion);
    }

    //Field Component
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

    //Field Component
    renderDropdownList = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
       <View>
          <QusTemplate_dropDown
            onChangeText={onChange}
            label={label}
            {...restInput}
          />
          {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
       </View>
    );
  }; 

    //Field Component
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
      const {handleSubmit, QuesUpdate} = this.props;
       
        return(
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
              {QuesUpdate.isLoading && <Loader />}
              <Field name="OldQuestion" component={this.QuesTem}/>
              <Field name="Questype" component={this.QuesTem}/>
              {/* <Field name="quesTemplate" placeholder="Template" component={this.renderDropdownList}/> */}
              <Field name="Question" placeholder="Question" component={this.renderTextInput} />
              <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                <Text style={styles.buttonText}>{QuestionString.Submit}</Text>
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
  QuesUpdate: state.questionReducer.QuesUpdate
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "questionUpdate"
  })
)(TemShowUpdateText);

