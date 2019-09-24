import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import firebase from './firebaseConnection';

export default class AddReceita extends Component {

  static navigationOptions = {
    title:'Adicionar Receita'
  };

  constructor(props){
    super(props);
    this.state = { 
        valor:''
    };

    this.adicionar = this.adicionar.bind(this);
    }

    adicionar(){
        if(this.state.valor != ''){
            let uid = firebase.auth().currentUser.uid;

            let key = firebase.database().ref('historico').child(uid).push().key;
            firebase.database().ref('historico').child(uid).child(key).set({
                tipo:'receita',
                valor:this.state.valor
            });

            //Atualizar o nosso saldo
            let user = firebase.database().ref('users').child(uid);
            user.once('value').then((snapshot)=>{
                let saldo = parseFloat(snapshot.val().saldo);
                saldo+= parseFloat(this.state.valor);
                
                user.set({
                    saldo:saldo
                });
            });
            this.props.navigation.goBack();
        }
    }

  render() {
    return (
      <View style={styles.container}>

            <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={this.state.valor}
                    autoFocus={true}
                    onChangeText={ (valor) => this.setState({valor}) }
            />

            <View style={styles.areaBtn}>
                <TouchableOpacity style={styles.botao} onPress={this.adicionar}>
                    <Text style={styles.txtBtn}>Adicionar Receita</Text>
                </TouchableOpacity>
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:10
  },
  input:{
      height:50,
      backgroundColor: '#DDD',
      marginTop: 20,
      padding: 5,
      fontSize: 24,
      textAlign:'center'
  },
  areaBtn:{
    alignItems:'center',
    paddingTop: 10
  },
  botao:{
      backgroundColor: '#51cbf9',
      height: 40,
      width: 250,
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 10
  },
  txtBtn:{
    fontSize: 20,
    color: '#292929'  
  }
});
