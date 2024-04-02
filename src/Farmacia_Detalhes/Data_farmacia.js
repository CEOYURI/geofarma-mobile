import React, { useState, useEffect } from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, Image, Pressable, TouchableOpacity} from 'react-native'
import Header from '../component/Header/header'
import { api } from '../api/api'
import { Aside } from '../component/Aside/aside'
import { styles } from './style'

export const Data_farmacia = ()=>{
const Route = useRoute()

const {idFarma, IdUsuario} = Route.params
    const [Medi, setMedi] = useState([])
    const [bool, setbool] = useState(false)
    const [Comp, setComparar] = useState(false)
    const [Pesqui, setPesquisar] = useState(false)
    const [NomeFarmacia, SetNomeFarmacia] = useState("")
    const [Emailfarma, setEmail] = useState(" ")
    const [open, setopen] = useState(null)


const handledetalhes = async (id) => {
        const usuario = IdUsuario;
        try {
            const res = await api.get(`/m/med/${id}/${usuario}`)
            setMedi(res.data.data)
            SetNomeFarmacia(res.data.data[0].farmacia_nome)
            setEmail(res.data.data[0].email)
            setopen(res.data.data[0].aberto)

            setbool(true)
            setPesquisar(false);
            setComparar(false);
        }
        catch (erro) {
            throw new Error(erro)
        }
    }

    useEffect(() => {
        handledetalhes(idFarma);
    }, [])

    const Comparar = async (med) => {

        try {
            const res = await api.get(`/m/compara/${med}`)
            console.log(res.data.data);
            setMedi(res.data.data)
            setbool(false);
            setPesquisar(false);
            setComparar(true);
        }
        catch (error) {
            throw new Error(error)
        }
    }

    const [alert, setAlert] = useState(false);

    const Pesquisar = async (e) => {
        e.preventDefault()

        if (Input.trim()) {

            dados.usuario = IdUsuario;
            dados.idfarma = id;
            dados.search = Input.trim()
            try {
                const res = await api.post(`/b/buscar`, dados)
                if (res.data.data) {
                    setMedi(res.data.data)
                    setPesquisar(true)
                    setbool(false)
                    setComparar(false)
                }
                const a = res.data.data.length == 0
                console.log(a);
                setAlert(a)
                console.log(alert);
            } catch (erro) {
                console.error(erro)
            }
        } else {
            console.log("vazio")
        }

    }
    const [idFarmacia, setIdFarma] = useState("")
    const handleFavoritar = async (medicamentoId) => {
        // Lógica para adicionar / remover medicamento dos favoritos
        console.log(medicamentoId);
        let farma
        let med;
        let usuario
       
            if (idFarmacia) {
                farma = idFarma
                med = medicamentoId;
                usuario = IdUsuario;
            } else {
                med = medicamentoId;
                usuario = IdUsuario;
                farma = id;
            }
            try {
                const res = await api.post("/fav/favoritos-m/", { usuario, med, farma })
                console.log(res.data.status);

                setMedi((prevMedicamentos) =>
                    prevMedicamentos.map((medicamento) =>
                        medicamento.id === medicamentoId
                            ? { ...medicamento, favorito_id: !medicamento.favorito_id }
                            : medicamento
                    ))

            } catch (error) {
                throw new Error('Erro ao favoritar medicamento:', error);
            }

        } 
    const toggleAside = () => {
        setShowAside(!showAside)
        console.log("abrindo", showAside);
    };
    const [showAside, setShowAside] = useState(false)
    
    const [Input, setInput] = useState('');
return(
    <View>
        <Header  onChangeText={e => { setInput(e) }}
            value={Input}
          toggleAside={toggleAside}
            onSubmitEditing={Pesquisar()} />
            { showAside &&(
            <Aside />)}

             { bool && ( 
                <View>
                    <Text> Lista dos medicamentos da {NomeFarmacia}</Text>
                <Text>Farmacia {open ? "Aberta" : "Fechada"}</Text>
                <Text>Email: {Emailfarma}</Text>

                <View style={styles.cards}>
                    {Medi.map((medicine, index) => (
                        <View style={styles.card } key={index}>
                            <Image style={styles.imagem} source={{ uri: `http://localhost:8800/${medicine.imagem_path}`}} />
                            <Text style={styles.txt}>{medicine.nome}</Text>
                            <Text style={styles.txt}>{medicine.preco},00</Text>
                            <Pressable style={styles.btnagendar} onPress={() => handleFavoritar(medicine.id)}>

                                <Text style={styles.txt2} ><MaterialIcons name="favorite" size={24} color={medicine.favorito_id ? 'red' : 'gray'} />Add</Text>
                                <TouchableOpacity style={styles.btnagendar} onPress={() => Comparar(medicine.nome)}>
                                    Comparar preço
                                </TouchableOpacity>
                            </Pressable>
                         </View>
                         
                        ))}
                    </View>
                    
                </View>
             )}
        {Comp && (
            <View>
                <Text> Lista dos medicamentos da {NomeFarmacia}</Text>
                <Text>Farmacia {open ? "Aberta" : "Fechada"}</Text>
                <Text>Email: {Emailfarma}</Text>

                <View style={styles.cards}>
                    {Medi.map((medicine, index) => (
                        <View style={styles.card} key={index}>
                            <Image style={styles.imagem} source={{ uri: `http://localhost:8800/${medicine.imagem_path}` }} />
                            <Text style={styles.txt}>{medicine.nome}</Text>
                            <Text style={styles.txt}>{medicine.preco},00</Text>
                            <Pressable style={styles.btnagendar} onPress={() => handleFavoritar(medicine.id)}>

                                <Text style={styles.txt2} ><MaterialIcons name="favorite" size={24} color={medicine.favorito_id ? 'red' : 'gray'} />Add</Text>
                                <TouchableOpacity style={styles.btnagendar} onPress={() => { setIdFarma(medicine.id_farma); handledetalhes(medicine.id_farma) }}>
                                    ver farmacia
                                </TouchableOpacity>
                            </Pressable>
                        </View>

                    ))}
                </View>

            </View>
        )}
        {Comp && (
            <View>
                <Text> Lista dos medicamentos da {NomeFarmacia}</Text>
                <Text>Farmacia {open ? "Aberta" : "Fechada"}</Text>
                <Text>Email: {Emailfarma}</Text>
                {alert && (
                    <View className='alert alert-danger'>
                        <Text>Nesta farmacia não contém este produto!
                            procure em outra farmacia. Geo Farma</Text>
                    </View>)}
                <View style={styles.cards}>
                    {Medi.map((medicine, index) => (
                        <View style={styles.card} key={index}>
                            <Image style={styles.imagem} source={{ uri: `http://localhost:8800/${medicine.imagem_path}` }} />
                            <Text style={styles.txt}>{medicine.nome}</Text>
                            <Text style={styles.txt}>{medicine.preco},00</Text>
                            <Pressable style={styles.btnagendar} onPress={() => handleFavoritar(medicine.id)}>

                                <Text style={styles.txt2} ><MaterialIcons name="favorite" size={24} color={medicine.favorito_id ? 'red' : 'gray'} />Add</Text>
                                <TouchableOpacity style={styles.btnagendar} onPress={() => Comparar(medicine.nome)}>
                                    Comparar
                                </TouchableOpacity>
                            </Pressable>
                        </View>

                    ))}
                </View>

            </View>
        )}
       
   </View>
)
}