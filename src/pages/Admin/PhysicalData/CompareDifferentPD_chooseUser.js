import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";
import {compose} from "redux";

import {QuestionString} from "../../../constants/strings";

import {getPDbyUserNameAndTemName} from  '../../../actions/physicalData.action';
import {getComparedDifferentUserData} from  '../../../actions/physicalData.action';



import {AlertStrings} from '../../../constants/strings';
import {PhysicalDataStrings} from '../../../constants/strings';



import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

//choose two users and template to compare 
class CompareDifferentPDchooseUser extends Component<{}>{


    state = {
        selectedValue: '',
        user1: '',
        user2: '',
        template: '',
    }

    getUserData = async () =>{
        try {
            const response =  await this.props.dispatch(getComparedDifferentUserData({user1: this.state.user1, user2: this.state.user2,templatename: this.state.template}));
            console.log(response);
           

          if(response.success){
              console.log("get different user PD success");
              //check whether user has physical data or not
              if(Array.isArray(response.responseBody) && response.responseBody[0].length <=0 && response.responseBody[1].length > 0){
                Alert.alert(
                    '',
                    this.state.user2 + ' ' + AlertStrings.NoRecord,
                    [
                      {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
              }else if(Array.isArray(response.responseBody) && response.responseBody[1].length <=0 && response.responseBody[0].length > 0){
                Alert.alert(
                    '',
                    this.state.user1 + ' ' + AlertStrings.NoRecord,
                    [
                      {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
              }else if(Array.isArray(response.responseBody) && response.responseBody[0].length <=0 && response.responseBody[1].length <=0){
                Alert.alert(
                    '',
                    this.state.user1 + ', ' + this.state.user2 + ' ' + AlertStrings.NoRecord,
                    [
                      {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
              }else{
                Actions.differentUsersDate();
              }

          }else{
            throw response;
          }


        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    };

    

    go(){
        this.getUserData();

    }


    render(){
        const {UserList: {userList}} = this.props;
        const {TemplateDisplay: {templates}} = this.props;


        const view = userList ? userList: [{}];

        const tems = templates ? templates: [{}];



        console.log('ooooooo');
        console.log(view);

        const item = view.map((val) =>{
            return {value: val.name};
        })

        const tts = tems.map((val) =>{
            return {value: val.TemplateName};
        })

        console.log('tttttt');
        console.log(tems);

        

        return(
            <View style={styles.container}>
               <Text style={styles.text}>{PhysicalDataStrings.SelectTemplateAndUser}</Text>

               {/* physical data template */}
                <Dropdown  containerStyle = {{width:300}}
                label = {PhysicalDataStrings.template}
                data = {tts}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value,
                        template: value 
                    });
                }}/>

                {/* user list */}
                <Dropdown  containerStyle = {{width:300}}
                label = {PhysicalDataStrings.User1}
                data = {item}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value,
                        user1: value
                    });
                }}/>
                
                {/* user list */}
                <Dropdown  containerStyle = {{width:300}}
                label = {PhysicalDataStrings.User2}
                data = {item}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value,
                        user2: value
                    });
                }}/>

                <TouchableOpacity style={styles.button} onPress = {() =>this.go()}>
                    <Text style={styles.buttonText}>{PhysicalDataStrings.Next}</Text>
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
    },

    button:{
        backgroundColor:'#FFF0F5',
        borderRadius:10,
        width:100,
        paddingVertical:7,
        marginVertical: 20
    },

    buttonText:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'bold',

    },


});


mapStateToProps = (state) => ({
    UserList: state.userReducer.UserList,
    TemplateDisplay: state.physicalDataReducer.TemplateDisplay,
    GetDifferentComparedUserPD: state.physicalDataReducer.GetDifferentComparedUserPD,

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(CompareDifferentPDchooseUser);

