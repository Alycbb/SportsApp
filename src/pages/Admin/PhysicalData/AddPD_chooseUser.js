import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";
import {compose} from "redux";

import {QuestionString, PhysicalDataStrings} from "../../../constants/strings";

import {viewPhysicalDataTemplate} from  '../../../actions/physicalData.action';


import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

// choose user to add physical data 
class AddPDchooseUser extends Component<{}>{

    state = {
        selectedValue: ''
    }

    viewTemplate = async () =>{
        try {
            //dispatch action to display physical data template
            const response =  await this.props.dispatch(viewPhysicalDataTemplate());
    
          if(response.success){
              console.log("get templates successfully");

          }else{
            throw response;
          }
          //jump to next page to choose physical data template
          //pass the value of selected user
          Actions.chooseTem({user: this.state.selectedValue});


        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    };

    

    go(){
        this.viewTemplate();
    }


    render(){
        const {UserList: {userList}} = this.props;

        const view = userList ? userList: [{}];
        console.log('ooooooo');
        console.log(view);

        const item = view.map((val) =>{
            return {value: val.name};
        })


        

        return(
            <View style={styles.container}>
               <Text style={styles.text}>{PhysicalDataStrings.SelectUser}</Text>
               <Dropdown  containerStyle = {{width:300}}
                label = {PhysicalDataStrings.User}
                data = {item}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value 
                    });
                    this.go();
                }}/>

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
    //actions were dispatched above, then use reducer to store data
    //in next page, call the same reducer then we can get the data inside
    UserList: state.userReducer.UserList,
    TemplateDisplay: state.physicalDataReducer.TemplateDisplay

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(AddPDchooseUser);

