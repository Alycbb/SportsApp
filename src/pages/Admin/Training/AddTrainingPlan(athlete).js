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

import { TrainingStrings } from '../../../constants/strings';

import QuestionInput from "../../../components/QuestionInput";
import AssignTeam_dropDown from "../../../components/AssignTeam_dropdown";
import Loader from "../../../components/Loader";


import {addTrainingPlan} from "../../../actions/training.action";
import {showUserList} from "../../../actions/auth.actions";


import {ErrorUtils} from "../../../utils/auth.utils";

import { Dropdown } from 'react-native-material-dropdown';
import {Actions} from 'react-native-router-flux';

const moment = require('moment');

//Add training plan for athlete
//page to choose specific athlete and date to add training plan
class addTrainingToAthlete extends Component<{}>{

    state = {
      startDate: '',  
      endDate: '',  
      user: ''
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
    Actions.addTrainingDetails({startDate: this.state.startDate, endDate: this.state.endDate, user: this.state.user})
}



  render(){
      const {handleSubmit, addTraining} = this.props;
      this.props.dispatch(showUserList('Athlete'));

      const {UserList: {userList}} = this.props;

      const view = userList ? userList: [{}];

      const item = view.map((val) =>{
        return {value: val.name};
        })
      


      return(
        <View style={styles.container}>
          {addTraining.isLoading && <Loader />}

          <Dropdown  containerStyle = {{width:300}}
                label = {TrainingStrings.ChooseUser}
                data = {item}
                onChangeText={(value) => {
                        this.setState({
                        user: value 
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
                placeholder= {TrainingStrings.StartDate}
                // format="MM/DD/YYYY"
                confirmBtnText= {TrainingStrings.Confirm}
                cancelBtnText= {TrainingStrings.Cancel}
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

          
          {console.log("typpppppeeeee")}
          {console.log(this.state.endDate)}
          {console.log(typeof(this.state.endDate))}
          {console.log(Date.parse(this.state.endDate))}
          {console.log(new Date(this.state.endDate))}

          

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
    UserList: state.userReducer.UserList


})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "trainingData"
  })
)(addTrainingToAthlete);
