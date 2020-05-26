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
import {viewPhysicalDataTemplate} from  '../../../actions/physicalData.action';

import {ErrorUtils} from "../../../utils/auth.utils";


import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

//display all Physical Data Template
class ViewPhycicalDataTem extends Component<{}>{

  Tdelete = async (oldTemplateName) =>{
    try {
        //dispatch action to delete physical data template
        const response =  await this.props.dispatch(DeletePhysicalDataTemplate(oldTemplateName));

      if(response.success){
          Alert.alert(
            '',
            AlertStrings.Success,
            [
              {  
                text: AlertStrings.Cancel,  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
              }, 
              {text: AlertStrings.OK, onPress: () =>{
                //dispatch action to display physical data template
                //so we jump back to previous page, the data can be updated immediately
                this.props.dispatch(viewPhysicalDataTemplate());
                Actions.pop()
              }},
            ],
            {cancelable: true},
          );
      }else{
        throw response;
      }

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }
  
  modifyFunc = (value, oldTemplateName, oldfield1, oldfield2, oldfield3, oldfield4, oldfield5, oldfield6) =>{
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
          {text: AlertStrings.Delete, onPress: () =>{
            this.Tdelete(oldTemplateName); 
          }},
        ],
        {cancelable: true},
      );
    }else if(value === PhysicalDataStrings.Update){
      //jump to next page to input updated physical data template details
      Actions.updatePhysicalDataTem({oldTem: oldTemplateName, o1: oldfield1, o2: oldfield2, o3: oldfield3, o4: oldfield4, o5: oldfield5, o6: oldfield6})
    }
  }
  
  render(){
    const {TemplateDisplay: {templates}} = this.props;

    const view = templates ? templates: [{}];

    console.log("ccccc");
    console.log(templates);

    const modify = [{
      value: PhysicalDataStrings.Update
    },{
      value: PhysicalDataStrings.Delete
    }];

    const allTemplates = view.map((val) =>{
      const oldfield1 = val.TemplateDetails[0].field1;
      const oldfield2 = val.TemplateDetails[0].field2;
      const oldfield3 = val.TemplateDetails[0].field3;
      const oldfield4 = val.TemplateDetails[0].field4;
      const oldfield5 = val.TemplateDetails[0].field5;
      const oldfield6 = val.TemplateDetails[0].field6;


      return(
        <View>
            <View style={{flexDirection: 'row', borderTopWidth: 0.6, borderColor: 'black'}}>
              <View style={{borderStyle: 'solid'}}>
                <Text style={{ fontWeight:'bold', fontSize: 16}}>{val.TemplateName}</Text>
                <Text>{oldfield1}</Text>
                <Text>{oldfield2}</Text>
                <Text>{oldfield3}</Text>
                <Text>{oldfield4}</Text>
                <Text>{oldfield5}</Text>
                <Text>{oldfield6}</Text>
              </View>
              <View style={{width: 200, alignItems:'center'}}>
                    <TouchableOpacity>
                      <Dropdown containerStyle = {{width:70}}
                          label = {PhysicalDataStrings.Modify}
                          data = {modify}
                          onChangeText = {(value) =>{
                            this.setState({
                              modifyStatus: value 
                          });
                          this.modifyFunc(value, val.TemplateName, oldfield1, oldfield2, oldfield3, oldfield4, oldfield5, oldfield6 );
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
                {allTemplates}
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
    // width: '100%',
    // justifyContent:'center',
    // alignItems:'center'
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
  TemplateDisplay: state.physicalDataReducer.TemplateDisplay,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhycicalDataTem);
