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
import { Dropdown } from 'react-native-material-dropdown';


import InputText from "../../../components/InputText";
import UserType_dropDown from "../../../components/userType_dropdown";
import Gender_dropDown from "../../../components/gender_dropdown";


import {DisplayQuestionAnswer} from "../../../actions/question.action";
import {getTeamMembers} from "../../../actions/team.action";



import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";


import {Actions} from 'react-native-router-flux';
import { AlertStrings, UserControlStrings, QuestionString } from '../../../constants/strings';

//page to choose team to get team members
class ChooseTeamToViewAnswers extends Component<{}>{


    getTeamMembers = async (value) =>{
        try {
          console.log(value);
          //dispatch the action to get all team members
          const response =  await this.props.dispatch(getTeamMembers(value));
          if(response.success){
            console.log("Get Team Members Success")
            // when there is no member in this team
            if(Array.isArray(response.responseBody) && response.responseBody[0].Coaches.length <= 0 && response.responseBody[0].Athletes.length <= 0){
              Alert.alert(
                  '',
                  AlertStrings.NoRecord,
                  [
                    {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
            }else{
              //jump to next page to choose user
                Actions.selectUser();
            }
    
          }else{
            throw response;
        }

    } catch (error) {
        const newError = new ErrorUtils(error, "Error");
        newError.showAlert();
      }
    }

    next = (value) =>{
        this.getTeamMembers(value);

    }

  render(){
    const {displayAllTeam: {teamList}} = this.props;
        const view = teamList ? teamList: [{}];

        //handle the array
        const allTeam_before = view.map((val) =>{
            return val.TeamName;
        });
  
        const allTeam = allTeam_before.map((val) =>{
            return {"value": val}
        });

      
      return(
        <View style = {styles.container} >
            <Dropdown containerStyle = {{width:100}}
                    label = {QuestionString.Team}
                    data = {allTeam}
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
    displayAllTeam: state.teamReducer.displayAllTeam,
    displayTeamMembers: state.teamReducer.displayTeamMembers,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTeamToViewAnswers);