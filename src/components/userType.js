//handle input text from pages
import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import { LoginSignupString } from "../constants/strings";


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
  },

  container:{
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems:'center',
    // flexWrap:'wrap'
    },
});

//use for signup page when choosing the user type
class UserType extends Component<{}> {
    
    state ={
        value: "" 
    }


    radioClick(option) {
      this.setState({
        radioSelected: option
      });
      this.onChangeText(option)
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

        const UserTypes = [
            {
              option: LoginSignupString.Athlete
            },
            {
              option: LoginSignupString.Coach
            },
            {
              option: LoginSignupString.Admin
            },
          ];

        return(
            <View style = {{flexDirection: 'row'}}>
                {/* {usertype} */}
              <View style = {{flexDirection: 'row', marginRight: 10}}>
                  <View style = {{marginRight: 5}}>
                    <TouchableOpacity key={UserTypes[0].option} onPress={this.radioClick.bind(this, UserTypes[0].option)}>
                      <View style={{
                        height: 16,
                        width: 16,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {/* check the radio button get selected or not */}
                        {
                          UserTypes[0].option == (this.state && this.state.radioSelected || false) ?
                            <View style={{
                              height: 8,
                              width: 8,
                              borderRadius: 6,
                              backgroundColor: '#000',
                            }} />
                            : null
                        }
                      </View>
                    </TouchableOpacity>
                  </View>
              <View>
                <Text key ={UserTypes[0].option} >{UserTypes[0].option}</Text>
              </View>
            </View>

              <View style = {{flexDirection: 'row',  marginRight: 10}}>
              <View style = {{marginRight: 5}}>
                    <TouchableOpacity key={UserTypes[1].option} onPress={this.radioClick.bind(this, UserTypes[1].option)}>
                      <View style={{
                        height: 16,
                        width: 16,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {/* check the radio button get selected or not */}
                        {
                          UserTypes[1].option == (this.state && this.state.radioSelected || false) ?
                            <View style={{
                              height: 8,
                              width: 8,
                              borderRadius: 6,
                              backgroundColor: '#000',
                            }} />
                            : null
                        }
                      </View>
                    </TouchableOpacity>
                  </View>
              <View>
                <Text key ={UserTypes[1].option} >{UserTypes[1].option}</Text>
              </View>
              </View>

              <View style = {{flexDirection: 'row',  marginRight: 10}}>
              <View style = {{marginRight: 5}}>
                    <TouchableOpacity key={UserTypes[2].option} onPress={this.radioClick.bind(this, UserTypes[2].option)}>
                      <View style={{
                        height: 16,
                        width: 16,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {
                          UserTypes[2].option == (this.state && this.state.radioSelected || false) ?
                            <View style={{
                              height: 8,
                              width: 8,
                              borderRadius: 6,
                              backgroundColor: '#000',
                            }} />
                            : null
                        }
                      </View>
                    </TouchableOpacity>
                  </View>
              <View>
                <Text key ={UserTypes[2].option} >{UserTypes[2].option}</Text>
              </View>
              </View>
              
              

            </View>
        )
    }
}

UserType.defaultProps = defaultProps;

UserType.propTypes = propTypes;

export default UserType;