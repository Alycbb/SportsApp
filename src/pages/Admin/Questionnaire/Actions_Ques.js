import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {QuestionString} from '../../../constants/strings';

import {getAllTeam} from "../../../actions/team.action";
import {getQustionnaire} from "../../../actions/question.action";


import {connect} from "react-redux";
import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';

import {ErrorUtils} from "../../../utils/auth.utils";

//page to choose Add/View Questionnaire questions 
class quesAction extends Component<{}>{

    getAllTeam = async() =>{
        try {
          //dispatch action to display all team
          const response =  await this.props.dispatch(getAllTeam());
          if(response.success){
            console.log("get Team success")
          }else{
            throw response;
          }
        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    }

    getQustionnaire = async() =>{
      try {
        //dispatch action to get all questionnnare
        const response =  await this.props.dispatch(getQustionnaire());
        if(response.success){
          console.log("get Questionnaires success")
        }else{
          throw response;
        }
      } catch (error) {
        const newError = new ErrorUtils(error, "Error");
        newError.showAlert();
      }
  }

    

    goaddQuestionnaire(){
      Actions.addQuestionnaire();
    }

    goaddQuestion(){
      this.getQustionnaire();
      Actions.addQuesTem()

    }

    gochecklist(){
      this.getQustionnaire();
      Actions.viewQuesTem();
    }

    gocheckAnswer(){
      this.getAllTeam();
      Actions.selectTeam();
    }

    

    render(){
        return(
            <View style={styles.container}>
                
                <TouchableOpacity onPress={() => this.goaddQuestionnaire()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{QuestionString.AddQuestionnaire}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.goaddQuestion()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{QuestionString.AddQues}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.gochecklist()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{QuestionString.ViewQues}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.gocheckAnswer()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{QuestionString.ViewAnswer}</Text>
                    </View>
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


    check:{
      width:200,
    },

    checklist:{
        // flexGrow:1,
      justifyContent:'center',
      alignItems:'center',
      paddingVertical:10,
      fontWeight:'bold',
      marginTop:30,
      backgroundColor: '#FFF0F5',
      padding:20,
      borderRadius:7
      

    },

    text:{
        fontSize:19,
        fontWeight:'500',
        color:'#000000',
        textAlign: 'left',
    }


});

mapStateToProps = (state) => ({
    //actions were dispatched above, then use reducer to store data
    //in next page, call the same reducer then we can get the data inside
    displayAllTeam: state.teamReducer.displayAllTeam,
    getQuestionnare: state.questionReducer.getQuestionnare,
  })

mapDispatchToProps = (dispatch) => ({
    dispatch
    });

const getTem = connect(mapStateToProps, mapDispatchToProps)(quesAction)


export default getTem;