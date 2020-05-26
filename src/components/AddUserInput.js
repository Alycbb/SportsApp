//handle input text from pages
import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet} from "react-native";

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
    width:290,
    backgroundColor:'rgba(255, 255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal:10,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 8
  }
});

//component for Admin-UserControl-AddUser.js
class AddUserInput extends Component<{}> {
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
            <View>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder={placeholder}
                    placeholderTextColor="rgb(128,128,128)"
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

AddUserInput.defaultProps = defaultProps;

AddUserInput.propTypes = propTypes;

export default AddUserInput;