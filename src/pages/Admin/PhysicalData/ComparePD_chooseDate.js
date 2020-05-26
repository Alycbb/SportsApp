import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    CheckBox,
    Alert
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";
import {compose} from "redux";

import {QuestionString, AlertStrings, PhysicalDataStrings} from "../../../constants/strings";

import {getPDbyUserNameAndTemName} from  '../../../actions/physicalData.action';
import {getTwoComparedPD} from  '../../../actions/physicalData.action';



import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

var tempCheckValues = [];

// choose one user's data(dates) to compare
class ComparePDchooseDate extends Component<{}>{


    state = {
        checkBoxChecked: [],
        ids: null
      }


    compare(value1, value2){
        // check whether checked data Number is 2
        //if not then alert
        if(Array.isArray(this.state.ids) && this.state.ids.length == 2){
            this.showCompareResults(value1,value2);
        }else{
            Alert.alert(
                '',
                AlertStrings.SelectTwoDatesPlz,
                [
                  {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
    }


    showCompareResults = async (value1, value2) =>{
        try {
            //dispatch action to get two compared data
            const response =  await this.props.dispatch(getTwoComparedPD({ID1: value1, ID2: value2}));
    
          if(response.success){
              console.log("show compared two PDs success");
              //jump to next page to display compared result
              Actions.ComparedResult();

          }else{
            throw response;
          }


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

        // Object.entries(this.state.checkBoxChecked).map(([key, val]) =>{
        //     console.log(key);
        //     console.log(typeof(val));
        //     newff.push({[key]: val});
        //     console.log(newff);
        // })
        // console.log(newff);
        
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

        const view = userPDs ? userPDs: [{}];
        console.log('ooooooo');
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
                        <Text>{val.date}</Text>
                  </View>
                </View>
              </View>
          )
        });


        

        return(
            <View style={styles.container}>
                {lists}
               {/* <Text style={styles.text}>choose Date:</Text> */}
               {/* <Dropdown  containerStyle = {{width:300}}
                label = "Dates"
                data = {item}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value 
                    });
                    // this.go(value);
                }}/>

                <Dropdown  containerStyle = {{width:300}}
                label = "Dates"
                data = {item}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value 
                    });
                    // this.go(value);
                }}/> */}
                <TouchableOpacity onPress = {() => this.compare(this.state.ids[0], this.state.ids[1])}>
                  <Text> {PhysicalDataStrings.Compare}</Text>
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

    text:{
        fontSize:19,
        fontWeight:'500',
        color:'#000000',
        textAlign: 'left'
    }


});


mapStateToProps = (state) => ({
    UserList: state.userReducer.UserList,
    TemplateDisplay: state.physicalDataReducer.TemplateDisplay,
    GetUserPhysicalData: state.physicalDataReducer.GetUserPhysicalData,
    GetTwoComparedPD: state.physicalDataReducer.GetUserPhysicalData



})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ComparePDchooseDate);

