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

import Grade_dropDown from "../../../components/grade_dropdown";
import InputText from "../../../components/InputText";
import QuesTem from "../../../components/QuesTem";

import {AlertStrings} from "../../../constants/strings";
import {UserControlStrings} from "../../../constants/strings";

import {UpdatePhysicalDataTemplate} from "../../../actions/physicalData.action";
import {viewPhysicalDataTemplate} from  '../../../actions/physicalData.action';

import {Actions} from 'react-native-router-flux';
import {ErrorUtils} from "../../../utils/auth.utils";
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  
  textStyle:{
      color:"#fff",
      fontSize:18
  },
  button:{
    backgroundColor:'#4682B4',
    borderRadius:25,
    width:300,
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
class InputPDTemNewInfo extends Component<{}>{
  //initialize some field as default value
    componentWillMount () {
        this.props.initialize({ oldTemplateName: this.props.oldTem, newTemplateName: this.props.oldTem, newField1: this.props.o1,
             newField2: this.props.o2, newField3: this.props.o3, newField4: this.props.o4, newField5: this.props.o5, newField6: this.props.o6 });
      } 

      UpdatePhysicalDataTemplate = async(values) =>{
        try {
          //dispatch action to update physical data template
          const response =  await this.props.dispatch(UpdatePhysicalDataTemplate(values));

          if(response.success){
            Alert.alert(
                AlertStrings.Success,
                AlertStrings.UpdatePDTemplateSuccess,
                [
                  {text: AlertStrings.OK, onPress: () =>{
                    //dispatch action to display physical data template
                    //so we jump back to previous page, the data can be updated immediately
                    this.props.dispatch(viewPhysicalDataTemplate());
                    Actions.pop();
                  }
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

    // viewPhysicalDataTemplate = async() =>{
    //     try {
    //       const response =  await this.props.dispatch(viewPhysicalDataTemplate());

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
  
    onSubmit = (values) =>{
        this.UpdatePhysicalDataTemplate(values);

    }


    renderTextInput = (field) =>{
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input:{onChange, ...restInput}} = field;
        return(
          <View>
            <InputText 
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
      };

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

      

  render(){
    const {handleSubmit} = this.props;
    const {TemplateDisplay: {templates}} = this.props;

    const view = templates ? templates: [{}];

    console.log("let me check");
    console.log(templates);


    return(
        <View style = {styles.container} >
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Field
                    name="oldTemplateName"
                    component={this.QuesTem} />
                <Field
                    name="newTemplateName"
                    placeholder="newTemplateName"
                    component={this.renderTextInput} />
                <Field
                    name="newField1"
                    placeholder="newField1"
                    component={this.renderTextInput} />
                <Field 
                    name="newField2" 
                    placeholder="newField2"
                    component={this.renderTextInput}/>
                <Field 
                    name="newField3" 
                    placeholder="newField3"
                    component={this.renderTextInput} />
                <Field 
                    name="newField4" 
                    placeholder="newField4"
                    component={this.renderTextInput} />
                <Field 
                    name="newField5" 
                    placeholder="newField5"
                    component={this.renderTextInput} />
                <Field 
                    name="newField6" 
                    placeholder="newField6"
                    component={this.renderTextInput} />


                <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                    <Text style={styles.buttonText}>{UserControlStrings.Submit}</Text>
                </TouchableOpacity>
            </ScrollView>
    </View>
    )
  }
}



mapStateToProps = (state) => ({
    //actions were dispatched above, then use reducer to store data
    //in next page, call the same reducer then we can get the data inside
    TemplateDisplay: state.physicalDataReducer.TemplateDisplay,

})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: "updatePDTem",
    })
  )(InputPDTemNewInfo);
