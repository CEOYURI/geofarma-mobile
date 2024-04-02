import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { api } from './api/api';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Mensagens = () => {

    const [sms, setSms] = useState("")
  
    const [error, seterror] = useState("")
    const handleSMS = async () => {

            if (sms.trim()) {

                try {
                    const res = await api.post("/sms/novasms", { usuario, texto })
                    if (res.data.data === "Sucess") {
                       console.log("Enviada com Sucesso");
                        setTexto("")
                        console.log(res.data)
                    } else {
                       console.error("ERRO!")
                    }

                seterror(res.data.status)
                setTimeout(() => {
                    seterror("")
                }, 5000);
            } catch (error) {
            console.log(error)
        }
    }
       


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.carIcon}>
                    <FontAwesome5Icon name="hospital-symbol" size={windowWidth * 0.15} color={'#fff'} />
                </View>
                <Text style={styles.headerText}>Geo Farma Go</Text>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a sua questão, reclamação, inovações"
                    secureTextEntry={false}
                    onChangeText={(text) => setSms(text)}
                />
              
                <Pressable style={styles.btn} onPress={() => handleSMS()}>
                    <Text style={styles.txt}> Cadastrar</Text>
                </Pressable>
                <Text style={styles.danger}>
                    {error}
                </Text>
            </View>
        </View>
    );
}

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
        fontSize: 12,
        fontWeight: 'bold',
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
        borderColor: 'indigo',
        padding: windowWidth * 0.03,
    },
    btn: {
        width: '100%',
        borderRadius: 6,
        height: windowHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00968c',
        marginBottom: windowHeight * 0.03,
    },

    socialText: {
        alignSelf: 'center',
        color: '#00968c',
        fontSize: 12,
        fontWeight: 'bold',
    },
    txt: {
        color: '#fff',
        fontWeight: 'bold',
    }, danger: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold',
    }
});
