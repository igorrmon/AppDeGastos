import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, TouchableHighlight} from 'react-native';

export default class Home extends Component {
  
  static navigationOptions = {
    header:null
  }

  constructor(props){
    super(props);
    this.state = {};

    this.entrar = this.entrar.bind(this);
    this.cadastrar = this.cadastrar.bind(this);

  }

  entrar(){
    this.props.navigation.navigate('Login');
  }

  cadastrar(){
    this.props.navigation.navigate('Cadastro');
  }


  render() {
    return (
      <ImageBackground source={ require('../assets/images/bg/bg.png')} style={styles.bg} >
          <View style={styles.container}>
              <Image source={ require('../assets/images/logo/logo.png')} style={styles.logo} />
              <View style={styles.buttonArea}>

                  <TouchableHighlight style={styles.btnEntrar} onPress={this.entrar}>
                    <Text style={styles.txtEntrar}>ENTRAR</Text>
                  </TouchableHighlight>

                  <TouchableHighlight style={styles.btnCadastrar} onPress={this.cadastrar} 
                  underlayColor={null} >
                    <Text style={styles.txtCadastrar}>Ainda não possui uma conta?</Text>
                  </TouchableHighlight>

              </View>
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
  logo:{
    width: 300,
    height:300,
  },
  buttonArea:{
    marginTop:50
  },
  btnEntrar:{
    backgroundColor: '#EE5673',
    alignItems:'center',
    justifyContent:'center',
    width:300,
    height:50,
    borderRadius:10,
    marginTop:60,
    marginBottom: 10
  },
  txtEntrar:{
    color: '#FFF',
    fontSize: 27,
    fontWeight: 'bold'
  },
  btnCadastrar:{
    alignItems:'center',
    justifyContent:'center'
  },
  txtCadastrar:{
    color:'#FFF',
    fontSize:17
  }
});
