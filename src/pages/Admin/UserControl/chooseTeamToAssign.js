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

import {ErrorUtils} from "../../../utils/auth.utils";

import {AssignAthleteToTeam} from "../../../actions/team.action";
import {AssignCoachToTeam} from "../../../actions/team.action";


import AssignTeam_dropDown from "../../../components/AssignTeam_dropdown";
import QuesTem from "../../../components/QuesTem";

import {showUserList} from "../../../actions/auth.actions";


import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

//choose team to assign to user
class chooseTeamToAssign extends Component<{}>{

    componentWillMount () {
        this.props.initialize({ userID: this.props.userID});
      } 


    AssignAthleteToTeam = async (values) =>{
        try {
            const response =  await this.props.dispatch(AssignAthleteToTeam(values));
            this.props.dispatch(showUserList(this.props.usertype));

          if(response.success){
            Alert.alert(
                'Success!',
                'Assign success',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
          }else{
            throw response;
          }
          Actions.pop();
        } catch (error) {
          const newError = new ErrorUtils(error, "Error");
          newError.showAlert();
        }
    }

    AssignCoachToTeam = async (values) =>{
      try {
          const response =  await this.props.dispatch(AssignCoachToTeam(values));
          this.props.dispatch(showUserList(this.props.usertype));

        if(response.success){
          Alert.alert(
              'Success!',
              'Assign success',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
        }else{
          throw response;
        }
        Actions.pop();
      } catch (error) {
        const newError = new ErrorUtils(error, "Error");
        newError.showAlert();
      }
  }


    func = (values) =>{
      if(this.props.usertype === 'Athlete'){
        this.AssignAthleteToTeam(values);
      }else if(this.props.usertype === 'Coach'){
        this.AssignCoachToTeam(values);
      }
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
      
        return(
            <View style={styles.container}>
                <Field name="userID" component={this.QuesTem}/>
                <Field name="teamName" placeholder="Template" component={this.renderDropdownList}/>
                <TouchableOpacity style={styles.button} onPress={handleSubmit(this.func)}>
                    <Text style={styles.buttonText}>Submit</Text>
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
    form: "AssignAthleteToTeam"
  })
)(chooseTeamToAssign);