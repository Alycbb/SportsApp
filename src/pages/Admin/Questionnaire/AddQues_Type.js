import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {connect} from "react-redux";

import Routes from '../../../components/Routes';
import {Actions} from 'react-native-router-flux';
import { withNavigationFocus } from 'react-navigation';
import { QuestionString } from '../../../constants/strings';

//Add Questions
//page to choose question type(Text/CheckBox/RadioButton)
class addQuesType extends Component<{}>{

    state = {
        selectedValue: 'Text',
        selectedOptionNumber: 5
    }


    goNext = (value, optionNumber) => {

        if(value === QuestionString.Text){
            //jump to next page to input Text question
            Actions.addQuestionText({tem: this.props.quesTemplate, QuesType: this.state.selectedValue});

        }else if(value === QuestionString.RadioButton){
            //jump to next page to input RadioButton question
            Actions.addQuestionRB({tem: this.props.quesTemplate, QuesType: this.state.selectedValue, ON: optionNumber});

        }else if(value === QuestionString.CheckBox){
            //jump to next page to input CheckBox question
            Actions.addQuestionCB({tem: this.props.quesTemplate, QuesType: this.state.selectedValue, ON: optionNumber});
        }
    }

   
    render(){

        const data = [{
            value: QuestionString.Text,
          }, {
            value: QuestionString.RadioButton,
          }, {
            value: QuestionString.CheckBox,
          }];

        const optionNumber = [{
            value: 1,
        },{
            value: 2,
        },{
            value: 3,
        },{
            value: 4,
        },{
            value: 5,
        },{
            value: 6,
        },{
            value: 7,
        },{
            value: 8,
        },]
        return(
            <View style={styles.container}>
                <Text  style={styles.text}>{QuestionString.PlzChoose}</Text>
                <Dropdown  containerStyle = {{width:300}}
                label = {QuestionString.QuestionType}
                data = {data}
                onChangeText={(value) => {
                        this.setState({
                        selectedValue: value 
                    });
                    
                }}/>
                {console.log(this.state.selectedValue)}
                {/* if selected is "Text", optionNumber dropdown will not show up */}
                {this.state.selectedValue === 'Text' ? null
                :
                <View>
                    <Dropdown  containerStyle = {{width:300}}
                    label = {QuestionString.OptionNumber}
                    data = {optionNumber}
                    onChangeText={(value) => {
                            this.setState({
                                selectedOptionNumber: value 
                        });
                    }}/>
                </View>
                }

                <TouchableOpacity style={styles.button} onPress={() => this.goNext(this.state.selectedValue, this.state.selectedOptionNumber)}>
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


export default connect(mapStateToProps, mapDispatchToProps)(addQuesType);