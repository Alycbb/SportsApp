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

import {SortQues1Text} from '../../../actions/question.action';

import {ErrorUtils} from "../../../utils/auth.utils";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { PhysicalDataStrings, QuestionString } from '../../../constants/strings';

//page to display user's question answers
class DisplayAnswers extends Component<{}>{

  state={
    selectedDate: ''
  }


    render(){
        const {QuestionAnswers: {userAnswer}} = this.props;

        const view = userAnswer ? userAnswer: "";
        console.log(view);

        const allDate_before = view.map((val) =>{
          return (val.date + '  ' + val.Question);
        });

        const allDate = allDate_before.map((val) =>{
            return {"value": val}
        });


        const allAnswers = view.map((val) =>{
          console.log(val.date + '  ' + val.Question);
          console.log(this.state.selectedDate);
          if((val.date + '  ' + val.Question) === this.state.selectedDate){
            if(val.type === 'Radio Buttons'){
              return(
                <View style={{flexDirection: 'row', borderTopColor: 'black', borderTopWidth: 0.5, margin: 5}}>
                    <View style={{margin:5, flexDirection: 'row'}}>
                      <View style={styles.Quesion}>
                        <Text style={{fontWeight:'bold', fontSize: 15}}>{val.date}</Text>
                        <Text>{QuestionString.Question}</Text>
                        <Text>{QuestionString.Answer}</Text>
                        <Text>{QuestionString.Comment}</Text>
                      </View>
                      <View>
                        <Text style={{fontWeight:'bold', fontSize: 15}}></Text>
                        <Text> {val.Question}</Text>
                        <Text> {JSON.parse(val.Answer)}</Text>
                        <Text> {val.Comment}</Text>
                      </View>
                      
                    </View>
                   
                </View>
              )
              }else if(val.type === 'Check Boxes'){
                const afterParse = JSON.parse(val.Answer);
                return(
                  <View style={{flexDirection: 'row', borderTopColor: 'black', borderTopWidth: 0.5, margin:5}}>
                      <View style={{margin:5}}>
                        <Text style={{fontWeight:'bold', fontSize: 15}}>{val.date}</Text>
                        <Text >{QuestionString.Question}   {val.Question}</Text>
                        <View style={{flexDirection:'row'}}>
                          <Text>{QuestionString.Answer}</Text>
                          <View style={{marginLeft:20}} >
                            {afterParse.map((each) =>
                                  <Text>{each}</Text>
                            )}
                          </View>
                        </View>
                        
                        <Text>{QuestionString.Comment}  {val.Comment}</Text>
                      </View>
                      
                  </View>
                );
              }else if(val.type === 'Text'){
                return(
                  <View style={{flexDirection: 'row', borderTopColor: 'black', borderTopWidth: 0.5, margin: 5}}>
                      <View style={{margin:5, flexDirection:'row'}}>
                        <View style={styles.Quesion}>
                          <Text style={{fontWeight:'bold', fontSize: 15}}>{val.date}</Text>
                          <Text>{QuestionString.Question}</Text>
                          <Text>{QuestionString.Comment}</Text>
                        </View>
                        <View>
                          <Text style={{fontWeight:'bold', fontSize: 15}}></Text>
                          <Text> {val.Question}</Text>
                          <Text> {val.Comment}</Text>
                        </View>
                        
                      </View>
                  </View>
                );
              }
          }
          
          });

        return(
            <View style={styles.container}>
              <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'column', marginBottom: 20}}>
                    <View style={{marginBottom:30}}>
                      {/* display the date of all question answers*/}
                      <Dropdown containerStyle = {{width:200}}
                          label = "Date"
                          data = {allDate}
                          onChangeText = {(value) =>{

                            this.setState({
                              selectedDate: value
                          });
                      }}/>
                    </View>

                    <Text>{userAnswer[0].userName}</Text>
                    <View style={{}}>
                          {allAnswers}
                    </View>

                    {this.state.selectedDate === '' && view[0].type === 'Text'?
                      <View>
                        <View style={{flexDirection: 'row', borderTopColor: 'black', borderTopWidth: 0.5, margin: 5}}>
                        <View style={{margin:5, flexDirection:'row'}}>
                          <View style={styles.Quesion}>
                            <Text style={{fontWeight:'bold', fontSize: 15}}>{view[0].date}</Text>
                            <Text>{QuestionString.Question}</Text>
                            <Text>{QuestionString.Comment}</Text>
                          </View>
                          <View>
                            <Text style={{fontWeight:'bold', fontSize: 15}}></Text>
                            <Text> {view[0].Question}</Text>
                            <Text> {view[0].Comment}</Text>
                          </View>
                          
                        </View>
                      </View>
                      </View>
                    :
                    null
                    }

                    {this.state.selectedDate === '' && view[0].type === 'Radio Buttons'?
                      <View style={{flexDirection: 'row', borderTopColor: 'black', borderTopWidth: 0.5, margin: 5}}>
                      <View style={{margin:5, flexDirection: 'row'}}>
                        <View style={styles.Quesion}>
                          <Text style={{fontWeight:'bold', fontSize: 15}}>{view[0].date}</Text>
                          <Text>{QuestionString.Question}</Text>
                          <Text>{QuestionString.Answer}</Text>
                          <Text>{QuestionString.Comment}</Text>
                        </View>
                        <View>
                          <Text style={{fontWeight:'bold', fontSize: 15}}></Text>
                          <Text> {view[0].Question}</Text>
                          <Text> {JSON.parse(view[0].Answer)}</Text>
                          <Text> {view[0].Comment}</Text>
                        </View>
                        
                      </View>
                  </View>
                    :
                    null
                    }

                    {this.state.selectedDate === '' && view[0].type === 'Check Boxes'?
                      <View style={{flexDirection: 'row', borderTopColor: 'black', borderTopWidth: 0.5, margin:5}}>
                      <View style={{margin:5}}>
                        <Text style={{fontWeight:'bold', fontSize: 15}}>{view[0].date}</Text>
                        <Text >{QuestionString.Question}   {view[0].Question}</Text>
                        <View style={{flexDirection:'row'}}>
                          <Text>{QuestionString.Answer}</Text>
                          <View style={{marginLeft:20}} >
                            {JSON.parse(view[0].Answer).map((each) =>
                                  <Text>{each}</Text>
                            )}
                          </View>
                        </View>
                        
                        <Text>{QuestionString.Comment}  {view[0].Comment}</Text>
                      </View>
                  </View>
                    :
                    null
                    }
                    
                    
                    
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
    Quesion:{
      fontSize: 18,
    }


});


mapStateToProps = (state) => ({
    QuestionAnswers: state.questionReducer.QuestionAnswers
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(DisplayAnswers);

