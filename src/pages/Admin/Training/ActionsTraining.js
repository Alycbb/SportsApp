import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {getAllTeam} from "../../../actions/team.action";
import {showUserList} from "../../../actions/auth.actions";


import {TrainingStrings} from '../../../constants/strings';

import {connect} from "react-redux";
import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';

//Action Choose
//page to select actions between add trainning plan(team/athlete) and view training plan(team/athlete)
class TrainingActions extends Component<{}>{

    viewTraininngAthlete = async() =>{
        try {
          const response =  await this.props.dispatch(showUserList('Athlete'));
          if(response.success){
            console.log("show user list success")  
          }else{
            throw response;
          }
          Actions.viewTrainingPlanByUser();

        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    }

    goaddTrainingToTeam(){
        Actions.addTrainingtoTeam()
    }

    goaddTrainingToAthlete(){
        Actions.addTrainingtoAthlete()
    }

    goviewTrainingTeam(){
        Actions.viewTrainingPlanByTeam()
        this.props.dispatch(getAllTeam());

    }

    goviewTrainingAthlete(){
        this.viewTraininngAthlete()
    }

    

    render(){
        return(
            <View style={styles.container}>
                

                <TouchableOpacity onPress={() =>this.goaddTrainingToTeam()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{TrainingStrings.AddTrainingToTeam}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goaddTrainingToAthlete()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{TrainingStrings.AddTrainingToAthlete}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goviewTrainingTeam()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{TrainingStrings.ViewTrainingTeam}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goviewTrainingAthlete()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{TrainingStrings.ViewTrainingAthlete}</Text>
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
        width:210,
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
    displayAllTeam: state.teamReducer.displayAllTeam,
    viewTrainingByTeam: state.trainingReducer.ViewTrainingByTeam,
    UserList: state.userReducer.UserList

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingActions);