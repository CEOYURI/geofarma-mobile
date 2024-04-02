import React, { useState, useRef } from "react";
import k from '../../assets/Geo.svg'
import { Image, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { LilacLoadingWheel } from "../component/loading";
import { useRoute } from '@react-navigation/native';
import axios from 'axios'




    
export const ConfirmarCadastro = ({ navigation }) => {

    const [loading, setloading] = useState(false)
    const route = useRoute();
    const {Cadastro} = route.params
    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const refs = useRef([]);

    const handleChange = (index, e) => {
        const newDigits = [...digits];
        newDigits[index] = e.target.value.replace(/\D/g, '').slice(0, 1);
        setDigits(newDigits);

        // Move o foco para o próximo input, se houver
        if (newDigits[index] && index < digits.length - 1) {
            refs.current[index + 1].focus();
        }
    };
    const handleJoinDigits = async () => {
        const joinedNumber = digits.join('');


        return joinedNumber;
    }

    const handleSubmit = async () => {

        const Phone = await handleJoinDigits()

        const Values = Cadastro
        console.log(Phone);
        Values.token = Phone;

        setloading(true)

        try {
            const res = await axios.post(`http://localhost/api/confirmcadastro`, Values)
            if (res.data.data === 'Sucess') {
              //  localStorage.removeItem("dados")
               console.log("Cadastrado com sucesso!")
                navigation.navigate(`Login`)

            } else {
                console.log(res.data.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }


    }



    return (

        <View>
            <View style={{ width: '20rem', height: '26rem', backgroundColor: '#00968c' }}>
                <View >
                    <Image source={k}  alt="" />
                    <Text>GeoFarma</Text>
                </View>

                <View >
                    <Text>faça o Login com as informações pessoais</Text>

                </View>

                <Pressable onPress={() => navigation.navigate("Login")}>Login</Pressable>

            </View>

            <View >

                <Text >Verificar</Text>
                <Text>Digite os digitos que enviamos no seu email:</Text>

                <View>
                    <View style={styles.phoneinputcontainer}>
                        {digits.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(el) => (refs.current[index] = el)}
                                type="text"
                                value={digit}
                                maxLength={1}
                                onChangeText={(e) => handleChange(index, e)}
                                style={{ width: '10px', marginRight: '5px' }}
                            />
                        ))}

                    </View>
                </View>

                <Pressable
                    onPress={handleSubmit}
                >Verificar</Pressable>

            </View>
            {(loading &&
                <LilacLoadingWheel />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    phoneinputcontainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    ,
    phoneInput: {
        width: "200",
        height: "40",
        fontSize: 18,
        textAlign: "center",
        border: "2px solid #ccc",
        borderRadius: 8,
        outline: "none",
    }
    ,
    phoneInput: {
        borderColor: "#007bff",
    }
});