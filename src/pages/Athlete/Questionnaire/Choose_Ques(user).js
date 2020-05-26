import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {connect} from "react-redux";

import {AlertStrings} from '../../../constants/strings';
import { QuestionString } from '../../../constants/strings';


import {DisplayQuestionForUser} from '../../../actions/question.action';


import Routes from '../../../components/Routes';

import {ErrorUtils} from "../../../utils/auth.utils";

import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

//check questionnaire list
class chooseQues2 extends Component<{}>{
    state = {
        selectedValue: 'Text'
    }

    DisplayQuestionForUser = async (UserName) =>{
        try {
            const response =  await this.props.dispatch(DisplayQuestionForUser(UserName));

          if(response.success){
            console.log("display questions success");
            if(Array.isArray(response.responseBody) && response.responseBody.length <= 0){
              Alert.alert(
                  '',
                  AlertStrings.NoRecord,
                  [
                    {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
            }
          }else{
            throw response;
          }
        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    }


    check(username){
        this.DisplayQuestionForUser(username);
    }
//jump to different page accroding to QuestionID, pass some value at the same time.
    goShow(QuestionType, QuestionID, QuestionTemplate, Question, UserName, ON){
       if(QuestionType === 'Text'){
            Actions.questionText({QuestionID: QuestionID, QuestionTemplate: QuestionTemplate, Question: Question, username: UserName});
        }else if(QuestionType === 'Radio Buttons'){
            Actions.questionRB({QuestionID: QuestionID, QuestionTemplate: QuestionTemplate, Question: Question, username: UserName, ON:ON});
        }else if(QuestionType === 'Check Boxes'){
            Actions.questionCB({QuestionID: QuestionID, QuestionTemplate: QuestionTemplate, Question: Question, username: UserName, ON:ON});
        }
    }

    

    render(){
        const {getUser: {userDetails}} = this.props;
        const {QuestionForUser: {userQuestion}} = this.props;
        
        const view = userQuestion ? userQuestion: {personal:[] , team: []};
        console.log(view);

        const single = view.personal.map((val)=>{
          console.log(val)

            return (
                <View>
                    <TouchableOpacity onPress={() => this.goShow(val.type, val._id, val.quesTemplate, val.Question, userDetails.user.name, val.Number) }>
                        <Text style={{fontSize:15, borderBottomColor: 'black', borderBottomWidth: 0.2, margin: 10}}>{val.Question}</Text>
                    </TouchableOpacity>
                </View>
            )
        });

        const group = view.team.map((val)=>{
          console.log(val)

          return (
              <View>
                  <TouchableOpacity onPress={() => this.goShow(val.type, val._id, val.quesTemplate, val.Question, userDetails.user.name, val.Number) }>
                      <Text style={{fontSize:15, borderBottomColor: 'black', borderBottomWidth: 0.2, margin: 10}}>{val.Question}</Text>
                  </TouchableOpacity>
              </View>
          )
      });



        

        return(
            <View style={styles.container}>
              <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center', alignItems:'center'}}>
                <TouchableOpacity style={styles.button} onPress={() =>this.check(userDetails.user.name)}>
                  <Text style={styles.buttonText}>{QuestionString.Check}</Text>
                </TouchableOpacity>
                {view.personal.length > 0 ?
                <View style = {{width: 200}}>

                    <Text style={{fontWeight:'bold', fontSize:18}}>{QuestionString.PersonalQuestion}</Text>
                    {single}
                    
                </View>
                : null
                }

                {view.team.length > 0 ?
                <View style = {{width: 200}}>
                    
                    <Text style={{fontWeight:'bold', fontSize:18}}>{QuestionString.TeamQuestion}</Text>
                    {group}
                </View>
                : null
                }
                </ScrollView>
              </View>
            )
    }
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#C0C0C0',
      flex: 1,
      // alignItems:'center',
      // justifyContent:'center'
    },

    text:{
        fontSize:19,
        fontWeight:'500',
        color:'#000000',
        textAlign: 'left'
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
    QuestionForUser: state.questionReducer.QuestionForUser,
    getUser: state.userReducer.getUser
  
  })
  
  mapDispatchToProps = (dispatch) => ({
    dispatch
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(chooseQues2);

