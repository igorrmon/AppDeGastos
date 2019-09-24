import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import HistoricoList from './HistoricoList';
import firebase from './firebaseConnection';
import {NavigationActions, StackActions} from 'react-navigation';

export default class Interna extends Component {

  static navigationOptions = {
    title:'Home',
    header:null
  };

  constructor(props){
    super(props);
    this.state = {
      saldo:0,
      historico: [],
      bgSaldo: '#51cbf9'
    };

    this.despesa = this.despesa.bind(this);
    this.receita = this.receita.bind(this);
    this.logout = this.logout.bind(this);

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        let uid = user.uid;
        
        firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
            let state = this.state;
            state.saldo = snapshot.val().saldo;
            if(state.saldo < 0){
              state.bgSaldo = '#ef473a'
            }
            if(state.saldo > 0){
              state.bgSaldo = '#51cbf9'
            }

            this.setState(state);
        });
        //Olheiro do historico
        firebase.database().ref('historico').child(uid).on('value', (snapshot)=>{
           let state = this.state;
           state.historico = [];

           snapshot.forEach((childItem)=>{
              state.historico.push({
                key:childItem.key,
                tipo:childItem.val().tipo,
                valor:childItem.val().valor
              });
           });
           state.historico.reverse();
           this.setState(state);

        });

      }
    })

  }

  despesa(){
    this.props.navigation.navigate('AddDespesa');
  }

  receita(){
    this.props.navigation.navigate('AddReceita');
  }

  logout(){
    alert('Deslogado com sucesso!');
    firebase.auth().signOut();
    this.props.navigation.dispatch(StackActions.reset({
      index:0,
      actions:[
        NavigationActions.navigate({routeName:'Home'})
      ]
    }));
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.areaSaldo, {backgroundColor: this.state.bgSaldo}]}>

            <View>
              <TouchableOpacity onPress={this.logout}>
                <Image source={require('../assets/images/back.png')} style={{width:25, height:25, 
                  marginLeft: 7}}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.txtSaldo}>Saldo: R$ {this.state.saldo.toFixed(2)}</Text>
          </View>
          <View style={styles.areaBtn}>

              <TouchableOpacity onPress={this.despesa}>
                <Text style={styles.txtBtn}>+ Despesa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.receita}>
                <Text style={styles.txtBtn}>+ Receita</Text>
              </TouchableOpacity>

          </View>

         <FlatList
              style={styles.historico}
              data={this.state.historico}
              renderItem={ ({item}) => <HistoricoList data={item} />}
         />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex:1
  },
  areaSaldo:{
    //backgroundColor: '#51cbf9',
    paddingTop: 25,
    paddingBottom: 25,
  },
  txtSaldo:{
    fontSize:29,
    textAlign:'center',
    color: '#292929'
  },
  areaBtn:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:'#DDD',
    paddingBottom: 10,
    paddingTop: 10
  },
  txtBtn:{
    fontSize: 20,
    color:'#292929'
  },
  historico:{
    flex:1
  }
});
