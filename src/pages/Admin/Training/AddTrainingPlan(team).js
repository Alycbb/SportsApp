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


import QuestionInput from "../../../components/QuestionInput";
import AssignTeam_dropDown from "../../../components/AssignTeam_dropdown";


import {addTrainingPlan} from "../../../actions/training.action";
import {getAllTeam} from "../../../actions/team.action";


import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";

import { Dropdown } from 'react-native-material-dropdown';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import { TrainingStrings } from '../../../constants/strings';

const moment = require('moment');

//Add Trainin for team
//page to choose specific team and date to add training plan
class addTraining extends Component<{}>{


    state = {
      startDate: '',  
      endDate: '',  
      team: ''
    }


renderTeamDropdownList = (field) => {
  const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
  return (
      <View>
          <AssignTeam_dropDown
          onChangeText={onChange}
          label={label}
          {...restInput}
          />
          {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
      </View>
  );
  }; 


renderTemDropdownList = (field) => {
  const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
  return (
     <View>
        <DropDown
          onChangeText={onChange}
          label={label}
          {...restInput}
        />
        {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
     </View>
  );
}; 




nextpage() {
    Actions.addTrainingDetails({startDate: this.state.startDate, endDate: this.state.endDate, team: this.state.team})
}



  render(){
      const {handleSubmit, addTraining} = this.props;
      this.props.dispatch(getAllTeam());

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

            <View style={{ display: "flex", flexDirection: 'row', marginBottom: 20 }}>
              <Text>
                {TrainingStrings.StartDate}
              </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.startDate}
                mode="date"
                placeholder="Start Date"
                // format="MM/DD/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon = {false}
                customStyles={{
                  dateInput: {
                    marginLeft: 36
                  },

                  placeholderText: {
                    fontSize: 18,
                    color:'gray',
                  }
                }}
                onDateChange={(date) => {this.setState({startDate: date})}}
              />
            </View>
            <View style={{ display: "flex", flexDirection: 'row', marginBottom: 20 }}>
              <Text>
                {TrainingStrings.EndDate}
              </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.endDate}
                mode="date"
                placeholder="End Date"
                // format = "MMMM Do YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon = {false}
                customStyles={{
                  dateInput: {
                    marginLeft: 36
                  },

                  placeholderText: {
                    fontSize: 18,
                    color:'gray',
                  }
                }}
                onDateChange={(date) => {this.setState({endDate: date}),this.showList()}}
              />

            </View>

          <TouchableOpacity style={styles.button} onPress={() => this.nextpage()}>
              <Text style={styles.buttonText}>{TrainingStrings.Next}</Text>
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

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "trainingData"
  })
)(addTraining);
