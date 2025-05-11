import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { primeiraLetraMaiuscula } from './Scanner';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

export default function Home({
  navigation,
  onLogout,
}: {
  navigation: any;
  onLogout: any;
}) {
  const [user, setUser] = useState<any>(null);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

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
    } catch (error) {
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
  }, []);
  
  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Carregando fontes...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.botaoSair} onPress={() => alertaLogout()}>
        <Image source={require('../../assets/exit.png')} resizeMode="contain" />
      </TouchableOpacity>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Bem-vindo, {primeiraLetraMaiuscula(user?.nome || '')}!
        </Text>
        <Text style={styles.subText}>Pronto para se organizar hoje?</Text>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Algum produto em mente?</Text>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('Listas')}
          >
            <Text style={styles.actionButtonText}>Ver listas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Deseja escanear um produto?</Text>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('Scanner')}
          >
            <Text style={styles.actionButtonText}>Ir para Scanner</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('home')}>
          <Image
            source={require('../../assets/house-chimney.png')}
            resizeMode="contain"
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Listas')}>
          <Image
            source={require('../../assets/shopping-cart.png')}
            resizeMode="contain"
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Scanner')}>
          <Image
            source={require('../../assets/camera-viewfinder.png')}
            resizeMode="contain"
            style={styles.tabIcon}
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
  title: {
    fontSize: 28,
    alignSelf: 'center',
    fontFamily: 'Poppins_700Bold',
    color: '#ffffff',
    marginBottom: 20,
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subText: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  actionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  actionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#005f99',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#005f99',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
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
    paddingVertical: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});