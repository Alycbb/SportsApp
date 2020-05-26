//handle input text from pages
import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';

import {QuestionString} from "../constants/strings";


import {connect} from "react-redux";
import {compose} from "redux";


const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string
};

const defaultProps = {
    mapElement: (n) => {},
    onSubmitEditing: () => {},
    onChangeText: () => {},
    value: "",
    label: "Exercise"
};

const styles = StyleSheet.create({
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 5,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 5
  }
});

//component of the questionnare dropdown
//every js file that use questionnare dropdown (such as pre/post-training)include this file
class QusTemplate_dropDown extends Component<{}> {
    state = {
        value: QuestionString.Template1
    }


    onChangeText = (value) => {
        this.setState({
            value
        }, () =>{
            this.props.onChangeText(value);
        })
    }

    render() {
        const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing} = this.props;
        const {getQuestionnare: {questionnaires}} = this.props;
        console.log(this.props);
        const view = questionnaires ? questionnaires: [{}];
        console.log("new")
        console.log(view);


        const aaa = view.map((val)=>{
            return {value: val.questionnaireName}
        })
        console.log(aaa);


        return (
            <View>
                <Dropdown  containerStyle = {{width:300}}
                    label = {QuestionString.Questionnaire}
                    data = {aaa}
                    onChangeText={this.onChangeText}/> 
            </View>
        );
    }
}

mapStateToProps = (state) => ({
    getQuestionnare: state.questionReducer.getQuestionnare,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

QusTemplate_dropDown.defaultProps = defaultProps;

QusTemplate_dropDown.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(QusTemplate_dropDown);

