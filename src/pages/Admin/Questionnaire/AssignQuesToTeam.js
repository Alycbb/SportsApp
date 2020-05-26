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


import {Field, reduxForm} from 'redux-form';

import Routes from '../../../components/Routes';

import AssignTeam_dropDown from "../../../components/AssignTeam_dropdown";
import QuesTem from "../../../components/QuesTem";

import { AlertStrings } from '../../../constants/strings';
import { QuestionString } from '../../../constants/strings';

import {showUserList} from "../../../actions/auth.actions";
import {AssignQueTempToTeam} from "../../../actions/team.action";
import {getAllTeam} from "../../../actions/team.action";

import {ErrorUtils} from "../../../utils/auth.utils";

import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';



//View Questions then assign Pre-training/Post-training to team
//page to select team when assigning a questionnare template, then collection "team" will have a "Questionnaire" field
class AssignQueToTeam extends Component<{}>{

    componentWillMount () {
        this.props.initialize({ template: this.props.template});
      } 

    AssignQueTempToTeam = async (values) =>{
      try {
        // dispatch action to assign questionnaire to team
          const response =  await this.props.dispatch(AssignQueTempToTeam(values));
  
        if(response.success){
          Alert.alert(
            AlertStrings.Success,
            AlertStrings.AssignQuestionnaireSuccess,
            [
              //jump back to previous page
              {text: AlertStrings.OK, onPress: () => Actions.pop()},
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
    


    func = (values) =>{
      this.AssignQueTempToTeam(values);
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


    renderDropdownList = (field) => {
    const {meta:{touched, error}, label, input:{onChange, ...restInput}} = field;
    return (
        <View>
            <AssignTeam_dropDown
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
        this.props.dispatch(getAllTeam());
      
        return(
            <View style={styles.container}>
                {/* <Text>{this.props.template}</Text> */}
                <Field name="template" component={this.QuesTem}/>
                <Field name="teamName" placeholder="Template" component={this.renderDropdownList}/>
                <TouchableOpacity style={styles.button} onPress={handleSubmit(this.func)}>
                  <Text style={styles.buttonText}>{QuestionString.Submit}</Text>
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
    padding:5,
    borderRadius:7
    

  },

  text:{
      fontSize:19,
      fontWeight:'500',
      color:'#000000',
      textAlign: 'left',
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
  },


});

mapStateToProps = (state) => ({
    displayAllTeam: state.teamReducer.displayAllTeam,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "AssignQueToTeam"
  })
)(AssignQueToTeam);