import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  CheckBox
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";

import {PhysicalDataStrings} from '../../../constants/strings';
import {AlertStrings} from '../../../constants/strings';


import {addPhysicalDataTemplate} from  '../../../actions/physicalData.action';
import {DeletePhysicalDataTemplate} from  '../../../actions/physicalData.action';
import {DeletePhysicalData} from  '../../../actions/physicalData.action';


import {viewPhysicalData} from  '../../../actions/physicalData.action';
import {getTwoComparedPD} from  '../../../actions/physicalData.action';


import {ErrorUtils} from "../../../utils/auth.utils";


import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

var tempCheckValues = [];


class ComparePD_UserData extends Component<{}>{


    state = {
        checkBoxChecked: [],
        ids: null
      }



    compare(value1, value2){
        this.showCompareResults(value1,value2);
    }


    showCompareResults = async (value1, value2) =>{
        try {
          //dispatch action to get two compared data
          const response =  await this.props.dispatch(getTwoComparedPD({ID1: value1, ID2: value2}));
    
          if(response.success){
              console.log("show compared two PDs success");

          }else{
            throw response;
          }
          //jump to next page to display compared result
          Actions.ComparedResult();


        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    };

   

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

        var newff = [];
        
        
        var IDs = [];

        for(var propName in this.state.checkBoxChecked) {
            if(this.state.checkBoxChecked.hasOwnProperty(propName)) {
                var propValue = this.state.checkBoxChecked[propName];
                if(propValue == true){
                    IDs.push([propName]);
                }
            }
        }
        console.log('plzzzz');
        console.log(IDs)
        this.setState({ids: IDs})

    }

    
  
  render(){
    const {GetUserPhysicalData: {userPDs}} = this.props;

    const view = userPDs ? userPDs: [{dataDetails: {}}];

    console.log("ccccc");
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
                    <Text>{PhysicalDataStrings.User} {val.userName}</Text>
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
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
              <View style = {{ width: 300}}>
                {lists}
              </View>
              <TouchableOpacity onPress = {() => this.compare(this.state.ids[0], this.state.ids[1])}>
                  <Text>{PhysicalDataStrings.Compare}</Text>
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
    borderTopWidth: 0.6, 
    borderColor: 'black'
    
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
    GetUserPhysicalData: state.physicalDataReducer.GetUserPhysicalData,
    GetTwoComparedPD: state.physicalDataReducer.GetUserPhysicalData
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePD_UserData);
