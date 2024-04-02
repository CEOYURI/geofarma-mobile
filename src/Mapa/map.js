import {  View, Text, Pressable, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import * as Location from 'expo-location';
import { Aside } from '../component/Aside/aside';
import {Header} from '../component/Header/header'
import { styles } from './style';
export const Map = ({ navigation }) => {
    const [Farmacias, SetFarmacias] = useState([]);
    const [dataload, setload] = useState(false);
    const [userLocation, setuserLocation] = useState(null);
  
    const [load, setloaded] = useState(false);
    const [dados, setdados] = useState([]);
    const [real, setdadosReal] = useState([]);
    const [showAside, setShowAside] = useState(true);


    const FarmaciasData = async () => {
        try {
            const res = await api.get(`/f/todasfarma`);
            SetFarmacias(res.data.data);
            setload(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FarmaciasData();
    }, []);

    //Obter localização do usuario no telefone
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão de localização não concedida');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            console.log(location.coords.latitude, location.coords.longitude);
            setuserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            console.log(userLocation);
        })();
    }, []);

    const Pesquisar = async () => {
        setloaded(false);
        const lat = userLocation.latitude;
        const lng = userLocation.longitude;
        console.log(userLocation);
        if (Input.trim()) {
            try {
                const res = await api.post(`/buscarfarma`, { lat, lng, termo: Input });
                console.log(res.data.data);
                console.log(userLocation);
                setdados(res.data.data);
                setloaded(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("vazio");
        }
    };

    const toggleAside = () => {
        setShowAside(!showAside)
        console.log("abrindo",showAside);
    };

    const [Input, setInput] = useState('');
    return (
        <View style={styles.container}>
            <Header onChangeText={e => { setInput(e) }}
                value={Input}
                toggleAside={toggleAside}
                onSubmitEditing={Pesquisar()} />

            {showAside && (
               <Aside isOpen={showAside} />
            )}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -8.8391,
                    longitude: 13.2894,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {Farmacias.map((farma) => (
                    <Marker
                        key={farma.id}
                        coordinate={{ latitude: farma.latitude, longitude: farma.longitude }}
                        title={farma.nome}
                        pinColor='green'
                    >
                        <TouchableOpacity onPress={()=> console.log("clik")}>
                        <Callout style={{ width: 200, padding: 10 }} onPress={(e)=> console.log("cliquei",e)}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>{farma.nome}</Text>
                                <Text>Farmacia {farma.aberto ? `aberta` : `fechada`}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable style={{ backgroundColor: '#00968c', marginRight: 5 }} onPress={() => navigation.navigate("farmacia", { idFarma: farma.id })}>
                                        <Text style={{ color: 'white' }}>Ver</Text>
                                    </Pressable>
                                    <Pressable style={{ backgroundColor: '#00968c' }} onPress={() => handleFavoritar(farma.id)}>
                                        <Text style={{ color: 'white' }}>Adicionar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Callout>
                        </TouchableOpacity>
                        </Marker>
                ))}
                {userLocation && (
                    <Marker
                        coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
                            title='usuario'
                        pinColor="blue"
                    />
                )}
            </MapView>
            <Pressable style={styles.bottomButton}>
                <Text style={styles.bottomButtonText}>Criar Rota</Text>
            </Pressable>
        </View>
    );
};
