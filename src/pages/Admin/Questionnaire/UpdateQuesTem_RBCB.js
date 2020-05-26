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

import Loader from "../../../components/Loader";
import Routes from '../../../components/Routes';
import QusTemplate_dropDown from "../../../components/quesTemplate_dropdown";
import QuestionInput from "../../../components/QuestionInput";
import QuesTem from "../../../components/QuesTem";

import {QuestionString} from "../../../constants/strings";

import {QuestionUpdate} from '../../../actions/question.action';
import {displayQuestions} from '../../../actions/question.action';


import {ErrorUtils} from "../../../utils/auth.utils";

import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

// Update Question RadioButton and CheckBox
class TemShowUpdate extends Component<{}>{

  // set default value of Field(TextInput)
  // default value display when this page is loaded
  componentWillMount () {
    this.props.initialize({ 
      OldQuestion: this.props.oldQuestion, 
      Questype: this.props.QuesType, 
      Question: this.props.oldQuestion,
      Number: this.props.number,
      option1: this.props.o1,
      option2: this.props.o2,
      option3: this.props.o3,
      option4: this.props.o4,
      option5: this.props.o5,
      option6: this.props.o6,
      option7: this.props.o7,
      option8: this.props.o8,
    });
  } 

  // dispatch action
  QuestionUpdate = async(values) =>{
      try {
        //dispatch action to update question
        const response =  await this.props.dispatch(QuestionUpdate(values));
        if(response.success){
          Alert.alert(
            QuestionString.Success,
            QuestionString.UpdateSuccess,
            [
              {text: QuestionString.OK, onPress: () => {
                this.props.dispatch(displayQuestions(this.props.tem));
                Actions.pop({tem: this.props.tem})
              }},
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
      this.QuestionUpdate(values, this.props.oldQuestion);
    }

    //Field Component
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

    //Field Component
    renderDropdownList = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
       <View>
          <QusTemplate_dropDown
            onChangeText={onChange}
            label={label}
            {...restInput}
          />
          {(touched && error) && <Text style={styles.errorTest}>{error}</Text>} 
       </View>
    );
  }; 

  //Field Component
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
    const {handleSubmit, QuesUpdate} = this.props;

      return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            {QuesUpdate.isLoading && <Loader />}
            <Field name="OldQuestion" component={this.QuesTem}/>
            <Field name="Questype" component={this.QuesTem}/>
            <Field name="Question" placeholder="Question" component={this.renderTextInput} />
            <Field name="option1" placeholder="Text_choice_1" component={this.renderTextInput} />
            <Field name="option2" placeholder="Text_choice_2" component={this.renderTextInput} />

            {/* the displayed fields change with option number */}
            {this.props.number === '3' ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
            </View>
            :null} 
            {this.props.number === '4' ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
            </View>
            :null}           
            {this.props.number === '5' ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
            </View>
            :null}
            {this.props.number === '6' ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
              <Field name="option6" placeholder="Text_option_6" component={this.renderTextInput} /> 
            </View>
            :null}
            {this.props.number === '7' ?
            <View>
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
              <Field name="option6" placeholder="Text_option_6" component={this.renderTextInput} /> 
              <Field name="option7" placeholder="Text_option_7" component={this.renderTextInput} />
            </View>
            :null}
            {this.props.number === '8' ?
            <View>
              <Field name="option3" placeholder="Text_option_3" component={this.renderTextInput} /> 
              <Field name="option4" placeholder="Text_option_4" component={this.renderTextInput} /> 
              <Field name="option5" placeholder="Text_option_5" component={this.renderTextInput} /> 
              <Field name="option6" placeholder="Text_option_6" component={this.renderTextInput} /> 
              <Field name="option7" placeholder="Text_option_7" component={this.renderTextInput} /> 
              <Field name="option8" placeholder="Text_option_8" component={this.renderTextInput} /> 
            </View>
            :null}
            <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
              <Text style={styles.buttonText}>{QuestionString.Submit}</Text>
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
  QuesUpdate: state.questionReducer.QuesUpdate
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "questionUpdate"
  })
)(TemShowUpdate);

