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



import {removeUserFromTeam} from "../../../actions/team.action";
import {getTeamMembers} from "../../../actions/team.action";

import {AlertStrings} from "../../../constants/strings";


import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

//Display Team Members after choose team
class ViewTeamMembers extends Component<{}>{


  sortbyType = async () =>{
    try {
        const response =  await this.props.dispatch(SortQues1Text());

      if(response.success){
          console.log("hello i made it")
      }else{
        throw response;
      }

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

  sort = () =>{
    this.sortbyType()
  }
 
  Userdelete = async (usertype, username) =>{
    try {
        const response =  await this.props.dispatch(removeUserFromTeam({userType: usertype, teamName: this.props.teamName, userName: username}));
        this.props.dispatch(getTeamMembers(this.props.teamName));

      if(response.success){
          console.log("delete it")
      }else{
        throw response;
      }
      Actions.refresh();

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }


  
  
 remove(userType, userName){
    Alert.alert(
        AlertStrings.DoubleCheck,
        AlertStrings.reallyDelete,
        [
          {  
            text: AlertStrings.Cancel,  
            onPress: () => console.log('Cancel Pressed'),  
            style: 'cancel',  
          }, 
          {text: AlertStrings.Delete, onPress: () => this.Userdelete(userType, userName)},
        ],
        {cancelable: true},
      );
 }

 changeTeam(userType, userName){
     Actions.chooseNewTeam({userType: userType, userName: userName, oldTeam: this.props.teamName});
 }

    render(){

    
      const modify = [{
        value: 'update'
      },{
        value: 'delete'
      },{
        value: 'assignTeam'
      }];

        const {displayTeamMembers: {teamMembers}} = this.props;

        const view = teamMembers ? teamMembers: [{}];
        console.log(view[0]);
        console.log(view[0].Coaches);
        console.log(view[0].Athletes);



        const coaches = view[0].Coaches.map((val) =>{
           return(
               <View style={{flexDirection: 'row', borderTopWidth: 0.6, borderColor: 'black'}}>
                   <View style={{width: 80, alignItems:'center', margin: 10}}>
                        <Text style={{fontSize: 15}}>{val}</Text>
                   </View>

                   <View style={{width: 60, alignItems:'center', margin: 10, backgroundColor: 'lightgray', borderRadius: 10}}>
                        <TouchableOpacity onPress = {() => this.remove('Coach', val)}>
                            <Text style={{fontSize: 10}}>Remove</Text>
                        </TouchableOpacity>
                   </View>

                   <View style={{width: 90, alignItems:'center', margin: 10, backgroundColor: 'lightgray', borderRadius: 10}}>
                        <TouchableOpacity onPress = {() => this.changeTeam('Coach', val)}>
                            <Text style={{fontSize: 10}}>ChangeTeam</Text>
                        </TouchableOpacity>
                   </View>
               </View>
           )
        });

        const athletes = view[0].Athletes.map((val) =>{
            return(
                <View style={{flexDirection: 'row', borderTopWidth: 0.6, borderColor: 'black'}}>
                   <View style={{width: 80, alignItems:'center', margin:10}}>
                        <Text>{val}</Text>
                   </View>

                   <View style={{width: 60, alignItems:'center', margin: 10, backgroundColor: 'lightgray', borderRadius: 10}}>
                        <TouchableOpacity onPress = {() => this.remove('Athlete', val)}>
                            <Text style={{fontSize: 10}}>Remove</Text>
                        </TouchableOpacity>
                   </View>

                   <View style={{width: 90, alignItems:'center', margin: 10, backgroundColor: 'lightgray', borderRadius: 10}}>
                        <TouchableOpacity onPress = {() => this.changeTeam('Athlete', val)}>
                            <Text style={{fontSize: 10}}>ChangeTeam</Text>
                        </TouchableOpacity>
                   </View>
               </View>
            )
         });

          const data = [{
            value: 'Sort by Type',
          }];
        

        return(
            <View style={styles.container}>
              <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <View style={{width: 300}}>
                        <Text>{view[0].TeamName}</Text>
                        <Text style={{ fontWeight:'bold', fontSize: 17}}>Coaches:</Text>
                          {coaches}
                        <Text style={{ fontWeight:'bold', fontSize: 17}}>Athletes:</Text>
                          {athletes}
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
      alignItems:'center',
      justifyContent:'center'
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
    displayTeamMembers: state.teamReducer.displayTeamMembers,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ViewTeamMembers);

