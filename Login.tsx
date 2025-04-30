import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login({ onLogin, navigation }: { onLogin: () => void, navigation: any }) {
  return (
    <LinearGradient
      colors={['#53A7D8', '#005f99']} 
      style={styles.container}
    >
      <View style={styles.circuloCima} />
      <View style={styles.circuloBaixo} />

      <Image 
        source={require('../../assets/logo_branca.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.titulo}>Bem-vindo</Text>

      <TextInput placeholder='User' style={styles.inputs} placeholderTextColor='#bebebe' />
      <TextInput placeholder='Senha' style={styles.inputs} placeholderTextColor='#bebebe' secureTextEntry />

      <TouchableOpacity style={styles.botao} onPress={onLogin}>
        <Text style={styles.botaoTexto}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.cadastre}>
        Não possui login?{' '}
        <Text onPress={() => navigation.navigate('Cadastro')} style={styles.cadastroLink}>
          Cadastre-se
        </Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circuloCima: {
    position: 'absolute',
    top: -30,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ffffff11',
  },
  circuloBaixo: {
    position: 'absolute',
    bottom: -40,
    right: -80,
    width: 300,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ffffff11',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FDFEFF',
    textAlign: 'center',
  },

  inputs: {
    backgroundColor: '#FDFEFF',
    width: 250,
    height: 45,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000044',
  },

  botao: {
    backgroundColor: '#FDFEFF',
    width: 250,
    height: 45,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000044',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#005f99',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cadastre: {
    color: '#FDFEFF',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },

  cadastroLink: {
    color: '#FDFEFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  logo: { 
    width: 250,
    height: 100, 
    marginBottom: 20 
  },
});