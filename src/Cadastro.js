import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import firebase from './firebaseConnection';

export default class Cadastro extends Component {

  static navigationOptions = {
    title: 'Cadastrar',
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

    this.cadastrar = this.cadastrar.bind(this);
    firebase.auth().signOut();
  }

  cadastrar(){

      if(this.state.email != '' && this.state.senha != ''){

        firebase.auth().onAuthStateChanged((user)=>{
          if(user){
              let uid = user.uid;
              firebase.database().ref('users').child(uid).set({
                saldo:0
              });
              this.props.navigation.navigate('Interna');

          }
        })

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
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

          <TouchableOpacity style={styles.btnCadastrar} onPress={this.cadastrar}>
            <Text style={styles.txtBtn}>Cadastrar</Text>
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
  btnCadastrar:{
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
