import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import Routes from './components/Routes';


class Main2 extends Component<{}>{


  render(){
    const {authData:{isAdmin}} = this.props;
      return(
        <View style = {styles.container}>
          <StatusBar
            backgroundColor="#1c313a"
            barStyle = "light-content"
            />
          <Routes isAdmin={isAdmin} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#C0C0C0',
    flex: 1
  }
});

mapStateToProps = state => ({
  authData: state.authReducer.userData
})
export default connect(mapStateToProps,null)(Main2)

