import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  ScrollView,
  Alert
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";


import QuestionTextComment from "../../../components/QuestionTextComment";
import QuesTem from "../../../components/QuesTem";

import {addNewQuestionAnswer} from '../../../actions/question.action';


import {ErrorUtils} from "../../../utils/auth.utils";
import { Actions } from 'react-native-router-flux';
import { QuestionString, AlertStrings } from '../../../constants/strings';

var singleQ = [];
var groupQ = [];

//user add questionnaire radiobutton
class QuestionRB extends Component<{}>{
  

  state = {
    comment: ''
  }
  

  radioClick(option) {
    this.setState({
      radioSelected: option
    })
  }

  addNewQuestionAnswer = async () =>{
    try {
        const response =  await this.props.dispatch(addNewQuestionAnswer({QuesType: 'Radio Buttons', quesTemplate: this.props.QuestionTemplate, Question: this.props.Question, userName: this.props.username, Answer: JSON.stringify(this.state.radioSelected), userComment: this.state.comment}));

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

  
  submitAnswer = () =>{
    this.addNewQuestionAnswer()
  }

  
  render(){
    const {handleSubmit} = this.props;
    const {QuestionForUser: {userQuestion}} = this.props;

    const view = userQuestion ? userQuestion: [];

    //we get the selected question ID from previous page to display this question
    //In case in personal and team may both conntain this question
    //we push question from personal and team to an array seperately
    //compare the values in arrays to get only one value
    view.personal.map((val) =>{
      if(val._id === this.props.QuestionID){
        singleQ.push(val.Question)
      }
    })

    view.team.map((val) =>{
      if(val._id === this.props.QuestionID){
        groupQ.push(val.Question)
      }
    })

    const pickedChoices = [];
    view.personal.map((val) =>{
      if(val._id === this.props.QuestionID){
        pickedChoices.push(val)
      }
    });

    view.team.map((val) =>{
      if(val._id === this.props.QuestionID){
        pickedChoices.push(val)
      }
    });
    console.log(pickedChoices[0].option4)

    if(this.props.ON === '8'){
      var options = [
        {
          option: pickedChoices[0].option1 
        },{
          option: pickedChoices[0].option2 
        },{
          option: pickedChoices[0].option3 
        },{
          option: pickedChoices[0].option4 
        },{
          option: pickedChoices[0].option5
        },{
          option: pickedChoices[0].option6
        },{
          option: pickedChoices[0].option7
        },{
          option: pickedChoices[0].option8
        },
      ];
    }else if(this.props.ON === '7'){
      var options = [
        {
          option: pickedChoices[0].option1 
        },{
          option: pickedChoices[0].option2 
        },{
          option: pickedChoices[0].option3 
        },{
          option: pickedChoices[0].option4 
        },{
          option: pickedChoices[0].option5
        },{
          option: pickedChoices[0].option6
        },{
          option: pickedChoices[0].option7
        }
      ];
    }else if(this.props.ON === '6'){
      var options = [
        {
          option: pickedChoices[0].option1 
        },{
          option: pickedChoices[0].option2 
        },{
          option: pickedChoices[0].option3 
        },{
          option: pickedChoices[0].option4 
        },{
          option: pickedChoices[0].option5
        },{
          option: pickedChoices[0].option6
        }
      ];
    }else if(this.props.ON === '5'){
      var options = [
        {
          option: pickedChoices[0].option1 
        },{
          option: pickedChoices[0].option2 
        },{
          option: pickedChoices[0].option3 
        },{
          option: pickedChoices[0].option4 
        },{
          option: pickedChoices[0].option5
        }
      ];
    }else if(this.props.ON === '4'){
      var options = [
        {
          option: pickedChoices[0].option1 
        },{
          option: pickedChoices[0].option2 
        },{
          option: pickedChoices[0].option3 
        },{
          option: pickedChoices[0].option4 
        }
      ];
    }else if(this.props.ON === '3'){
      var options = [
        {
          option: pickedChoices[0].option1 
        },{
          option: pickedChoices[0].option2 
        },{
          option: pickedChoices[0].option3 
        }
      ];
    }else if(this.props.ON === '2'){
      var options = [
        {
          option: pickedChoices[0].option1 
        },{
          option: pickedChoices[0].option2 
        }
      ];
    }

    

      const ee = options.map((val) => {
        return (
        <View style={styles.container}>
            <TouchableOpacity key={val.option} onPress={this.radioClick.bind(this, val.option)}>
            <View style={{
              height: 18,
              width: 18,
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
                    height: 9,
                    width: 9,
                    borderRadius: 3,
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
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex:0.5}}>
                  <View>
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
                  {ee}
                  <View style={styles.inputContainer}>
                    <Text style={{fontSize: 20}}>{QuestionString.AddComment}</Text>
                    <TextInput  
                    multiline
                    numberOfLines = {10}
                    style={styles.CommentBox}  
                    placeholder={QuestionString.WriteDownAnswer}
                    onChangeText={(text) => this.setState({comment: text})}  
                    /> 
                  </View>

                  <View>
                    <TouchableOpacity style={styles.button} onPress={() => this.submitAnswer()}>
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
    flexDirection: "row",
    // justifyContent:'center',
    alignItems:'center',
    flex:1

  },

  templateType:{
    paddingTop:5
  },

  CommentBox:{
    height: 200, 
    textAlignVertical: 'top'
  },

  text:{
    marginLeft:5,
    fontSize: 20
  },

  inputContainer: {
    width:300,
    borderWidth : 1,
    height: 200
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



export default connect(mapStateToProps, mapDispatchToProps)(QuestionRB);


