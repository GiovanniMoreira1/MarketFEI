import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Cadastro() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>pagina cadastro</Text>

      <Image 
          source={require('../../assets/logo_azul_nobg.png')}
          style={styles.logo}
          resizeMode="contain"
            />

      <TextInput style={styles.inputs} placeholder='Nome' placeholderTextColor='#bebebe'></TextInput>
      <TextInput style={styles.inputs} placeholder='E-mail' placeholderTextColor='#bebebe'></TextInput>
      <TextInput style={styles.inputs} placeholder='User' placeholderTextColor='#bebebe'></TextInput>
      <TextInput style={styles.inputs} placeholder='Senha' placeholderTextColor='#bebebe'></TextInput>
      
      <TouchableOpacity style={styles.botao} onPress={() => {}}>
          <Text style={styles.botaoTexto}>Cadastre-se</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  inputs: {
    backgroundColor: '#FDFEFF',
    width: 250,
    height: 45,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: '#00000044',
    borderWidth: 1,
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

  logo: { 
    width: 250,
    height: 100, 
    marginBottom: 20 
  }
});