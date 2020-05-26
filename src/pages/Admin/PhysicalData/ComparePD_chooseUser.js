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
import {PhysicalDataStrings} from "../../../constants/strings";


import {getPDbyUserNameAndTemName} from  '../../../actions/physicalData.action';
import {AlertStrings} from '../../../constants/strings';


import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

//choose one user to compare
class ComparePDchooseUser extends Component<{}>{


    state = {
        selectedValue: '',
        user: '',
        template: '',
    }

    getUserData = async () =>{
        try {
            //dispatch action to get physical data
            const response =  await this.props.dispatch(getPDbyUserNameAndTemName({username: this.state.user, templatename: this.state.template}));
            console.log(response);
    
          if(response.success){
              console.log("get user PD by userName success");
              //check whether this user has data
              if(Array.isArray(response.responseBody) && response.responseBody.length <= 0){
                Alert.alert(
                    '',
                    AlertStrings.NoRecord,
                    [
                      {text: AlertStrings.OK, onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
              }else{
                //jump to next page to choose two data to compare
                Actions.comparePD_chooseDate();
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
               {/* userlist */}
               <Dropdown  containerStyle = {{width:300}}
                label = {PhysicalDataStrings.User}
                data = {item}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value,
                        user: value
                    });
                    
                }}/>

                {/* template list */}
                <Dropdown  containerStyle = {{width:300}}
                label = {PhysicalDataStrings.template}
                data = {tts}
                onChangeText={(value) =>{
                    this.setState({
                        selectedValue: value,
                        template: value 
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
    GetUserPhysicalData: state.physicalDataReducer.GetUserPhysicalData,


})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ComparePDchooseUser);

