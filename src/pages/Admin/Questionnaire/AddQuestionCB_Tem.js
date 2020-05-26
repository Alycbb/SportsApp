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

import QusTemplate_dropDown from "../../../components/quesTemplate_dropdown";
import QuestionInput from "../../../components/QuestionInput";
import QuesTem from "../../../components/QuesTem";


import {addNewQuestion} from "../../../actions/question.action";

import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";


import {Actions} from 'react-native-router-flux';
import { AlertStrings, QuestionString } from '../../../constants/strings';

//Add Questions
//Add CheckBox Questions
class addQuestion_CB extends Component<{}>{

  //initialize default value of some fields
  //the values were passed from last page
  componentWillMount () {
    this.props.initialize({ quesTemplate: this.props.tem, QuesType: this.props.QuesType, Number: this.props.ON  });
  } 

  addNewQuestion = async(values) =>{
      try {
        // dispatch action to add new question
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

  render(){
      const {handleSubmit, addQuestion} = this.props;
      
      return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
            {addQuestion.isLoading && <Loader />}

            <Field name="quesTemplate" component={this.QuesTem}/>
            <Field name="QuesType" component={this.QuesTem}/>
            <Field name="Number" placeholder="Number_options" component={this.QuesTem} />
            <Field name="Question" placeholder="Question" component={this.renderTextInput} />
            <Field name="option1" placeholder="Text_choice_1" component={this.renderTextInput} />
            <Field name="option2" placeholder="Text_choice_2" component={this.renderTextInput} />
            
            {/* the displayed fields change with option number */}
            {this.props.ON === 3 ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
            </View>
            :null} 
            {this.props.ON === 4 ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
            </View>
            :null}           
            {this.props.ON === 5 ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
            </View>
            :null}
            {this.props.ON === 6 ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
              <Field name="option6" placeholder="Text_option_6" component={this.renderTextInput} /> 
            </View>
            :null}
            {this.props.ON === 7 ?
            <View>
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
              <Field name="option6" placeholder="Text_option_6" component={this.renderTextInput} /> 
              <Field name="option7" placeholder="Text_option_7" component={this.renderTextInput} />
            </View>
            :null}
            {this.props.ON === 8 ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
              <Field name="option6" placeholder="Text_option_6" component={this.renderTextInput} /> 
              <Field name="option7" placeholder="Text_option_7" component={this.renderTextInput} /> 
              <Field name="option8" placeholder="Text_option_8" component={this.renderTextInput} /> 
            </View>
            :null}
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
  //actions were dispatched above, then use reducer to store data
  //in next page, call the same reducer then we can get the data inside
  addQuestion: state.questionReducer.addQuestion
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "questionCB"
  })
)(addQuestion_CB);
