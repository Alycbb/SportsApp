import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  Alert,
  Switch
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";
import DatePicker from 'react-native-datepicker';

import {AlertStrings, TrainingStrings} from '../../../constants/strings';


import QuestionInput from "../../../components/QuestionInput";
import AssignTeam_dropDown from "../../../components/AssignTeam_dropdown";


import {ViewTrainingByTeam} from "../../../actions/training.action";
import {getAllTeam} from "../../../actions/team.action";


import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";

import { Dropdown } from 'react-native-material-dropdown';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

const moment = require('moment');

//choose team to display training plan
class viewTrainingPlanByTeam extends Component<{}>{

    state = { 
      team: ''
    }

    ViewTrainingByTeam = async(values) =>{
        try {
          const response =  await this.props.dispatch(ViewTrainingByTeam(this.state.team));
          if(response.success){
            console.log(' view by team success')
            if(Array.isArray(response.responseBody) && response.responseBody.length <= 0){
                Alert.alert(
                    '',
                    AlertStrings.NoRecord,
                    [
                      {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
              }else{
                Actions.viewTrainingPlanTeam();
            }
  
          }else{
            throw response;
          }
        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    }


    nextpage(){
        this.ViewTrainingByTeam();
    }




  render(){
      const {handleSubmit, addTraining} = this.props;

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
          {addTraining.isLoading && <Loader />}

          <Dropdown  containerStyle = {{width:300}}
                label = {TrainingStrings.ChooseTeam}
                data = {allTeam}
                onChangeText={(value) => {
                        this.setState({
                        team: value 
                    });
                }}/>

          <TouchableOpacity style={styles.button} onPress={() => this.nextpage()}>
              <Text style={styles.buttonText}>{TrainingStrings.Next}</Text>
          </TouchableOpacity>

          {/* {showList} */}

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

  button:{
    backgroundColor:'#4682B4',
    borderRadius:25,
    width:250,
    paddingVertical:12,
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
    addTraining: state.trainingReducer.addTrainingPlan,
    displayAllTeam: state.teamReducer.displayAllTeam,
    viewTrainingByTeam: state.trainingReducer.ViewTrainingByTeam,

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(viewTrainingPlanByTeam);
