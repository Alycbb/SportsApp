import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import QusTemplate_dropDown from "../../../components/quesTemplate_dropdown";
import AssignTeam_dropDown from "../../../components/AssignTeam_dropdown";


import {QuestionString} from "../../../constants/strings";
import {UserControlStrings} from "../../../constants/strings";


import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';

import getTem from './Actions_Ques';

//Add Questions
//page to choose Pre-training/Post-training and team to add question
class addQuesTem extends Component<{}>{

    state = {
        selectedValue: ''
    }

    renderQueDropdownList = (field) => {
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


    onSubmit = (values) =>{
      console.log("Dsdsd");
      console.log(values);
      Actions.addQuesType(values);
    }

    render(){

      const {handleSubmit} = this.props;
      //jump to next page to choose question type to add question
      //pass value of questionnaire
      const go = () => Actions.addQuesType({tem: this.state.selectedValue});

        
      return(
          <View style={styles.container}>
              <Text style={styles.text}>{QuestionString.PlzChoose}</Text>
            <Field name="quesTemplate" component={this.renderQueDropdownList} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
              <Text style={styles.buttonText}>{QuestionString.Next}</Text>
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
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "questionText"
  })
)(addQuesTem);

// export default connect(mapStateToProps, mapDispatchToProps)(addQuesTem);

