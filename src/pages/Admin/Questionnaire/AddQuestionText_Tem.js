import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  Alert,
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import QusTemplate_dropDown from "../../../components/quesTemplate_dropdown";
import QuestionInput from "../../../components/QuestionInput";
import QuesTem from "../../../components/QuesTem";
import Loader from "../../../components/Loader";

import { QuestionString } from '../../../constants/strings';
import { AlertStrings } from '../../../constants/strings';

import {addNewQuestion} from "../../../actions/question.action";
import {ErrorUtils} from "../../../utils/auth.utils";

import {Actions} from 'react-native-router-flux';

//Add Questions
//Add Text Question
class addQuestion_Text extends Component<{}>{

  //set default value of some fields
  //the values were passed from last page
  componentWillMount () {
    this.props.initialize({ quesTemplate: this.props.tem, QuesType: this.props.QuesType, teamName: this.props.team });
  } 

  // dispatch action
  addNewQuestion = async(values) =>{
    try {
      const response =  await this.props.dispatch(addNewQuestion(values));
      if(response.success){
        Alert.alert(
          AlertStrings.Success,
          AlertStrings.AddQuestionSuccess,
          [
            //Action.pop(): go back to last page
            //pass value "quesTemplate" to last page
            {text: AlertStrings.OK, onPress: () => Actions.pop({quesTemplate: this.props.tem})},
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
    this.addNewQuestion(values);

  }

  //field component
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

  //field component
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

  //field component
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
      const {handleSubmit, addQuestion} = this.props;
      const {tem} = this.props.tem;
      const {QuesType} = this.props.QuesType;

      return(
        <View style={styles.container}>
          {addQuestion.isLoading && <Loader />}
          <Field name="quesTemplate" component={this.QuesTem} />
          <Field name="QuesType" component={this.QuesTem} />
          <Field name="teamName" component={this.QuesTem} />
          <Field name="Question" placeholder="Question" component={this.renderTextInput} />
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
// can also call multiple reducers, combine into single tree
  addQuestion: state.questionReducer.addQuestion,
  // initialValues:{
  //   quesTemplate: tem
  // }
})
mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "questionText"
  })
)(addQuestion_Text);
