import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {PhysicalDataStrings} from '../../../constants/strings';

import {viewPhysicalDataTemplate} from  '../../../actions/physicalData.action';

import {viewPhysicalData} from  '../../../actions/physicalData.action';


import{showUserList} from '../../../actions/auth.actions';



import {connect} from "react-redux";
import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import {ErrorUtils} from "../../../utils/auth.utils";


//choose to compare same/different user
//compare same user
//compare different user
class ActionDifferentCompare extends Component<{}>{

    sameUser = async () =>{
        try {
            //display action to display athlete list
            const response =  await this.props.dispatch(showUserList('Athlete'));
            
            if(response.success){
                console.log("show successfully")
            }else{
                throw response;
            }
            //display physical data template list
            this.props.dispatch(viewPhysicalDataTemplate());
            //jump to next page to choose user
            Actions.comparePD_chooseuser();


        } catch (error) {
            const newError = new ErrorUtils(error, "Error");
            newError.showAlert();
        }
    }

    differentUsers = async () =>{
        try {
            //display action to display athlete list
            const response =  await this.props.dispatch(showUserList('Athlete'));
            
            if(response.success){
                console.log("show successfully")
            }else{
                throw response;
            }
            //display physical data template list
            this.props.dispatch(viewPhysicalDataTemplate());
            //jump to next page to choose users
            Actions.differentUsers();


        } catch (error) {
            const newError = new ErrorUtils(error, "Error");
            newError.showAlert();
        }
    }

    



    gosameUser(){
        this.sameUser();
    }

    godifferentUsers(){
        this.differentUsers();

    }


    

    render(){
        return(
            <View style={styles.container}>
                

                <TouchableOpacity onPress={() =>this.gosameUser()}>
                    <View style={{width:180}}>
                        <Text style={styles.checklist}>{PhysicalDataStrings.sameUser}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.godifferentUsers()}>
                    <View style={{width:180}}>
                        <Text style={styles.checklist}>{PhysicalDataStrings.differenntUsers}</Text>
                    </View>

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

    checklist:{
        // flexGrow:1,
      justifyContent:'center',
      alignItems:'flex-end',
      paddingVertical:10,
      fontWeight:'bold',
      marginTop:30,
      backgroundColor: '#FFF0F5',
      padding:10,
      borderRadius:7,
      

    },

    text:{
        fontSize:19,
        fontWeight:'500',
        color:'#000000',
        textAlign: 'left',
    }


});

mapStateToProps = (state) => ({
    //actions were dispatched above, then use reducer to store data
    //in next page, call the same reducer then we can get the data inside
    TemplateDisplay: state.physicalDataReducer.TemplateDisplay,
    UserList: state.userReducer.UserList,
    ViewPhysicalData: state.physicalDataReducer.ViewPhysicalData,


})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionDifferentCompare);


