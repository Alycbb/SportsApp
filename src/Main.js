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


class Main extends Component<{}>{



  // state = {
  //   isLoggedIn: this.props.authData ? this.props.authData.isLoggedIn : false
  // }


  // static getDerivedStateFromProps(nextProps, nextState){
  //   console.log(nextProps,nextState);
  //   if(nextProps.authData && nextProps.authData.isLoggedIn && nextProps.authData.isLoggedIn !== nextState.isLoggedIn){
  //     return{
  //       isLoggedIn: nextProps.authData.isLoggedIn
  //     }
  //   }
  //   return null;
  // }

  // shouldComponentUpdate(nextProps, nextState){
  //   const {authData: {isLoggedIn}} = nextProps;
  //   if(isLoggedIn !== nextState.isLoggedIn){
  //     return true;
  //   }
  //   return false;
  // }


  //navigate to different pages
  //after login and signup, isLoggedIn = true, the page jump to "profile.js".
  render(){
    const {authData:{isLoggedIn}} = this.props;
    const {userData:{isAdmin}} = this.props;
      return(
        <View style = {styles.container}>
          <StatusBar
            backgroundColor="#1c313a"
            barStyle = "light-content"
            />
          <Routes isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
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
  authData: state.authReducer.authData,
  userData: state.authReducer.userData,
  showQue: state.authReducer.showQue,
  modifyQues: state.authReducer.modifyQues
})
export default connect(mapStateToProps,null)(Main)

