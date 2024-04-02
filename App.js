import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home} from './src/Home'
import {SignUp} from './src/Sign/Cadastrar';
import {Login} from './src/Login';
import { Map } from './src/Mapa/map';
import { VerificarEmail } from './src/services/VerificarEmail';
import { VerificarToken } from './src/services/VerificarToken';
import { Recuperar } from './src/services/recuperarSenha';
import { ConfirmarCadastro } from './src/Sign/ConfirmarCadastro';
import { Mensagens } from './src/Comment';
import { Perfil } from './src/Perfil/Perfil';
import { Data_farmacia } from './src/Farmacia_Detalhes/Data_farmacia';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> 
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='map' component={Map} options={{ headerShown: false }} />
        <Stack.Screen name='verificarEmail' component={VerificarEmail} options={{ headerShown: false }} />
        <Stack.Screen name='verificarToken' component={VerificarToken} options={{ headerShown: false }} />
        <Stack.Screen name='addnovasenha' component={Recuperar} options={{ headerShown: false }} />
        <Stack.Screen name='confirmcadastro' component={ConfirmarCadastro} options={{ headerShown: false }} />
        <Stack.Screen name='comment' component={Mensagens} options={{ headerShown: false }} />
        <Stack.Screen name='perfil' component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name='farmacia' component={Data_farmacia} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
