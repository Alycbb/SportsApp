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
import {TrainingStrings} from '../../../constants/strings';


import {ViewTrainingByTeam} from "../../../actions/training.action";
import {ViewTrainingByUser} from "../../../actions/training.action";



import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';

import {ErrorUtils} from "../../../utils/auth.utils";

//Display Trainning by team name(check which team loggin user is in, then show the trainingplan that was assigned to this team)

class displayTraining extends Component<{}>{
    state = {
        selectedValue: 'Text'
    }

    ViewTrainingByTeam = async (TeamName) =>{
        try {
            const response =  await this.props.dispatch(ViewTrainingByTeam(TeamName));

          if(response.success){
            console.log("display Training by Team success")
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

    ViewTrainingByUser = async (UserName) =>{
        try {
            const response =  await this.props.dispatch(ViewTrainingByUser(UserName));

          if(response.success){
            console.log("display Training by User success");
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

    goTeam(TeamName){
        this.ViewTrainingByTeam(TeamName);
    }

    goPersonal(UserName){
        this.ViewTrainingByUser(UserName);
    }


    

    render(){
        const {getUser: {userDetails}} = this.props;
        const {viewTrainingByTeam: {traingingByTeam}} = this.props;
        const {ViewTrainingByUser: {traingingByUser}} = this.props;

         
        const view = traingingByTeam ? traingingByTeam: [];
        const view1 = traingingByUser ? traingingByUser: [];



        const aa = view.map((val)=>{
            var after = JSON.parse(val.Details);
            var bbb = after.map((val) =>{
                console.log(val)
                return Object.keys(val)
            })
            var aaa = after.map((val) =>{
                console.log(val)
                return Object.values(val)
            })
            return(
                <View>
                    <Text>{val.user}</Text>
                    <View style={{flexDirection: 'row'} }>
                        <View style={{flexDirection: 'column'}}>
                            {Object.values(bbb).map((val) =>
                                    <Text>{val}</Text> 
                                )}
                        </View>
                        <View style={{flexDirection: 'column', marginLeft: 5}}>
                            {Object.values(aaa).map((val) =>
                                    <Text>{val}</Text> 
                            )}
                        </View>
                    </View>
                  </View>
              )
        })

        const bb = view1.map((val)=>{
            var after = JSON.parse(val.Details);
            var bbb = after.map((val) =>{
                console.log(val)
                return Object.keys(val)
            })
            var aaa = after.map((val) =>{
                console.log(val)
                return Object.values(val)
            })
            return(
                <View>
                    <Text>{val.user}</Text>
                    <View style={{flexDirection: 'row'} }>
                        <View style={{flexDirection: 'column'}}>
                            {Object.values(bbb).map((val) =>
                                    <Text>{val}</Text> 
                                )}
                        </View>
                        <View style={{flexDirection: 'column', marginLeft: 5}}>
                            {Object.values(aaa).map((val) =>
                                    <Text>{val}</Text> 
                            )}
                        </View>
                    </View>
                  </View>
              )
        })



        return(
            <View style={styles.container}>
                
                <TouchableOpacity style={styles.button} onPress={() =>this.goTeam(userDetails.user.team[0])}>
                    <Text style={styles.buttonText}>{TrainingStrings.CheckTeamPlan}</Text>
                </TouchableOpacity>
                {view.length > 0 ?
                <View>
                    <Text>{TrainingStrings.TeamTrainingPlan}</Text>
                    {aa}
                </View>
                : null
                }
                
                <TouchableOpacity style={styles.button} onPress={() =>this.goPersonal(userDetails.user.name)}>
                    <Text style={styles.buttonText}>{TrainingStrings.CheckPersonalPlan} </Text>
                </TouchableOpacity>
                {view1.length > 0 ?
                <View>
                    <Text>{TrainingStrings.PersonalTrainingPlan}</Text>
                    {bb}
                </View>
                : null
                }
                
                

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
    viewTrainingByTeam: state.trainingReducer.ViewTrainingByTeam,
    ViewTrainingByUser: state.trainingReducer.ViewTrainingByUser,
    getUser: state.userReducer.getUser
  
  })
  
  mapDispatchToProps = (dispatch) => ({
    dispatch
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(displayTraining);

