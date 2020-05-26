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


import {displayQuestions} from '../../../actions/question.action';
import {SortQuestionByType} from '../../../actions/question.action';
import {SortQuestionOldToNew} from '../../../actions/question.action';
import {QuestionDelete} from '../../../actions/question.action';


import {QuestionString} from "../../../constants/strings";
import {AlertStrings} from "../../../constants/strings";

import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

//View Questions
//page to display all the questions depends on the selection of Pre/Post-Training
class TemShow extends Component<{}>{

  sortbyType = async () =>{
    try {
        const response =  await this.props.dispatch(SortQuestionByType(this.props.tem));

      if(response.success){
        console.log("Sort By Type Success")
      }else{
        throw response;
      }
    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

  sortbyTimeNewToOld = async () =>{
    try {
      const response =  await this.props.dispatch(displayQuestions(this.props.tem));
        if(response.success){
          console.log("Sort New To Old Success")
        }else{
          throw response;
        }
    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

  sortbyTimeOldToNew = async () =>{
    try {
      const response =  await this.props.dispatch(SortQuestionOldToNew(this.props.tem));
      if(response.success){
        console.log("Sort Old To New Success")
      }else{
        throw response;
      }
    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }

  sort = (value) =>{
    if(value === QuestionString.SortByType){
      this.sortbyType();
    }else if(value === QuestionString.NewToOld){
      this.sortbyTimeNewToOld();
    }else if(value === QuestionString.OldToNew){
      this.sortbyTimeOldToNew();
    }
  }
 
  Qdelete = async (Question) =>{
    try {
        const response =  await this.props.dispatch(QuestionDelete(Question));
        this.props.dispatch(displayQuestions(this.props.tem));

      if(response.success){
          console.log("delete it ")
      }else{
        throw response;
      }

    } catch (error) {
      const newError = new ErrorUtils(error, "Error");
      newError.showAlert();
    }
  }



  modifyFunc = (value, Question, QuesType, number, o1, o2, o3, o4, o5, o6, o7, o8) =>{
    if(value === QuestionString.Delete){
      Alert.alert(
        AlertStrings.DoubleCheck,
        AlertStrings.reallyDelete,
        [
          {  
            text: AlertStrings.Cancel,  
            onPress: () => console.log('Cancel Pressed'),  
            style: 'cancel',  
          }, 
          {text: AlertStrings.Delete, onPress: () => this.Qdelete(Question)},
        ],
        {cancelable: true},
      );
    }else if(value === QuestionString.Update){
      if(QuesType === QuestionString.Text){
        Actions.TemUpdateText({oldQuestion: Question, QuesType: QuesType, tem: this.props.tem, number: number, o1: o1, o2: o2, o3: o3, o4: o4, o5: o5, o6: o6, o7: o7, o8: o8});
      }else{
        Actions.TemShowUpdate({oldQuestion: Question, QuesType: QuesType, tem: this.props.tem, number: number, o1: o1, o2: o2, o3: o3, o4: o4, o5: o5, o6: o6, o7: o7, o8: o8});
      }
    }
  }


  assignQueToTeam = (template) =>{
    Actions.assignQuesToTeam({template: template});
  }

  assignQueToUser = (template) =>{
    Actions.chooseTeam({template: template});
  }

    render(){

      // "modify" drop down: Update/Delete
      const modify = [{
        value: QuestionString.Update
      },{
        value: QuestionString.Delete
      }];

        const {getQuestions: {questions}} = this.props;
        const view = questions ? questions: [{}];

        const template = view[0].quesTemplate;

        // get all the question after choose questionnare(pre/post-training)
        const allQues = view.map((val) =>{
          if(val.type === QuestionString.RadioButton){
            return(
              <View>
                <View style={{flexDirection: 'row', borderTopWidth: 0.6, borderColor: 'black'}}>
                    <View style={{width:250, borderStyle: 'solid'}}>
                        <Text style={{ fontWeight:'bold'}}>{QuestionString.Type}{val.type}</Text>
                        <Text>{QuestionString.Question}{val.Question}</Text>
                        <Text>{QuestionString.option1} {val.details.option1}</Text>
                        <Text>{QuestionString.option2}{val.details.option2}</Text>
                        {val.details.Number === '3' ?
                        <View>
                          <Text>{QuestionString.option3}{val.details.option3}</Text>
                        </View>
                        :null}
                        {val.details.Number === '4' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                        </View>
                        :null}
                        {val.details.Number === '5' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                        </View>
                        :null}
                        
                        {val.details.Number === '6' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                          <Text>{QuestionString.option6} {val.details.option6}</Text>
                        </View>
                        :null}
                        {val.details.Number === '7' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                          <Text>{QuestionString.option6} {val.details.option6}</Text>
                          <Text>{QuestionString.option7} {val.details.option7}</Text>
                        </View>
                        :null}
                        {val.details.Number === '8' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                          <Text>{QuestionString.option6} {val.details.option6}</Text>
                          <Text>{QuestionString.option7} {val.details.option7}</Text>
                          <Text>{QuestionString.option8} {val.details.option8}</Text>
                        </View>
                        :null}
                        
                    </View>
                    
                    <View style={{width: 100}}>
                          <TouchableOpacity>
                            <Dropdown containerStyle = {{width:70}}
                                label = {QuestionString.Modify}
                                data = {modify}
                                onChangeText = {(value) =>{
                                  this.setState({
                                    modifyStatus: value 
                                });
                                this.modifyFunc(value, val.Question, val.type, val.details.Number, val.details.option1, val.details.option2, 
                                  val.details.option3, val.details.option4, val.details.option5, val.details.option6, val.details.option7, val.details.option8);
                                }}/>
                          </TouchableOpacity>
                      </View>
                </View>
              </View>
            )
            }else if(val.type === QuestionString.CheckBox){
              return(
                <View style={{flexDirection: 'row',borderTopWidth: 0.6, borderColor: 'black'}}>
                    <View style={{width:250}}>
                        <Text style={{ fontWeight:'bold'}}>{QuestionString.Type}{val.type}</Text>
                        <Text style={{borderTopColor:'black'}}>{QuestionString.Question}{val.Question}</Text>
                        <Text>{QuestionString.option1} {val.details.option1}</Text>
                        <Text>{QuestionString.option2}{val.details.option2}</Text>
                        {val.details.Number === '3' ?
                        <View>
                          <Text>{QuestionString.option3}{val.details.option3}</Text>
                        </View>
                        :null}
                        {val.details.Number === '4' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                        </View>
                        :null}
                        {val.details.Number === '5' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                        </View>
                        :null}
                        
                        {val.details.Number === '6' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                          <Text>{QuestionString.option6} {val.details.option6}</Text>
                        </View>
                        :null}
                        {val.details.Number === '7' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                          <Text>{QuestionString.option6} {val.details.option6}</Text>
                          <Text>{QuestionString.option7} {val.details.option7}</Text>
                        </View>
                        :null}
                        {val.details.Number === '8' ?
                        <View>
                          <Text>{QuestionString.option3} {val.details.option3}</Text>
                          <Text>{QuestionString.option4} {val.details.option4}</Text>
                          <Text>{QuestionString.option5} {val.details.option5}</Text>
                          <Text>{QuestionString.option6} {val.details.option6}</Text>
                          <Text>{QuestionString.option7} {val.details.option7}</Text>
                          <Text>{QuestionString.option8} {val.details.option8}</Text>
                        </View>
                        :null}
                    </View>

                    <View style={{width: 100}}>
                          <TouchableOpacity>
                              <Dropdown containerStyle = {{width:70}}
                                  label = {QuestionString.Modify}
                                  data = {modify}
                                  onChangeText = {(value) =>{
                                    this.setState({
                                      modifyStatus: value 
                                  });
                                  this.modifyFunc(value, val.Question, val.type, val.details.Number, val.details.option1, val.details.option2, 
                                    val.details.option3, val.details.option4, val.details.option5, val.details.option6, val.details.option7, val.details.option8);
                                  }}/>
                          </TouchableOpacity>
                      </View>                 
                </View>
              );
            }else if(val.type === QuestionString.Text){
              return(
                <View style={{flexDirection: 'row',borderTopWidth: 0.6, borderColor: 'black'}}>
                    <View style={{width:250}}>
                      <Text style={{ fontWeight:'bold'}}>{QuestionString.Type} {val.type}</Text>
                      <Text>{QuestionString.Question}{val.Question}</Text>
                    </View>

                    <View style={{width: 100}}>
                      <TouchableOpacity>
                        <Dropdown containerStyle = {{width:70}}
                                    label = {QuestionString.Modify}
                                    data = {modify}
                                    onChangeText = {(value) =>{
                                      this.setState({
                                        modifyStatus: value 
                                    });
                                    this.modifyFunc(value, val.Question, val.type);
                                    }}/>
                      </TouchableOpacity>
                    </View>

                </View>
              );
            }
          });
          // "sort" drop down: SortByType/NewToOldOldToNew
          const data = [
            {
              value: QuestionString.SortByType,
            },
            {
              value: QuestionString.NewToOld
            },
            {
              value: QuestionString.OldToNew
            }
          ];
        

        return(
            <View style={styles.container}>
              <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View >
                    <View style={{width: 300}}>
                      {/* sort the data list */}
                      <Dropdown containerStyle = {{width:110}}
                          label = {QuestionString.Sort}
                          data = {data}
                          onChangeText = {(value) =>{
                            this.setState({
                              selectedValue: value 
                          });
                          this.sort(value);
                          }}/>
                  </View>
                </View>

                <View>
                    {allQues}
                </View>

                <View>
                      {/* assign the whole questionnaire(including all the questions inside) to specific team */}
                      <TouchableOpacity style={styles.button} onPress={() => this.assignQueToTeam(template)}>
                          <Text style={styles.buttonText}>{QuestionString.AssignThisQuestionnaireToTeam}</Text>
                      </TouchableOpacity>    

                      <TouchableOpacity style={styles.button} onPress={() => this.assignQueToUser(template)}>
                          <Text style={styles.buttonText}>{QuestionString.AssignThisQuestionnaireToUser}</Text>
                      </TouchableOpacity> 
                    </View>
                
              </ScrollView>

          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#C0C0C0',
      flex: 1,

    },

    text:{
        fontSize:12,
        fontWeight:'bold',
        color:'#000000',
        textAlign: 'left'
        
    },

    button:{
      backgroundColor:'#A9A9A9',
      borderRadius:5,
      width:270,
      paddingVertical:10,
      paddingHorizontal:5,
      marginTop: 10
    },
  
    buttonText:{
      fontSize:16,
      fontWeight:'500',
      color:'#000000',
      textAlign:'center'
    }


});


mapStateToProps = (state) => ({
  getQuestions: state.questionReducer.getQuestions


})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(TemShow);

