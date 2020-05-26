import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  Alert,
  Switch,
  ScrollView
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
import InputText from '../../../components/InputText';
import { TrainingStrings, AlertStrings } from '../../../constants/strings';

const moment = require('moment');

//input specific training plan
class addTrainingDetails extends Component<{}>{

  state = {
    aa: [],
    selectedValue: '' 

  }
    

  addTrainingPlan = async() =>{
    try {
      const response =  await this.props.dispatch(addTrainingPlan({details: JSON.stringify(this.state.aa), teamName: this.props.team, userName: this.props.user}));
      
      if(response.success){
        Alert.alert(
          AlertStrings.Success,
          AlertStrings.AddTrainingPlanSuccess,
          [
            {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
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


create() {
  this.addTrainingPlan();
}


pushVaule(singleDay, value) {


  // for(var propName in aa) {
  //   if(aa.hasOwnProperty(singleDay)) {
  //       var propValue = aa[singleDay];
  //       if(propValue !== value){
  //           aa[singleDay] = value;
  //       }
  //   }else{
  //     aa.push({[singleDay]: value})
  //   }
  // }
  this.state.aa.push({[singleDay]: value})

  // if(aa.hasOwnProperty(singleDay)){

  // }

  // console.log(aa.hasOwnProperty(singleDay));

  // for(var propName in aa) {
  //   if(aa.hasOwnProperty(propName)) {
  //     var propValue = aa[propName];
  //     if(propName === singleDay){
  //       aa[propName] = value;
  //       console.log("wtf")
  //     }
  //   }else{
  //     console.log("wrong")
  //   }
  // }


  

}



  render(){
      const {handleSubmit, addTraining} = this.props;

      //training plan content is default: bike,swim,run,strength and flexibility, which can be modified later
      const data = [{
        value: TrainingStrings.Bike,
      }, {
        value: TrainingStrings.Swim,
      }, {
        value: TrainingStrings.Run,
      }, {
        value: TrainingStrings.Strength,
      }, {
        value: TrainingStrings.Flexibility,
      }];

      var getDaysArray = function(start, end) {
        for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

      var daylist = getDaysArray(new Date(this.props.startDate),new Date(this.props.endDate));
      var days = daylist.map((v)=>{
        return v.toISOString().slice(5,10) ;
      })
      console.log(days);

      var display = days.map((singleDay) =>{
        return(
          <View>
            <Text>{singleDay}</Text>
            <Dropdown containerStyle = {{width:300}}
              label = {TrainingStrings.Training}
              data = {data}
              onChangeText={(value) => {
                      this.setState({
                      selectedValue: value 
                  });
                  this.pushVaule(singleDay,value)
            }}/>
                
          </View>
        )
      })



      return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>

          {display}
          {console.log(this.state.aa)}

          <TouchableOpacity style={styles.button} onPress={() => this.create()}>
            <Text style={styles.buttonText}>{TrainingStrings.Submit}</Text>
          </TouchableOpacity>

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
)(addTrainingDetails);
