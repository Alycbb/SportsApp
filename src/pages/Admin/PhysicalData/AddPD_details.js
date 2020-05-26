import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import {Field, reduxForm} from 'redux-form';

import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";
import {compose} from "redux";

import QusTemplate_dropDown from "../../../components/quesTemplate_dropdown";
import QuestionInput from "../../../components/QuestionInput";
import QuesTem from "../../../components/QuesTem";

import {PhysicalDataStrings} from "../../../constants/strings";

import {addPhysicalData} from  '../../../actions/physicalData.action';

import {ErrorUtils} from "../../../utils/auth.utils";

import Loader from "../../../components/Loader";
import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

//add physical data details after choose user and template
class AddPDDetails extends Component<{}>{

  componentWillMount () {
    this.props.initialize({ templateName: this.props.template, username: this.props.username});
  } 

  addPhysicalData = async(values) =>{
      try {
        //display action to add physical data
        //values of input data are passed to function
        const response =  await this.props.dispatch(addPhysicalData(values));
        if(response.success){
          Alert.alert(
            PhysicalDataStrings.Success,
            PhysicalDataStrings.AddPhysicalDataSuccess,
            [
              //jump back to previous page 
              {text: PhysicalDataStrings.OK, onPress: () => Actions.pop()},
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

    onSubmit = (values) =>{
      this.addPhysicalData(values);
    }

    QuesTem = (field) => {
      const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
      return (
        <View>
            <QuesTem
              onChangeText={onChange}
              label={label}
              {...restInput}
            />
            {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
        </View>
      );
    }; 
  


    renderTextInput = (field) =>{
      const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input:{onChange, ...restInput}} = field;
      return(
        <View>
          <QuestionInput 
              onChangeText={onChange}
              maxLength={maxLength}
              placeholder={placeholder}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              label={label}
              {...restInput}/>
          {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
        </View>
      );
    }

    render(){
      const {handleSubmit} = this.props;
      //get data from reducer
      const {DisplayOneTemplate: {onetemplate}} = this.props;

      const view = onetemplate ? onetemplate: [{'TemplateDetails':[{}]}];

      const view2 = onetemplate ? onetemplate: [];

      

      console.log("dddddd");
      console.log(view);

      console.log("aaaaaa");
      console.log(view2);

      
        
 
        return(
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
              {console.log(this.props.template)}

                <Field name="templateName" component={this.QuesTem}/>
                <Field name="username" component={this.QuesTem}/>

                {/* decide whether any physical data field is empty */}
                {/* there are default 6 fields for Physical Data templates, but not all of them are required */}
                {/* if it's empty then this field won't show  */}
                {
                    view[0].TemplateDetails[0].field1 == null ?
                        null
                        : 
                        <View>
                            <Text>{view[0].TemplateDetails[0].field1}:</Text>
                            <Field name="data1" placeholder="data1" component={this.renderTextInput} />
                        </View>
                }

                {
                    view[0].TemplateDetails[0].field2 == null ?
                        null
                        : 
                        <View>
                            <Text>{view[0].TemplateDetails[0].field2}:</Text>
                            <Field name="data2" placeholder="data2" component={this.renderTextInput} />
                        </View>
                }

                {
                    view[0].TemplateDetails[0].field3 == null ?
                        null
                        : 
                        <View>
                            <Text>{view[0].TemplateDetails[0].field3}:</Text>
                            <Field name="data3" placeholder="data3" component={this.renderTextInput} />
                        </View>
                }


                {
                    view[0].TemplateDetails[0].field4 == null ?
                        null
                        : 
                        <View>
                            <Text>{view[0].TemplateDetails[0].field4}:</Text>
                            <Field name="data4" placeholder="data4" component={this.renderTextInput} />
                        </View>
                }


                {
                    view[0].TemplateDetails[0].field5 == null ?
                        null
                        : 
                        <View>
                            <Text>{view[0].TemplateDetails[0].field5}:</Text>
                            <Field name="data5" placeholder="data5" component={this.renderTextInput} />
                        </View>
                }

                {
                    view[0].TemplateDetails[0].field6 == null ?
                        null
                        : 
                        <View>
                            <Text>{view[0].TemplateDetails[0].field6}:</Text>
                            <Field name="data6" placeholder="data6" component={this.renderTextInput} />
                        </View>
                }
              

              <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                <Text style={styles.buttonText}>{PhysicalDataStrings.Submit}</Text>
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
    // alignItems:'center',
    // justifyContent:'center'
  },

  button:{
    backgroundColor:'#4682B4',
    borderRadius:25,
    width:250,
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
    DisplayOneTemplate: state.physicalDataReducer.DisplayOneTemplate
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "physicalData"
  })
)(AddPDDetails);

