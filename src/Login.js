import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { LilacLoadingWheel } from './component/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { api } from './api/api';
import axios from 'axios'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Login = ({ navigation }) => {
    const [Login, setLogin] = useState({
        email: "",
        senha: ""
    })
    const [loading, setloading] = useState(false)

    const Send = async () => {
        setloading(true)
        try {
            const res = await axios.post(`http://192.168.252.182:8800/l/login`, Login)

            if (res.data.status === "Sucess") {
                console.log(res.data.tipo,"dados", res.data.id)

    await storeSessionData(res.data.tipo, res.data.id)
                navigation.navigate("map", { idCliente: res.data.id })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    const storeSessionData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Erro ao armazenar dados de sessão:', error);
        }
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.carIcon}>
                  {/*   <FontAwesome5Icon name="hospital-symbol" size={windowWidth * 0.15} color={'#fff'} /> */}
                    <MaterialIcons name="local-pharmacy" size={windowHeight * 0.10} color="#fff" />
                    
                </View>
                <Text style={styles.headerText}>Geo Farma Go</Text>
            </View>
            <View style={styles.content}>
                {loading && <LilacLoadingWheel />}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    secureTextEntry={false}
                    onChangeText={(text) => setLogin({ ...Login, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Palavra-passe"
                    secureTextEntry={true}
                    onChangeText={(text) => setLogin({ ...Login, senha: text })}
                />
                <Pressable style={styles.btn} desabled={loading} onPress={() => Send()} android_ripple={{ color: 'gray' }} >
                    <Text style={styles.btntxt}>
                        Entrar
                    </Text>

                </Pressable>
                <Text style={styles.socialText} onPress={() => navigation.navigate('verificarEmail')}>
                   Esquece a senha?
                    recuperar Conta
                </Text>
                <Text style={styles.socialText} onPress={() => navigation.navigate('SignUp')}>
                    Ainda não tem uma conta?
                    clique para criar
                </Text>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        paddingTop: windowHeight * 0.05,
    },
    carIcon: {
        backgroundColor: '#00968c',
        width: windowWidth * 0.2,
        height: windowWidth * 0.2,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#00968c',
        fontWeight: 'bold',
        fontSize: 15,
        padding: windowWidth * 0.03,
    },
    content: {
        paddingHorizontal: windowWidth * 0.05,
        marginTop: windowHeight * 0.1,
    },
    input: {
        width: '100%',
        height: windowHeight * 0.05,
        marginBottom: windowHeight * 0.03,
        borderWidth: 1,
        borderRadius: 6,
        color: '#757575',
        backgroundColor: '#d5d5d5',
        borderColor: '#00968c',
        padding: windowWidth * 0.03,
    },
    btn: {
        width: '100%',
        height: windowHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00968c',
        borderRadius: 6,
        marginBottom: windowHeight * 0.03,
    },
    btntxt: {
        color: '#fff',
        fontWeight: 'bold',
    },
    socialText: {
        color: '#00968c',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: windowHeight * 0.03,
    },
});


