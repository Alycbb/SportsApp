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

import {QuestionString, PhysicalDataStrings} from "../../../constants/strings";

import {getPDbyUserNameAndTemName} from  '../../../actions/physicalData.action';
import {getTwoComparedPD} from  '../../../actions/physicalData.action';



import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

var tempCheckValues0 = [];
var tempCheckValues1 = [];


//choose two users' data(date) to compare
class CompareDifferentPDchooseDate extends Component<{}>{


    state = {
        checkBoxChecked0: [],
        checkBoxChecked1: [],

        ids0: null,
        ids1: null
      }

    

    compare(value1, value2){
        this.showCompareResults(value1,value2);

    }


    showCompareResults = async (value1, value2) =>{
        try {
            // dispatch the action to compare selected two data
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

//user1' checkbox function
    checkBoxChanged0(_id, value) {

        this.setState({
            checkBoxChecked0: tempCheckValues0
        })

        var tempCheckBoxChecked0 = this.state.checkBoxChecked0;
        tempCheckBoxChecked0[_id] = !value;

        this.setState({
            checkBoxChecked0: tempCheckBoxChecked0
        })

        console.log(this.state.checkBoxChecked0);

        var newff = [];
        
        
        var IDs = [];

        for(var propName in this.state.checkBoxChecked0) {
            if(this.state.checkBoxChecked0.hasOwnProperty(propName)) {
                var propValue = this.state.checkBoxChecked0[propName];
                if(propValue == true){
                    IDs.push([propName]);
                }
            }
        }
        console.log('plzzzz');
        console.log(IDs)
        this.setState({ids0: IDs})
    }

//user2' checkbox function
    checkBoxChanged1(_id, value) {

        this.setState({
            checkBoxChecked1: tempCheckValues1
        })

        var tempCheckBoxChecked1 = this.state.checkBoxChecked1;
        tempCheckBoxChecked1[_id] = !value;

        this.setState({
            checkBoxChecked1: tempCheckBoxChecked1
        })

        console.log(this.state.checkBoxChecked1);

        var newff = [];
        
        
        var IDs = [];

        for(var propName in this.state.checkBoxChecked1) {
            if(this.state.checkBoxChecked1.hasOwnProperty(propName)) {
                var propValue = this.state.checkBoxChecked1[propName];
                if(propValue == true){
                    IDs.push([propName]);
                }
            }
        }
        console.log('plzzzz');
        console.log(IDs)
        this.setState({ids1: IDs})
    }

    render(){
        const {GetDifferentComparedUserPD: {DifferntUsersPDs}} = this.props;

        const view = DifferntUsersPDs ? DifferntUsersPDs: [];
        console.log('ooooooo');
        console.log(view);
        console.log(view[0]);

//user1' checkbox
        const user1 = view[0].map((val) =>{
            { tempCheckValues0[val._id] = false }
          return(
            <View style={{  }}>
                <View style={{flexDirection: 'row',  borderTopWidth: 0.6, borderColor: 'black' }}>
                    <CheckBox
                        value={this.state.checkBoxChecked0[val._id]}
                        onValueChange={() => this.checkBoxChanged0(val._id, this.state.checkBoxChecked0[val._id])}
                    /> 
                    <View style={{borderStyle: 'solid'}}>
                        <Text>{val.date}</Text>
                  </View>
                </View>
              </View>
          )
        });

//user2' checkbox
        const user2 = view[1].map((val) =>{
            { tempCheckValues1[val._id] = false }
          return(
            <View style={{  }}>
                <View style={{flexDirection: 'row',  borderTopWidth: 0.6, borderColor: 'black' }}>
                    <CheckBox
                        value={this.state.checkBoxChecked1[val._id]}
                        onValueChange={() => this.checkBoxChanged1(val._id, this.state.checkBoxChecked1[val._id])}
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
                <Text>{(view[0])[0].userName}</Text>
                {user1}
                <Text>{(view[1])[0].userName}</Text>
                {user2}


                <TouchableOpacity onPress = {() => this.compare(this.state.ids0[0], this.state.ids1[0])}>
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
    GetUserPhysicalData: state.physicalDataReducer.GetUserPhysicalData,
    GetDifferentComparedUserPD: state.physicalDataReducer.GetDifferentComparedUserPD,

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(CompareDifferentPDchooseDate);

