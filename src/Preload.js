import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, TouchableHighlight} from 'react-native';
import firebase from './firebaseConnection';
import {NavigationActions, StackActions} from 'react-navigation';

export default class Preload extends Component {
  
  static navigationOptions = {
    header:null
  }

  constructor(props){
    super(props);
    this.state = {};

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.dispatch(StackActions.reset({
          index:0,
          actions:[
            NavigationActions.navigate({routeName:'Interna'})
          ]
        }));


      }else{
        this.props.navigation.dispatch(StackActions.reset({
          index:0,
          actions:[
            NavigationActions.navigate({routeName:'Home'})
          ]
        }));
      }
    })

  }

  render() {
    return (
      <ImageBackground source={ require('../assets/images/bg/bg.png')} style={styles.bg} >
          <View style={styles.container}>
              <Text style={styles.loading}>Carregando. . .</Text>
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: null
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  loading:{
    fontSize:20,
    color: '#FFF'
  }
});
