import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Home from './src/screens/home';
import Cadastro from './src/screens/Cadastro';

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
          <AppStack.Screen name="Home" component={Home} />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
}
