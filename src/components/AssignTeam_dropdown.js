//handle input text from pages
import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';

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

//component of the team dropdown
//every js file that use team dropdown include this file
class AssignTeam_dropDown extends Component<{}> {
    state = {
        value: ""
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

        const {displayAllTeam: {teamList}} = this.props;
        console.log(this.props);
        const view = teamList ? teamList: [{}];
        console.log(view);

        const allTeam_before = view.map((val) =>{
            return val.TeamName;
        });

        const allTeam = allTeam_before.map((val) =>{
            return {"value": val}
        });



        return (
            <View>
                <Dropdown  containerStyle = {{width:300}}
                    label = "Choose Team"
                    data = {allTeam}
                    onChangeText={this.onChangeText}/> 
            </View>
        );
    }
}



AssignTeam_dropDown.defaultProps = defaultProps;

AssignTeam_dropDown.propTypes = propTypes;


mapStateToProps = (state) => ({
    displayAllTeam: state.teamReducer.displayAllTeam,
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignTeam_dropDown);
