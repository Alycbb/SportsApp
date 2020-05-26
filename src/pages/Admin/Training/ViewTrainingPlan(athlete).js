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

//Display training plan for athlete
//page to display the choosen user's training plan
class viewTrainingPlanUser extends Component<{}>{

  render(){
    const {viewTrainingByUser: {traingingByUser}} = this.props;

    const view = traingingByUser ? traingingByUser: [{}];

    console.log("ccccc");
    console.log(view);


    const allPD = view.map((val) =>{
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
        <View style={{borderTopWidth: 0.6, borderColor: 'black', margin:20}}>
            <Text>{val.user}</Text>
            <View style={{flexDirection: 'row', } }>
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
    viewTrainingByUser: state.trainingReducer.ViewTrainingByUser,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(viewTrainingPlanUser);
