import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import FretesDisponiveisScreen from './screens/FretesDisponiveisScreen';
import MapaFreteScreen from './screens/MapaFreteScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Fretes Disponíveis" component={FretesDisponiveisScreen} />
        <Stack.Screen name="Mapa de Frete" component={MapaFreteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;