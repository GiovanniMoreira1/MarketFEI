import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

export default function Cadastro({
  onSignup,
  navigation,
}: {
  onSignup: () => void;
  navigation: any;
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  const handleSignUp = async () => {
    const userDados = {
      nome,
      email,
      user,
      createdAt: new Date().toISOString(),
    };

    try {
      const userExistentes = await AsyncStorage.getItem('users');
      let users = userExistentes ? JSON.parse(userExistentes) : [];

      const userJaCadastrado = users.some(
        (u) => u.email === email || u.user === user
      );
      if (userJaCadastrado) {
        Alert.alert('Erro', 'E-mail ou usuário já cadastrados.');
        return;
      }

      users.push(userDados);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

      navigation.navigate('Login');
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    }
  };
  
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['rgb(255, 255, 255)', 'rgb(200, 200, 200)']}
      style={styles.container}>
      {}
      <View style={styles.overlay}></View>

      <View style={styles.circuloCima} />
      <View style={styles.circuloBaixo} />

      <Image
        source={require('../../assets/logo_azul_nobg.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.inputs}
        placeholder="Nome"
        placeholderTextColor="#bebebe"
        onChangeText={setNome}></TextInput>
      <TextInput
        style={styles.inputs}
        placeholder="User"
        placeholderTextColor="#bebebe"
        onChangeText={setUser}></TextInput>
      <TextInput
        style={styles.inputs}
        placeholder="E-mail"
        placeholderTextColor="#bebebe"
        onChangeText={setEmail}></TextInput>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => {
          handleSignUp();
          navigation.navigate('Login');
        }}>
        <Text style={styles.botaoTexto}>Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.voltarTexto}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.voltarTexto}>Voltar para login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circuloCima: {
    position: 'absolute',
    top: -30,
    left: 255,
    width: 300,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#005f9915',
  },
  circuloBaixo: {
    position: 'absolute',
    bottom: -40,
    right: 150,
    width: 300,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#005f9915',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // light overlay for depth
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
    fontFamily: 'Poppins_400Regular',
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
    fontFamily: 'Poppins_600SemiBold',
  },

  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
  },

  voltarTexto: {
    color: '#005f99',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});