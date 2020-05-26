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
import {compose} from "redux";

import {QuestionString} from "../../../constants/strings";
import {AlertStrings} from "../../../constants/strings";


import {displayQuestions} from '../../../actions/question.action';


import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

//View questions
//page to choose pre-training/post-training when displaying questions 
class viewQuesTem extends Component<{}>{

  displayQuestions = async (value) =>{
    try {
        const response =  await this.props.dispatch(displayQuestions(value));
        if(response.success){
          if(Array.isArray(response.responseBody) && response.responseBody.length <=0 ){
            Alert.alert(
                '',
                AlertStrings.NoRecord,
                [
                  {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
          }else{
            Actions.ViewTem({tem: this.state.selectedValue});
          }
        }else{
          throw response;
        }

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }


  run = (value) =>{
    this.displayQuestions(value);
  }


  render(){

    const {getQuestionnare: {questionnaires}} = this.props;
    const view = questionnaires ? questionnaires: [{}];


    const data = view.map((val)=>{
        return {value: val.questionnaireName}
    })
    console.log(data);

      

      return(
          <View style={styles.container}>
              <Text style={styles.text}>{QuestionString.PlzChooseQuestionnaire}</Text>
              <Dropdown  containerStyle = {{width:300}}
              label = {QuestionString.Questionnaire}
              data = {data}
              onChangeText={(value) =>{
                this.setState({
                    selectedValue: value 
                });
                this.run(value);
            }} />
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

    text:{
        fontSize:19,
        fontWeight:'500',
        color:'#000000',
        textAlign: 'left'
    }


});


mapStateToProps = (state) => ({
  getQuestionnare: state.questionReducer.getQuestionnare,
  getQuestions: state.questionReducer.getQuestions

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(viewQuesTem);

