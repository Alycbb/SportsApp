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

import {getAllTeam} from "../../../actions/team.action";


import {DeleteUser} from "../../../actions/auth.actions";
import {showUserList} from "../../../actions/auth.actions";
import {sortByTeam} from "../../../actions/user.action";
import {sortByUserName} from "../../../actions/user.action";


import {UserControlStrings} from "../../../constants/strings";
import {AlertStrings} from "../../../constants/strings";


import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

//display user list after choose user type
class ViewAthlete extends Component<{}>{

  //call sortByTeam action in "user.action.js" file
  sortByTeam = async () =>{
    try {
        const response =  await this.props.dispatch(sortByTeam({userType: this.props.usertype}));

      if(response.success){
          console.log("Sort By Team Success")
      }else{
        throw response;
      }
    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

  //call sortByUserName action in "user.action.js" file
  sortByUserName = async () =>{
    try {
        const response =  await this.props.dispatch(sortByUserName({userType: this.props.usertype}));

      if(response.success){
          console.log("Sort By User Name Success")
      }else{
        throw response;
      }
    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

  

 //call DeleteUser action in "auth.action.js" file
  Userdelete = async (userID, userType) =>{
    try {
        const response =  await this.props.dispatch(DeleteUser(userID));
        this.props.dispatch(showUserList(userType));

      if(response.success){
          console.log("delete it success")
      }else{
        throw response;
      }

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }



modifyFunc = (value, userID, userName, email, weight, height, userType) =>{

  if(value === UserControlStrings.Delete){
    Alert.alert(
      AlertStrings.DoubleCheck,
      AlertStrings.reallyDelete,
      [
        {  
          text: AlertStrings.Cancel,  
          onPress: () => console.log('Cancel Pressed'),  
          style: 'cancel',  
        }, 
        {text: AlertStrings.Delete, onPress: () => this.Userdelete(userID, userType)},
      ],
      {cancelable: true},
    );
    
  }else if(value === UserControlStrings.Update){
    Actions.inputUserNewInfo({userid: userID, username:userName, email:email, weight: weight, height: height, usertype: this.props.usertype});
  }
  
}


AssignAthleteFunc = (value, userID, userType) =>{

  if(value === UserControlStrings.ToTeam){
    this.props.dispatch(getAllTeam());
    Actions.chooseTeamAssign({userID: userID, usertype: this.props.usertype});
  }

}

AssignCoachFunc = (value, userID, userType) =>{
  if(value === UserControlStrings.ToTeam){
    this.props.dispatch(getAllTeam());
    Actions.chooseTeamAssign({userID: userID, usertype: this.props.usertype});
  }
}

sort = (value) =>{
  if(value === UserControlStrings.SortByTeam){
    this.sortByTeam();
  }else if(value === UserControlStrings.SortByUserName){
    this.sortByUserName();
  }
}

    render(){

      const modifyAthlete = [{
        value: UserControlStrings.Update
      },{
        value: UserControlStrings.Delete
      }];

      const modifyAdmin = [{
        value: UserControlStrings.Update
      },{
        value: UserControlStrings.Delete
      }];

      const AssignAthlete = [{
          value: UserControlStrings.ToTeam
      }];

      const AssignCoach = [{
          value: UserControlStrings.ToTeam
      }];

      const {UserList: {userList}} = this.props;

      const view = userList ? userList: [{}];
      
      console.log(view);

      

      const allQues = view.map((val) =>{
          if(val.userType === UserControlStrings.Athlete){
              return(
                  <View>
                    <View style={{flexDirection: 'row', borderTopWidth: 0.6, borderColor: 'black'}}>
                        <View style={{width: 150, borderStyle: 'solid'}}>
                          <Text style={{ fontWeight:'bold'}}>{UserControlStrings.Athlete}</Text>
                          <Text>{UserControlStrings.Name}{val.name}</Text>
                          <Text>{UserControlStrings.Email}{val.email}</Text>
                          <Text>{UserControlStrings.Team} {val.team}</Text>
                        </View>

                        <View style={{width: 100, alignItems:'center'}}>
                              <TouchableOpacity>
                                <Dropdown containerStyle = {{width:70}}
                                    label ={UserControlStrings.Modify}
                                    data = {modifyAthlete}
                                    onChangeText = {(value) =>{
                                      this.setState({
                                        modifyUserStatus: value 
                                    });
                                    this.modifyFunc(value, val._id, val.name, val.email, val.weight, val.height, val.userType);
                                    }}/>
                              </TouchableOpacity>
                          </View>

                          <View style={{width: 100, alignItems:'center'}}>
                              <TouchableOpacity>
                                <Dropdown containerStyle = {{width:80}}
                                    label = {UserControlStrings.Assign}
                                    data = {AssignAthlete}
                                    onChangeText = {(value) =>{
                                      this.setState({
                                        AssignUserStatus: value 
                                    });
                                    this.AssignAthleteFunc(value, val._id, val.userType);
                                    }}/>
                              </TouchableOpacity>
                          </View>
                    </View>
                  </View>
                )
          }else if(val.userType === UserControlStrings.Coach){
              return(
                  <View>
                    <View style={{flexDirection: 'row', borderTopWidth: 0.6, borderColor: 'black'}}>
                        <View style={{width: 150, borderStyle: 'solid'}}>
                          <Text style={{ fontWeight:'bold'}}>{UserControlStrings.Coach}</Text>
                          <Text>{UserControlStrings.Name}{val.name}</Text>
                          <Text>{UserControlStrings.Email}{val.email}</Text>
                          <Text>{UserControlStrings.Team} {val.team}</Text>

                        </View>
                        <View style={{width: 100, alignItems:'center'}}>
                              <TouchableOpacity>
                                <Dropdown containerStyle = {{width:90}}
                                    label = {UserControlStrings.Modify}
                                    data = {modifyAdmin}
                                    onChangeText = {(value) =>{
                                      this.setState({
                                        modifyStatus: value 
                                    });
                                    this.modifyFunc(value, val._id, val.name, val.email, val.weight, val.height, val.userType);
                                    }}/>
                              </TouchableOpacity>
                          </View>

                          <View style={{width: 100, alignItems:'center'}}>
                              <TouchableOpacity>
                                <Dropdown containerStyle = {{width:70}}
                                    label = {UserControlStrings.Assign}
                                    data = {AssignCoach}
                                    onChangeText = {(value) =>{
                                      this.setState({
                                        AssignUserStatus: value 
                                    });
                                    this.AssignCoachFunc(value, val._id, val.userType);
                                    }}/>
                              </TouchableOpacity>
                          </View>
                    </View>
                  </View>
                )
          }
        });

        const data = [
          {
            value: UserControlStrings.SortByTeam,
          },
          {
            value: UserControlStrings.SortByUserName
          }
        ];
      

      return(
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'column', marginBottom: 20}}>

                  <View style={{width: 200}}>
                    <Dropdown containerStyle = {{width:200}}
                            label = {UserControlStrings.Sort}
                            data = {data}
                            onChangeText = {(value) =>{
                              this.setState({
                                selectedValue: value 
                            });
                            this.sort(value);
                            }}/>
                  </View>

                  <View style={{width: 350}}>
                        {allQues}
                  </View>
              </View>
              
            </ScrollView>

        </View>
      )
    }
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#C0C0C0',
      flex: 1,
      
    },

    text:{
        fontSize:12,
        fontWeight:'bold',
        color:'#000000',
        textAlign: 'left'
        
    },

    button:{
      backgroundColor:'#4682B4',
      borderRadius:10,
      width:250,
      paddingVertical:15,
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
    UserList: state.userReducer.UserList,
    displayAllTeam: state.teamReducer.displayAllTeam,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ViewAthlete);

