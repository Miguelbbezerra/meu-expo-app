import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './views/login.js'
import PodologoScreen from './views/podologo.js'
import HomeScreen from './views/home.js'
import PacienteScreen from './views/pacientes.js';
import AgendamentoScreen from './views/agendamentos.js';
import PerfilScreen from './views/perfil.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Podologos" component={PodologoScreen} />
        <Stack.Screen name="Pacientes" component={PacienteScreen} />
        <Stack.Screen name="Agendamentos" component={AgendamentoScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
