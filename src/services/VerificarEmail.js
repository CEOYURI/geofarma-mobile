import React, { useState } from "react";
import k from '../../assets/Geo.svg'
import { Image, Pressable, Text, TextInput, View, Dimensions } from "react-native";
import { LilacLoadingWheel } from "../component/loading";
import { api } from "../api/api";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const VerificarEmail = ({ navigation }) => {


    const [email, setInput] = useState('');
    const [loading, setloading] = useState(false);
    const handleSubmit = async () => {

        setloading(true)
        try {
            const res = await api.post(`/rede/recuperar`, { email })
            if (res.data.message === 'Sucess') {
                console.log("E-mail enviado com Sucesso");
              navigation.navigate(`verificarToken`)
            }
            if (res.data.message === 'E-mail não encontrado') {
                console.error(res.data.message)

            }
            if (res.data.message === 'Erro ao enviar o Pacote') {
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
<View  style={{ width: windowWidth, height: windowHeight , backgroundColor: '#00968c' }}>
        <View  style={{ marginTop: '-5' }}>
          
            <Text >GeoFarma</Text>
        </View>

        <View >
            <Text>faça o Login com as informações pessoais</Text>

        </View>
        
                <Pressable onPress={() => navigation.navigate("Login")} ><Text>Login</Text></Pressable>
        
    </View>

<View >

        <Text >Verficar</Text>

    
    <View>
        <Text>Seu E-mail:</Text>
        <TextInput  placeholder="Seu email" value={email} onChange={(e) => setInput(e)} />

    </View>

    <Pressable onPress={handleSubmit}>
        <Text>Verificar</Text>
    </Pressable>

</View>
               {(loading &&
                 <LilacLoadingWheel />
               )}       
            </View>
    )
}