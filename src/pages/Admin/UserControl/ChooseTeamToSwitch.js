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

import {ChangeNewTeam} from "../../../actions/team.action";
import {getTeamMembers} from "../../../actions/team.action";


import {ErrorUtils} from "../../../utils/auth.utils";

import {Actions} from 'react-native-router-flux';

//change a team for user
class ChooseTeamToChange extends Component<{}>{


    ChangeNewTeam = async (value) =>{
    try {
      console.log(value);
      const response =  await this.props.dispatch(ChangeNewTeam({userType: this.props.userType, userName: this.props.userName, oldTeamName: this.props.oldTeam, newTeamName: value}));
      if(response.success){
        console.log("Switch Team Success")
        this.props.dispatch(getTeamMembers(this.props.oldTeam));
        Alert.alert(
          AlertStrings.Success,
          AlertStrings.ChangeTeamSuccess,
          [
            {text: AlertStrings.OK, onPress: () =>Actions.pop({teamName: this.props.oldTeam})},
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

    

    show = (value) =>{
      this.ChangeNewTeam(value)
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
                    label = "Teams"
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChooseTeamToChange);