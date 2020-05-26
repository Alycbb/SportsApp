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


import {UserControlStrings} from '../../../constants/strings';

import {connect} from "react-redux";
import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';

//the first page of user control part
class UserControlActions extends Component<{}>{


    getAllTeam = async () =>{
        try {
          const response =  await this.props.dispatch(getAllTeam());
          if(response.success){
            console.log("display teams success")
    
          }else{
            throw response;
          }
    
          Actions.chooseTeamModify()
    
    
        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
      }
    
        
    

    goAdd(){
        Actions.addUser();
    }

    goModify(){
        Actions.userType();
    }

    goStatus(){
        Actions.userStatus();
    }

    goTeam(){
        this.getAllTeam()
    }

    render(){
        return(
            <View style={styles.container}>

                <TouchableOpacity onPress={() =>this.goAdd()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{UserControlStrings.AddUser}</Text>
                    </View>
                </TouchableOpacity>
                

                <TouchableOpacity onPress={() =>this.goModify()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{UserControlStrings.ModifyInfo}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goStatus()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{UserControlStrings.Status}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goTeam()}>
                    <View style = {styles.check}>
                        <Text style={styles.checklist}>{UserControlStrings.TeamMembers}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserControlActions);