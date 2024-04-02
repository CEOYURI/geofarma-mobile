import React, { useState,useRef } from "react";
import k from '../../assets/Geo.svg'
import { Image, Pressable, Text, TextInput, View, StyleSheet} from "react-native";
import { LilacLoadingWheel } from "../component/loading";

export const VerificarToken = ({ navigation }) => {


   


    const [loading, setloading] = useState(false)

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phone = await handleJoinDigits()

        console.log(phone);
        setloading(true)

        try {
            const res = await api.post(`/rede/redefinir-senha`, { token: phone })

            if (res.data.message === "Sucess") {
                const id = res.data.id;
                navigation.navigate(`addnovasenha`, {id})
            } else {
               console.error(res.data.message)
            }

            console.log(res.data)
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
                    
                    <Text >GeoFarma</Text>
                </View>

                <View >
                    <Text>faça o Login com as informações pessoais</Text>

                </View>

                <Pressable onPress={() => navigation.navigate("Login")} ><Text>Login</Text></Pressable>

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
                                style={{ width: '10', marginRight: '5' }}
                            />
                        ))}

                    </View>
                </View>

                <Pressable 
                    onPress={handleSubmit}
                ><Text>Verificar</Text></Pressable>

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
    fontSize: "18",
    textAlign: "center",
    border: "2px solid #ccc",
    borderRadius: 15,
    outline: "none",
}
,
phoneInput : {
    borderColor: "#007bff",
}
});