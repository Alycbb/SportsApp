import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


import {connect} from "react-redux";

import {AlertStrings} from '../../../constants/strings';

import {getTeamMembers} from "../../../actions/team.action";

import {ErrorUtils} from "../../../utils/auth.utils";

import {Actions} from 'react-native-router-flux';

//Modify Team Members
//choose team to show team members
class ChooseTeamToModify extends Component<{}>{

  

  getTeamMembers = async (value) =>{
    try {
      console.log(value);
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
          Actions.viewTeamMembers({teamName: value});
        }

      }else{
        throw response;
      }

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

    

    show = (value) =>{
      this.getTeamMembers(value)
    }

    render(){
        const {displayAllTeam: {teamList}} = this.props;
        const view = teamList ? teamList: [{}];

        const allTeam_before = view.map((val) =>{
            return val.TeamName;
        });
  
        const allTeam = allTeam_before.map((val) =>{
            return {"value": val}
        });
        

        return(
            <View style={styles.container}>
                
                <Dropdown containerStyle = {{width:100}}
                    label = "Team"
                    data = {allTeam}
                    onChangeText = {(value) =>{
                      this.setState({
                        selectedValue: value 
                    });
                    this.show(value);
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

  checklist:{
      // flexGrow:1,
    justifyContent:'center',
    alignItems:'flex-end',
    paddingVertical:10,
    fontWeight:'bold',
    marginTop:30,
    backgroundColor: '#FFF0F5',
    padding:5,
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
    displayTeamMembers: state.teamReducer.displayTeamMembers,

    
  })
  
  mapDispatchToProps = (dispatch) => ({
    dispatch
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChooseTeamToModify);