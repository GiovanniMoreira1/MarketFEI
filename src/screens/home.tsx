import { Text, View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { primeiraLetraMaiuscula } from './Scanner';

export default function Home({ navigation, onLogout }: { navigation: any, onLogout: any}) {
  const [user, setUser] = useState<any>(null);

  const alertaLogout = () => {
    Alert.alert(
      'Logout',
      'Você realmente deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => handleLogout(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      onLogout();
    }
    catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('loggedInUser');
        if (loggedInUser) {
          setUser(JSON.parse(loggedInUser));
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do user:', error);
      }
    };

    fetchUser();
  }
  , []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
        <TouchableOpacity style={styles.botaoSair} onPress={() => alertaLogout()}>
        <Image 
            source={require('../../assets/exit.png')}
            resizeMode="contain"
        />
        </TouchableOpacity>

      <Text style={styles.texto}>Bem-vindo, {primeiraLetraMaiuscula(user?.nome || '')}!</Text>


      <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('home')}>
          <Image 
            source={require('../../assets/house-chimney.png')}
            resizeMode="contain"
          />
          </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Listas')}>
        <Image 
            source={require('../../assets/shopping-cart.png')}
            resizeMode="contain"
        />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Scanner')}>
        <Image 
            source={require('../../assets/camera-viewfinder.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Perfil')}>
        <Image 
            source={require('../../assets/user.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53A7D8',
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  texto: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  botaoSair: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff', 
    paddingVertical: 20,
    borderTopWidth: 2,
    borderColor: '#005f99',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 18,
    color: '#005f99', 
    fontWeight: '600',
  },
});