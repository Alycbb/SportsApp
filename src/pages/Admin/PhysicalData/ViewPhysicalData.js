import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";

import {PhysicalDataStrings} from '../../../constants/strings';
import {AlertStrings} from '../../../constants/strings';


import {addPhysicalDataTemplate} from  '../../../actions/physicalData.action';
import {DeletePhysicalDataTemplate} from  '../../../actions/physicalData.action';
import {DeletePhysicalData} from  '../../../actions/physicalData.action';




import {viewPhysicalData} from  '../../../actions/physicalData.action';

import {ErrorUtils} from "../../../utils/auth.utils";


import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

//display all physical data
class ViewPhycicalData extends Component<{}>{


  PDdelete = async (oldTemplateName, name) =>{
    try {
        // dispatch action to delte physical data
        const response =  await this.props.dispatch(DeletePhysicalData({tem:oldTemplateName, user:name}));
        // dispatch action to display all physical data
        this.props.dispatch(viewPhysicalData());


      if(response.success){
          console.log("delete it ")
      }else{
        throw response;
      }


    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }
  
  modifyFunc = (value, oldTemplateName,name, dataDetails, TemID, olddate) =>{
    if(value === PhysicalDataStrings.Delete){
      Alert.alert(
        AlertStrings.DoubleCheck,
        AlertStrings.reallyDelete,
        [
          {  
            text: AlertStrings.Cancel,  
            onPress: () => console.log('Cancel Pressed'),  
            style: 'cancel',  
          }, 
          {text: AlertStrings.Delete, onPress: () => this.PDdelete(oldTemplateName, name)},
        ],
        {cancelable: true},
      );

      
    }else if(value === PhysicalDataStrings.Update){
      //jump to next page to input updated physical data
      Actions.updatePhysicalData({templateName: oldTemplateName, OldDataDetails: dataDetails, TemID: TemID, OldDate: olddate})
    }
  }
  
  render(){
    const {ViewPhysicalData: {PDs}} = this.props;
    const view = PDs ? PDs: [{}];

    console.log("PDs");
    console.log(view);

    const modify = [{
      value: PhysicalDataStrings.Update
    },{
      value: PhysicalDataStrings.Delete
    }];

    // map and display each data
    const allPD = view.map((val) =>{
      return(
        <View>
            <View style={{flexDirection: 'row',  borderTopWidth: 0.6, borderColor: 'black' }}>
              <View style={{width:240, borderStyle: 'solid'}}>
                <Text style={{ fontWeight:'bold', fontSize: 18}}>{val.TemplateName}</Text>
                <Text>{PhysicalDataStrings.User} {val.userName}</Text>
                {Object.entries(val.dataDetails).map(([key, val]) =>
                       <Text>{key}:{val}</Text> 
                )}
                <Text>{val.date}</Text>
              </View>
              <View style={{width: 80, alignItems:'center'}}>
                    <TouchableOpacity>
                      <Dropdown containerStyle = {{width:70}}
                          label = {PhysicalDataStrings.Modify}
                          data = {modify}
                          onChangeText = {(value) =>{
                            this.setState({
                              modifyStatus: value 
                          });
                          this.modifyFunc(value, val.TemplateName, val.userName, val.dataDetails, val._id, val.date);
                          }}/>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
      )
    });

      return(
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                {allPD}
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

  inputBox:{
    width:300,
    backgroundColor:'rgba(255,255,255,0.9)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:16,
    fontWeight: "bold",
    color:'#000000',
    marginVertical: 5
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
    
  }
  
});

mapStateToProps = (state) => ({
    ViewPhysicalData: state.physicalDataReducer.ViewPhysicalData,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhycicalData);
