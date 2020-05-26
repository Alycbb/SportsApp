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
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import QuestionTextComment from "../../../components/QuestionTextComment";
import QuesTem from "../../../components/QuesTem";

import {addNewQuestionAnswer} from '../../../actions/question.action';


import {ErrorUtils} from "../../../utils/auth.utils";
import { Actions } from 'react-native-router-flux';
import { QuestionString, AlertStrings } from '../../../constants/strings';


var tempCheckValues = [];
var singleQ = [];
var groupQ = [];

//user questionnaire checkbox
class Questions_CB extends Component<{}>{

  state = {
    checked: false,
    checkBoxChecked: [],
    selection: null,
    comment: '',
  }

  addNewQuestionAnswer = async () =>{
    try {
        const response =  await this.props.dispatch(addNewQuestionAnswer({QuesType: 'Check Boxes', quesTemplate: this.props.QuestionTemplate, Question: this.props.Question, userName: this.props.username, Answer: JSON.stringify(this.state.selection), userComment: this.state.comment}));

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

  checkBoxChanged(id, value) {

    console.log("tempCheckValues:");
    console.log(tempCheckValues);
    console.log(tempCheckValues[id]);


    this.setState({
      checkBoxChecked: tempCheckValues
    })


    var tempCheckBoxChecked = this.state.checkBoxChecked;
    tempCheckBoxChecked[id] = !value;

    console.log("tempCheckBoxChecked: ");
    console.log(tempCheckBoxChecked);

    

    this.setState({
      checkBoxChecked: tempCheckBoxChecked
    })

    var selections = [];

    for(var propName in this.state.checkBoxChecked) {
        if(this.state.checkBoxChecked.hasOwnProperty(propName)) {
            var propValue = this.state.checkBoxChecked[propName];
            if(propValue == true){
              selections.push([propName]);
            }
        }
    }
    console.log('plzzzz');
    console.log(selections);
    this.setState({selection: selections})
    console.log(typeof(this.state.selection))


  }


  go(){
    Actions.pop();
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

    console.log(singleQ);
    console.log(groupQ)

//get the clicked CheckBox details
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
  
    if(this.props.ON === '8'){
      var options = [
        {
          id: pickedChoices[0].option1 
        },{
          id: pickedChoices[0].option2 
        },{
          id: pickedChoices[0].option3 
        },{
          id: pickedChoices[0].option4 
        },{
          id: pickedChoices[0].option5
        },{
          id: pickedChoices[0].option6
        },{
          id: pickedChoices[0].option7
        },{
          id: pickedChoices[0].option8
        },
      ];
    }else if(this.props.ON === '7'){
      var options = [
        {
          id: pickedChoices[0].option1 
        },{
          id: pickedChoices[0].option2 
        },{
          id: pickedChoices[0].option3 
        },{
          id: pickedChoices[0].option4 
        },{
          id: pickedChoices[0].option5
        },{
          id: pickedChoices[0].option6
        },{
          id: pickedChoices[0].option7
        }
      ];
    }else if(this.props.ON === '6'){
      var options = [
        {
          id: pickedChoices[0].option1 
        },{
          id: pickedChoices[0].option2 
        },{
          id: pickedChoices[0].option3 
        },{
          id: pickedChoices[0].option4 
        },{
          id: pickedChoices[0].option5
        },{
          id: pickedChoices[0].option6
        }
      ];
    }else if(this.props.ON === '5'){
      var options = [
        {
          id: pickedChoices[0].option1 
        },{
          id: pickedChoices[0].option2 
        },{
          id: pickedChoices[0].option3 
        },{
          id: pickedChoices[0].option4 
        },{
          id: pickedChoices[0].option5
        }
      ];
    }else if(this.props.ON === '4'){
      var options = [
        {
          id: pickedChoices[0].option1 
        },{
          id: pickedChoices[0].option2 
        },{
          id: pickedChoices[0].option3 
        },{
          id: pickedChoices[0].option4 
        }
      ];
    }else if(this.props.ON === '3'){
      var options = [
        {
          id: pickedChoices[0].option1 
        },{
          id: pickedChoices[0].option2 
        },{
          id: pickedChoices[0].option3 
        }
      ];
    }else if(this.props.ON === '2'){
      var options = [
        {
          id: pickedChoices[0].option1 
        },{
          id: pickedChoices[0].option2 
        }
      ];
    }


    const bb = options.map((val) => {

      { tempCheckValues[val.id] = false }

      return (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row'}}>
            <CheckBox
              value={this.state.checkBoxChecked[val.id]}
              onValueChange={() => this.checkBoxChanged(val.id, this.state.checkBoxChecked[val.id])}
            /> 
            <Text style={{marginTop: 5}}>{val.id}</Text>
          </View>
        </View>
        )
      }
    );

    return(
      <View style = {styles.container} >
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex:0.5, margin: 20, width: '80%'}}>
                  <View style = {{ flex: 1}}>
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
                  {bb}
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

                  <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.button} onPress={() => this.submitAnswer()}>
                      <Text style={styles.buttonText}>{QuestionString.Submit}</Text>
                    </TouchableOpacity>
                  </View>

              </View>
              
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flexDirection: "row",
    // justifyContent:'center',
    alignItems:'center',
    flex: 1
  },

  templateType:{
    paddingTop:5
  },
  
  inputContainer: {
    width:300,
    borderWidth : 1,
    height: 200,
  },

  text:{
    marginLeft:5,
    fontSize:20
  },
  
  CommentBox:{
    height: 200, 
    textAlignVertical: 'top'
  },

  input: {
    paddingLeft: 15,
    paddingRight: 15
  },

  checkbox: {
    alignSelf: "center",
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
  getQuestion: state.questionReducer.getQuestion,
  getUser: state.userReducer.getUser,
  QuestionForUser: state.questionReducer.QuestionForUser


})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions_CB);



