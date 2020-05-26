//handle input text from pages
import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';

import {UserControlStrings} from "../constants/strings";


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

//component of the gender dropdown
//every js file that use gender dropdown include this file
class Gender_dropDown extends Component<{}> {
    state = {
        value: ''
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
        const data = [{
            value: UserControlStrings.Female
          }, {
            value: UserControlStrings.Male
          }];


        return (
            <View>
                <Dropdown  containerStyle = {{width:280}}
                    label = {UserControlStrings.Gender}
                    data = {data}
                    onChangeText={this.onChangeText}/> 
            </View>
        );
    }
}

Gender_dropDown.defaultProps = defaultProps;

Gender_dropDown.propTypes = propTypes;

export default Gender_dropDown;