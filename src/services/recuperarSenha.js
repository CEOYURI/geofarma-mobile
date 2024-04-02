import React, { useState } from "react";
import k from '../../assets/Geo.svg'
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { LilacLoadingWheel } from "../component/loading";
import axios from 'axios'
export const Recuperar = ({ navigation }) => {


    
    const [novaSenha, setnovaSenha] = useState('')
    const [loading, setloading] = useState(false)

    const handleSubmit = async () => {

       
        setloading(true)
        try {
            const res = await axios.post(`http://localhost:8800/rede/novasenha`, { id, novaSenha })

            console.log(res.data.message)

            if (res.data.message === "Actualizada") {
                console.log(res.data.message)
                navigation.navigate("Login")
            } else {
              console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }

    }
    return (

        <View>
            <View style={{ width: '20', height: '20', backgroundColor: '#00968c' }}>
                <View >
                  
                    <Text >GeoFarma</Text>
                </View>

                <View >
                    <span>faça o Login com as informações pessoais</span>

                </View>

                <Pressable onPress={() => navigation.navigate("Login")} >Login</Pressable>

            </View>

            <View>

                <Text >Nova Senha</Text>


                <View>
                    <Text>Seu E-mail:</Text>
                    <TextInput placeholder="Nova senha" value={novaSenha} onChangeText={(e) => setnovaSenha(e)} />

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