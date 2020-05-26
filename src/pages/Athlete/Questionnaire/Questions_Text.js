import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  Alert
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import QuestionTextComment from "../../../components/QuestionTextComment";
import QuesTem from "../../../components/QuesTem";

import {addNewQuestionAnswer} from '../../../actions/question.action';


import {ErrorUtils} from "../../../utils/auth.utils";

import { ScrollView } from 'react-native-gesture-handler';
import { QuestionString, AlertStrings } from '../../../constants/strings';
import { Actions } from 'react-native-router-flux';

var singleQ = [];
var groupQ = [];

//user add questionnaire text
class QuestionText extends Component<{}>{
  
  componentWillMount () {
    this.props.initialize({QuesType: 'Text', quesTemplate: this.props.QuestionTemplate, Question: this.props.Question, userName: this.props.username});
  } 

  addNewQuestionAnswer = async (values) =>{
    try {
        const response =  await this.props.dispatch(addNewQuestionAnswer(values));

      if(response.success){
        console.log("display questions success");
        Alert.alert(
          '',
          AlertStrings.SubmitQuestionnareSuccess,
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
    this.addNewQuestionAnswer(values)
  }
  
  renderTextInput = (field) =>{
    const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input:{onChange, ...restInput}} = field;
    return(
      <View>
        <QuestionTextComment 
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
    const {QuestionForUser: {userQuestion}} = this.props;
    const view = userQuestion ? userQuestion: [];

    const pickedChoices = [];
    view.personal.map((val) =>{
      if(val._id === this.props.QuestionID){
        pickedChoices.push(val)
        singleQ.push(val.Question)
      }
    })

    const group = view.team.map((val) =>{
      if(val._id === this.props.QuestionID){
        pickedChoices.push(val)
        groupQ.push(val.Question)

      }
    })

      return(
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex:0.5}}>
                  <View >
                    {singleQ[0] === groupQ[0] ?
                      <View>
                        <Text style={{fontSize: 25}}>{singleQ[0]}</Text>
                      </View>
                    :
                    <View>
                      <Text style={{fontSize: 25}}>{singleQ[0]}{groupQ[0]}</Text>
                      </View>}
                    <Text style={styles.templateType}>({pickedChoices && pickedChoices[0].quesTemplate || "lol"}):</Text>
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Field name="userComment" component={this.renderTextInput} />
                    <Field name="userName" component={this.QuesTem} />
                    <Field name="Question" component={this.QuesTem} />
                    <Field name="QuesType" component={this.QuesTem} />
                    <Field name="quesTemplate" component={this.QuesTem} />

                  </View>

                  <View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                      <Text style={styles.buttonText}>{QuestionString.Submit}</Text>
                    </TouchableOpacity>
                  </View>

              </View>
            </ScrollView>
          </View>
    )
    }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex:1
  },

  templateType:{
    marginBottom:40,
    paddingTop:5
  },

  text:{
    fontSize:20
  },

  input: {
    paddingLeft: 15,
    paddingRight: 15
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

mapStateToProps = (state) => ({
  QuestionForUser: state.questionReducer.QuestionForUser
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "questionTextAnswer"
  })
)(QuestionText);

