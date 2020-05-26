//handle input text from pages
import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet} from "react-native";
import { QuestionString } from "../constants/strings";

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
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    label: ""
};

const styles = StyleSheet.create({
  inputBox: {
    width:300,
    height: 200,
    // backgroundColor:'rgba(255, 255,255,0.2)',
    fontSize:16,
    color:'black',
    textAlignVertical: 'top'
  },

  inputContainer: {
    width:300,
    height: 200,
    borderWidth : 1,
  },

});

//component for add question answer pages
//inncluding (Athlete part)Question_CB.js/Question_Text.js
class QuestionTextComment extends Component<{}> {
    // default value as blank
    state = {
        value: ""
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
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
        return (
            <View style={styles.inputContainer}>
                <Text style={{fontSize: 20}}>{QuestionString.AddComment}</Text>
                <TextInput
                    multiline
                    style={styles.inputBox}
                    numberOfLines = {10}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder= "write down your answer"
                    selectionColor="#999999"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    returnKeyType="next"
                    value={this.state.value}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={this.onChangeText} />
            </View>
        );
    }
}

QuestionTextComment.defaultProps = defaultProps;

QuestionTextComment.propTypes = propTypes;

export default QuestionTextComment;