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

import {displayChosenPDTemplate} from  '../../../actions/physicalData.action';


import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

//choose template to add physical data 
class AddPDchooseTem extends Component<{}>{

    state = {
        selectedValue: ''
    }

    displayChosenPDTemplate = async () =>{
        try {
            //dispatch action to display details of this template
            const response =  await this.props.dispatch(displayChosenPDTemplate(this.state.selectedValue));
    
          if(response.success){
              console.log("get chosen template successfully");

          }else{
            throw response;
          }

          //pass username, physical data template to next page to input answer to each field
          Actions.addPDDetails({username: this.props.user, template: this.state.selectedValue})


        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    };


    go(){
        this.displayChosenPDTemplate();
    }


    render(){
        //get data from reducer
        const {TemplateDisplay: {templates}} = this.props;

        const view = templates ? templates: [{}];
        console.log('cccccc');
        console.log(view);

        // map the data as dropdown data
        const item = view.map((val) =>{
            return {value: val.TemplateName};
        })


        return(
            <View style={styles.container}>
               <Text style={styles.text}>{PhysicalDataStrings.SelectTemplate}</Text>
               <Dropdown  containerStyle = {{width:300}}
                label = {PhysicalDataStrings.template}
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
    TemplateDisplay: state.physicalDataReducer.TemplateDisplay,
    DisplayOneTemplate: state.physicalDataReducer.DisplayOneTemplate
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(AddPDchooseTem);

