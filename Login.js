'use strict';
import React , {Component} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Buffer } from 'buffer';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            showProgress: false
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.logoText}>Github Browser</Text>

                <TextInput onChangeText={(text)=> this.setState({username: text})}
                style={styles.input}
                placeholder="Username"/>
                <TextInput onChangeText={(text)=> this.setState({password: text})}
                style={styles.input}
                placeholder="Password"
                secureTextEntry/>

                <TouchableHighlight
                onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <ActivityIndicator
                animating={this.state.showProgress}
                size="large"
                style={styles.loader}/>
            </View>
        );
    }

    onLoginPressed(){
        this.setState({showProgress: true});
        var loginInfo = new Buffer(this.state.username + ':' +this.state.password);
        var encodedAuth = loginInfo.toString('base64');
        fetch('https://api.github.com/user',{
            headers:{
                'Authorization': 'Basic' + encodedAuth
            }
        })
        .then((response)=>{
            return response.json();
        }).then((result)=>{
            console.log(result);
            this.state({showProgress: false});
        });
    }
}
const styles = StyleSheet.create({
container:{
    backgroundColor: '#F5FCFF',
    flex:1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
},
logoText:{
    paddingTop: 10,
    fontSize: 40
},
input:{
    height:50,
    marginTop: 10,
    padding:4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
},
button:{
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
},
buttonText:{
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
},
loader:{
    marginTop: 30
}
});
module.exports = Login;