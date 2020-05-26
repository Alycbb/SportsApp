//handle input text from pages
import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';


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
    height:1,
    backgroundColor: 'black',
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 5,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 5
  }
});

//actually function as a invisibile field 
//so we can set default value to this field
class QuesTem extends Component<{}> {

    onChangeText = () => {
        this.props.onChangeText(this.props.tem);
    }

    render() {
        const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing} = this.props;


        return (
            <View style={{height: 1}}>
                <Text></Text>
            </View>
        );
    }
}

QuesTem.defaultProps = defaultProps;

QuesTem.propTypes = propTypes;

export default QuesTem;