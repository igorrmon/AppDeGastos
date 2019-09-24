import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import firebase from './firebaseConnection';

export default class Login extends Component {

  static navigationOptions = {
    title: 'Login',
    headerStyle:{
      backgroundColor: '#51cbf9'
    },
  };

  constructor(props){
    super(props);
    this.sate = {
      email:'',
      senha: ''
    };

    this.entrar = this.entrar.bind(this);
    firebase.auth().signOut();
  }

  entrar(){

      if(this.state.email != '' && this.state.senha != ''){

        firebase.auth().onAuthStateChanged((user)=>{
          if(user){
              this.props.navigation.navigate('Interna');
          }
        })

      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
      .catch((error)=>{
          alert(error.code);
      })  

      }

  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.txtInput}>Email</Text>
          <TextInput style={styles.input} onChangeText={(email) => this.setState({email})}/>

          <Text style={styles.txtInput}>Senha</Text>
          <TextInput style={styles.input} onChangeText={(senha) => this.setState({senha})}/>  

          <TouchableOpacity style={styles.btnEntrar} onPress={this.entrar}>
            <Text style={styles.txtBtn}>Entrar</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  txtInput:{
    fontSize: 22,
    color: '#292929'
  },
  input:{
    backgroundColor: '#59cbf9',
    padding: 5,
    height: 40,
    marginBottom: 10,
    fontSize: 18
  },
  btnEntrar:{
    backgroundColor:'#51cbf9',
    height:40,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtBtn:{
    fontSize: 25,
    color:'#FFF'
  }
});
