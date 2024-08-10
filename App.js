import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './views/login.js'
import PodologoScreen from './views/podologo.js'
import HomeScreen from './views/home.js'
import PacienteScreen from './views/pacientes.js';
import AgendamentoScreen from './views/agendamentos.js';
import PerfilScreen from './views/perfil.js';
import AddTable from './components/addTable.js';

const Stack = createNativeStackNavigator();

const formDataTable = {
  nomeCompleto: '',
  genero: '',
  dataNascimento: '2005-08-29',
  cpf: '',
  email: '',
  telefone: '',
  cep: '',
  cidade: '',
  rua: '',
  numero: '',
  bairro: ''
}

const inputs = [
  {key: 'nomeCompleto', label: 'Nome Completo'},
  {key: 'genero', label: 'Gênero'},
  {key: 'dataNascimento', label: 'Data de Nascimento'},
  {key: 'cpf', label: 'CPF'},
  {key: 'email', label: 'Email'},
  {key: 'telefone', label: 'Telefone'},
  {key: 'cep', label: 'CEP'},
  {key: 'cidade', label: 'Cidade'},
  {key: 'rua', label: 'Rua'},
  {key: 'numero', label: 'Número'},
  {key: 'bairro', label: 'Bairro'},
]

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Podologos" component={PodologoScreen} />
        <Stack.Screen name="Pacientes" component={PacienteScreen} />
        <Stack.Screen name="Adicionar Paciente" component={(props) => <AddTable {...props} table="paciente" formDataTable={formDataTable} inputs={inputs} />} />
        <Stack.Screen name="Agendamentos" component={AgendamentoScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
