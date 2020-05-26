import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  Alert,
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import QuestionInput from "../../../components/QuestionInput";
import {PhysicalDataStrings} from "../../../constants/strings";
import {AlertStrings} from "../../../constants/strings";


import {getPDbyUserName} from "../../../actions/physicalData.action";
import {getTwoComparedPD} from  '../../../actions/physicalData.action';


import Loader from "../../../components/Loader";
import {ErrorUtils} from "../../../utils/auth.utils";

import { Dropdown } from 'react-native-material-dropdown';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

var tempCheckValues = [];

//diaplay physical data
class PhysicalData extends Component<{}>{


  state = {
    checkBoxChecked: [],
    ids: null,
    trueNumber: null,
  }

    
  getPDbyUserName = async(values) =>{
    try {
      const response =  await this.props.dispatch(getPDbyUserName(values));
      
      if(response.success){
        console.log("show physical data by user name success")
      }else{
        throw response;
      }

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
}

showCompareResults = async (value1, value2) =>{
  try {
      const response =  await this.props.dispatch(getTwoComparedPD({ID1: value1, ID2: value2}));

    if(response.success){
      if(response.responseBody[0].TemplateName != response.responseBody[1].TemplateName ){
        Alert.alert(
          AlertStrings.Error,
          AlertStrings.TemplateNotMatch,
          [
            {
              text: AlertStrings.OK,
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      }else{
        console.log("show compared two PDs success");
        Actions.compareUserData();
      }

    }else{
      throw response;
    }
    // Actions.ComparedResult();
  } catch (error) {
    const newError = new ErrorUtils(error, "Error");
    newError.showAlert();
  }
};

compareData(value1, value2){
  if(Array.isArray(this.state.trueNumber) && this.state.trueNumber.length != 2){
  // if(Object.keys(this.state.checkBoxChecked).length != 2 ){
    Alert.alert(
      AlertStrings.Error,
      AlertStrings.ChooseOnlyTwo,
      [
        {
          text: AlertStrings.OK,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  }else{
    this.showCompareResults(value1,value2);
  }
}


check = (values) =>{
  this.getPDbyUserName(values);
}


checkBoxChanged(_id, value) {

  this.setState({
      checkBoxChecked: tempCheckValues
  })

  var tempCheckBoxChecked = this.state.checkBoxChecked;
  tempCheckBoxChecked[_id] = !value;

  this.setState({
      checkBoxChecked: tempCheckBoxChecked
  })

  console.log(this.state.checkBoxChecked);

  var trueee = [];
  
  
  var IDs = [];

  for(var propName in this.state.checkBoxChecked) {
      if(this.state.checkBoxChecked.hasOwnProperty(propName)) {
          var propValue = this.state.checkBoxChecked[propName];
          if(propValue == true){
              IDs.push([propName]);
              trueee.push(propValue);
          }
      }
  }
  console.log('plzzzz');
  console.log(IDs);
  console.log("ddddd");
  console.log(trueee);
  this.setState({
    ids: IDs,
    trueNumber: trueee
  });

}



  render(){
      const {handleSubmit} = this.props;
      const {getUser: {userDetails}} = this.props;
      const {GetPDbyUserName: {PDsByName}} = this.props;

      const view = PDsByName ? PDsByName: [];
      console.log(view);

      const lists = view.map((val) =>{
        { tempCheckValues[val._id] = false }

      return(
        <View style={{  }}>
            <View style={{flexDirection: 'row',  borderTopWidth: 0.6, borderColor: 'black' }}>
              
                <CheckBox
                    value={this.state.checkBoxChecked[val._id]}
                    onValueChange={() => this.checkBoxChanged(val._id, this.state.checkBoxChecked[val._id])}
                /> 
                <View style={{borderStyle: 'solid'}}>

                    <Text style={{ fontWeight:'bold', fontSize: 18}}>{val.TemplateName}</Text>
                    <Text>User: {val.userName}</Text>
                    {Object.entries(val.dataDetails).map(([key, val]) =>
                        <Text>{key}:{val}</Text> 
                    )}

                    <Text>{val.date}</Text>
              </View>
            </View>
          </View>
      )
    });


      

      
        

      return(
        <View style={styles.container}>
            {view.length > 0 ?
              <View >
                <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>

                  <View>
                    {lists}
                  </View>

                  <View>
                    <TouchableOpacity style={styles.button} onPress={() => this.compareData(this.state.ids[0], this.state.ids[1])}>
                      <Text style={styles.buttonText}>{PhysicalDataStrings.Compare}</Text>
                    </TouchableOpacity>
                  </View>

                </ScrollView>
              </View>
                : 
                <View style={{alignItems:'center', justifyContent:'center',marginTop:250}}>
                  <TouchableOpacity style={styles.button} onPress={() => this.check(userDetails.user.name)}>
                    <Text style={styles.buttonText}>{PhysicalDataStrings.CheckPhysicalData}</Text>
                  </TouchableOpacity>
                 </View>  
                }
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center'
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
    getUser: state.userReducer.getUser,
    GetPDbyUserName: state.physicalDataReducer.GetPDbyUserName,
    GetTwoComparedPD: state.physicalDataReducer.GetUserPhysicalData

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "physcialData"
  })
)(PhysicalData);
