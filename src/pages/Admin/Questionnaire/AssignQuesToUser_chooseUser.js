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


import {AssignQuesToUser} from "../../../actions/question.action";



import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";


import {Actions} from 'react-native-router-flux';
import { AlertStrings, UserControlStrings } from '../../../constants/strings';

//page to input user name to  display question answers
class AssignQToUser_User extends Component<{}>{


    AssignQuesToUser = async(user) =>{
        try {
          // dispatch action to assign questionnaire to team
          // pass the value of username and questionnaire to function
        const response =  await this.props.dispatch(AssignQuesToUser({userName: user, questionnaire: this.props.template}));
        if(response.success){
            Alert.alert(
                AlertStrings.Success,
                AlertStrings.AssignQuestionnaireSuccess,
                [
                  // jump back to previous page
                  {text: AlertStrings.OK, onPress: () => Actions.pop()},
                ],
                {cancelable: false},
              );

        }else{
            throw response;
        }
        Actions.pop();


        } catch (error) {
        const newError = new ErrorUtils(error, "Error");
        newError.showAlert();
        }
    }


  next = (user) =>{
    console.log(user)
    this.AssignQuesToUser(user);

  }

  render(){
    const {displayTeamMembers: {teamMembers}} = this.props;

        const view = teamMembers ? teamMembers: [{}];

      const allAthletes = view[0].Athletes.map((val) =>{
        return {"value": val}
      });
      console.log(allAthletes);


      
      return(
        <View style = {styles.container} >
          <Dropdown containerStyle = {{width:100}}
                    label = "Users"
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

export default connect(mapStateToProps, mapDispatchToProps)(AssignQToUser_User);
