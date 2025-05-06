import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Home from './src/screens/home';
import Cadastro from './src/screens/Cadastro';
import Listas from './src/screens/Listas';
import Scanner from './src/screens/Scanner';
import DetalhesLista from './src/screens/DetalhesLista';

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <AuthStack.Screen name="Login">
            {(props) => <Login {...props} onLogin={() => setIsLoggedIn(true)} />}
          </AuthStack.Screen>
          <AuthStack.Screen name="Cadastro">
            {(props) => <Cadastro {...props} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="home">
            {(props) => <Home {...props} onLogout={() => setIsLoggedIn(false)} />}
          </AppStack.Screen>
          <AppStack.Screen name="Listas" component={Listas} />
          <AppStack.Screen name="Scanner" component={Scanner} />
          <AppStack.Screen name="DetalhesLista" component={DetalhesLista} />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
}
