import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class HistoricoList extends Component{

    constructor(props){
        super(props);

        let bg = '#38ef7d'

        if(this.props.data.tipo == 'despesa'){
            bg = '#ef473a'
        }

        this.state = {
            bg:bg 
        };
    }

    render(){
        return(
            <View style={[styles.area, {backgroundColor: this.state.bg}]}>
                <Text style={{color: '#000', fontSize: 20}}>{this.props.data.tipo}</Text>
                <Text style={{color: '#000', fontSize: 20}}>R$ {this.props.data.valor}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    area:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom:2,
        height:50,
    }
});