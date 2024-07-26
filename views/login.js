import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import LogoSenac from './../assets/senac-logo.png'
import * as SecureStore from 'expo-secure-store'

export default function LoginScreen({ navigation }) {

  const [dataLogin, setDataLogin] = React.useState({
    email: 'carlosmiguelcm820@gmail.com',
    senha: 'Teste12@'
  })

  function updateUsername(value) {
    const newDataLogin = {
      ...dataLogin
    }
    newDataLogin.email = value
    setDataLogin(newDataLogin)
  }

  function updatePassword(value) {
    const newDataLogin = {
      ...dataLogin
    }
    newDataLogin.senha = value
    setDataLogin(newDataLogin)
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
      navigation.navigate('Home')
    } else {
      alert('No values stored under that key.');
    }
  }

  async function logar() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(dataLogin)
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw
      };
      const resp = await fetch("https://api-pi-senac.azurewebsites.net/login"
        , requestOptions)
      const bodyResp = await resp.json()
      const token = bodyResp.token
      save('token', token)
      getValueFor('token')
    } catch (error) {
      console.warn(error)
    }
  }
  return (
    <View style={styles.container}>
    <Image style={styles.img} source={LogoSenac} />
    <Text style={styles.title}>Login</Text>
    <TextInput 
        value={dataLogin.input} 
        onChangeText={updateUsername} 
        style={styles.input} 
        placeholder='Email' 
        keyboardType='email-address' 
    />
    <TextInput 
        value={dataLogin.input} 
        onChangeText={updatePassword} 
        style={styles.input} 
        placeholder='Senha' 
        secureTextEntry={true} 
        keyboardType='default' 
        textContentType='password' 
    />
    <Button style={styles.button}
        title="Logar"
        onPress={() => logar()}
    />
</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    height: 200,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    margin: 10,
    backgroundColor: '#ffffff',
    borderColor: 'gray',
    padding: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 30,
  },
  btn: {
    width: '100%',
  }
});
