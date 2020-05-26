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

//the first page to choose action, including:
//add template
//view template
//add physical data
//view physical data
//compare physical data
class ActionChoose_PD extends Component<{}>{

    viewTemplate = async () =>{
        try {
            //dispatch action to display all physical data template
            const response =  await this.props.dispatch(viewPhysicalDataTemplate());
    
          if(response.success){
              console.log("get templates successfully")
          }else{
            throw response;
          }
          //jump to next page(display all physical data template)
          Actions.viewPhysicalDataTem();

        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    };


    addPhysicalData = async () =>{
        try {
            //display action to display athlete list
            const response =  await this.props.dispatch(showUserList('Athlete'));

            if(response.success){
                console.log("show successfully")
            }else{
                throw response;
            }
            //jump to next page to choose user
            Actions.chooseUser();
        } catch (error) {
            const newError = new ErrorUtils(error, "Error");
            newError.showAlert();
        }
    }

    viewPD = async () =>{
        try {
            //display action to display all physical
            const response =  await this.props.dispatch(viewPhysicalData());
            if(response.success){
                console.log("show successfully")
            }else{
                throw response;
            }
            //jump to next page(diaplay all physical data)
            Actions.viewPhysicalData();

        } catch (error) {
            const newError = new ErrorUtils(error, "Error");
            newError.showAlert();
        }
    }

    comparePhysicalData = async () =>{
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
            //jump to next page to choose action(compare same user/different user)
            Actions.differentUserActions();


        } catch (error) {
            const newError = new ErrorUtils(error, "Error");
            newError.showAlert();
        }
    }




    goaddTemplate(){
        Actions.addPhysicalDataTem();
    }

    goviewTemplate(){
        this.viewTemplate();
    }

    goaddPhysicalData(){
        this.addPhysicalData();
    }

    goviewPhysicalData(){
        this.viewPD();
    }

    gocomparePhysicalData(){
        this.comparePhysicalData();
    }


    

    render(){
        console.log(this.props)
        return(
            <View style={styles.container}>
                
                <TouchableOpacity onPress={() =>this.goaddTemplate()}>
                    <View style={{width:200}}>
                        <Text style={styles.checklist}>{PhysicalDataStrings.AddPhysicalDataTemplate}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goviewTemplate()}>
                    <View style={{width:200}}>
                        <Text style={styles.checklist}>{PhysicalDataStrings.ViewPhysicalDataTemplate}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goaddPhysicalData()}>
                    <View style={{width:200}}>
                        <Text style={styles.checklist}>{PhysicalDataStrings.AddPhysicalData}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.goviewPhysicalData()}>
                    <View style={{width:200}}>
                        <Text style={styles.checklist}>{PhysicalDataStrings.ViewPhysicalData}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() =>this.gocomparePhysicalData()}>
                    <View style={{width:200}}>
                        <Text style={styles.checklist}>{PhysicalDataStrings.ComparePhysicalData}</Text>
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
      padding:20,
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

export default connect(mapStateToProps, mapDispatchToProps)(ActionChoose_PD);


