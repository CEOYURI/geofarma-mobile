import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const Home = ({ navigation }) => {
    useEffect(() => {
        const checkIdCliente = async () => {
            try {
                const idCliente = await AsyncStorage.getItem('usuario');
                console.log("usuario:",idCliente);
                if (idCliente !== null) {
                    // Se encontrou idCliente, navega para a tela de mapa
                    navigation.navigate('map', {idCliente});
                } else {
                    // Se não encontrou idCliente, continua na tela Home
                    const timer = setTimeout(() => {
                        navigation.navigate('Login'); // Navega para a próxima tela após 2 segundos
                    }, 2000);

                    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
                }
            } catch (error) {
                console.log('Erro ao buscar idCliente:', error);
                // Lidar com o erro, se necessário
            }
        };

        checkIdCliente();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.carIcon}  >
                  
                    {/* <FontAwesome5Icon onPress={()=>navigation.navigate("Login")} name="hospital-symbol" size={70} color={'#fff'}

                    /> */}
            <MaterialIcons name="local-pharmacy" size={70} color="#fff" />
                </View >
                <Text style={styles.headerText}>Geo Farma Go</Text>
            </View>
           
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    carIcon: {
        backgroundColor: '#00968c',
        width: 100,
        height: 100,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        margin: 8,
        color: '#00968c',
        fontWeight: 'bold',
    },

});
