import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";
import DatePicker from 'react-native-datepicker';


import Grade_dropDown from "../../../components/grade_dropdown";
import InputText from "../../../components/InputText";
import QuesTem from "../../../components/QuesTem";

import {AlertStrings, PhysicalDataStrings} from "../../../constants/strings";
import {UserControlStrings} from "../../../constants/strings";

import {UpdatePhysicalData} from "../../../actions/physicalData.action";
import {viewPhysicalData} from  '../../../actions/physicalData.action';

import {Actions} from 'react-native-router-flux';
import {ErrorUtils} from "../../../utils/auth.utils";
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
  },
  
  textStyle:{
      color:"#fff",
      fontSize:18
  },
  button:{
    backgroundColor:'#4682B4',
    borderRadius:25,
    width:200,
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

//input Update physical data template
class InputPDUpdate extends Component<{}>{

    state = {
        newDate: this.props.OldDate,  
        updateInfo: [],

      }
    
      UpdatePhysicalData = async() =>{
        try {
          // dispatch action to update physical data
          const response =  await this.props.dispatch(UpdatePhysicalData({TemID: this.props.TemID, newDataDetails: this.state.updateInfo, newDate: this.state.newDate}));

          if(response.success){
            Alert.alert(
                AlertStrings.Success,
                AlertStrings.UpdatePDSuccess,
                [
                  {text: AlertStrings.OK, onPress: () =>{
                    //dispatch action to display physical data
                    //so we jump back to previous page, the data can be updated immediately
                    this.props.dispatch(viewPhysicalData());
                    Actions.pop();
                    },
                  } 
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

    // viewPhysicalData = async() =>{
    //     try {
    //       const response =  await this.props.dispatch(viewPhysicalData());

    //       if(response.success){
    //         console.log('success')
    //       }else{
    //         throw response;
    //       }

    //     } catch (error) {
    //       const newError = new ErrorUtils(error, "Error");
    //       newError.showAlert();
    //     }
    // }
  
    submitData = () =>{
        this.UpdatePhysicalData();
        // this.viewPhysicalData();

    }
    

    //handle the newly input data and key 
    handleText  = (event ,newkey, length) =>{
        console.log(length)
        console.log("newKey:")
        console.log(newkey);
        console.log("newValue:")
        console.log(event.nativeEvent.text);
        (this.state.updateInfo).push({[newkey]: event.nativeEvent.text});

        (this.state.updateInfo).map((value) =>{
            Object.entries(value).map(([key, val]) =>{
                console.log("Key:")
                console.log(key);
                console.log("Val:")
                console.log(val);
                if(key === newkey){
                    if(val !== event.nativeEvent.text){
                        const index = (this.state.updateInfo).indexOf(value);
                        if (index > -1) {
                            (this.state.updateInfo).splice(index, 1);
                        }
                    }else if(val === event.nativeEvent.text && (this.state.updateInfo).length > length){
                        const index = (this.state.updateInfo).indexOf(value);
                        if (index > -1) {
                            (this.state.updateInfo).splice(index, 1);
                        }
                    } 
                }
            })
        })
        
        console.log(this.state.updateInfo)

    }


  render(){
    const {handleSubmit} = this.props;
    const oldData= this.props.OldDataDetails


    console.log("let me check");
    console.log(oldData);

    //to get the key of physical data
    const getLegngth = [];
    Object.entries(oldData).map(([key, val]) =>{
        console.log(key);
        getLegngth.push(key)
    })
    console.log(getLegngth.length)
    

    const aaa = Object.entries(oldData).map(([key, val]) =>{
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <Text>{key}:</Text> 
                <TextInput style = {{ borderWidth : 0.5, width: 150, height: 40}}
                    // defaultValue = {val}
                    placeholder = "new data"
                    onEndEditing = {(event) => this.handleText(event, key, getLegngth.length)}>
                </TextInput>
                
            </View>
        )

    });

    return(
        <View style = {styles.container} >
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    {aaa}
                </View>
                <View>
                    <Text style={{marginTop: 10}}>
                        {PhysicalDataStrings.NewDate}
                    </Text>
                </View>
                <View style = {{ marginRight:25}}>
                  {/* component to choose date */}
                    <DatePicker
                        style={{width: 185}}
                        date={this.state.newDate}
                        mode="date"
                        placeholder= {PhysicalDataStrings.ChooseNewDate}
                        format="MM/DD/YYYY"
                        confirmBtnText= {PhysicalDataStrings.Confirm}
                        cancelBtnText= {PhysicalDataStrings.Cancel}
                        showIcon = {false}
                        customStyles={{
                        dateInput: {
                            marginLeft: 36
                        },
                        placeholderText: {
                            fontSize: 18,
                            color:'gray',
                        },
                    }}
                    onDateChange={(date) => {this.setState({newDate: date})}}
                    />
                </View>
                <View style={{marginTop:10}}>
                    <TouchableOpacity style={styles.button} onPress={() => this.submitData()}>
                        <Text style={styles.buttonText}>{UserControlStrings.Submit}</Text>
                    </TouchableOpacity>
                </View>
                

            </ScrollView>
    </View>
    )
  }
}



mapStateToProps = (state) => ({
    // actions were dispatched above, then use reducer to store data
    //in next page, call the same reducer then we can get the data inside
    ViewPhysicalData: state.physicalDataReducer.ViewPhysicalData,

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(InputPDUpdate);

