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
import { Dropdown } from 'react-native-material-dropdown';


import InputText from "../../../components/InputText";
import UserType_dropDown from "../../../components/userType_dropdown";
import Gender_dropDown from "../../../components/gender_dropdown";


import {DisplayQuestionAnswer} from "../../../actions/question.action";

import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";


import {Actions} from 'react-native-router-flux';
import { AlertStrings, UserControlStrings, QuestionString } from '../../../constants/strings';

//page to select user name to display question answers
class ChooseUserToViewAnswers extends Component<{}>{

  DisplayQuestionAnswer = async(user) =>{
    try {
      //dispatch action to display QuestionAnser
      // pass user name to function
    const response =  await this.props.dispatch(DisplayQuestionAnswer(user));
    if(response.success){
        
      if(Array.isArray(response.responseBody) && response.responseBody.length <= 0){
        Alert.alert(
            '',
            AlertStrings.NoRecord,
            [
              {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
      }else{
        //jump to next page to display answers
        Actions.displayAnswers();
      }

    }else{
        throw response;
    }

    } catch (error) {
    const newError = new ErrorUtils(error, "Error");
    newError.showAlert();
    }
}

  next = (user) =>{
    this.DisplayQuestionAnswer(user);

  }

  render(){
    const {displayTeamMembers: {teamMembers}} = this.props;

      const view = teamMembers ? teamMembers: [{}];

      //map the data to get the drop down list
      const allAthletes = view[0].Athletes.map((val) =>{
        return {"value": val}
      });
      console.log(allAthletes);


      
      return(
        <View style = {styles.container} >
          <Dropdown containerStyle = {{width:100}}
                    label = {QuestionString.User}
                    data = {allAthletes}
                    onChangeText = {(value) =>{
                      this.setState({
                        selectedValue: value 
                    });
                    this.next(value);
            }}/>
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
    displayTeamMembers: state.teamReducer.displayTeamMembers,
    QuestionAnswers: state.questionReducer.QuestionAnswers
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUserToViewAnswers);
