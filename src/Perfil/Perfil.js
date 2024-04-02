import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput } from 'react-native';
import { Aside } from '../component/Aside/aside';
import {Header} from '../component/Header/header'
import { styles } from "./style";
import { api } from "../api/api";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Perfil = ()=>{
  
    const [userPhoto, setUserPhoto] = useState(null);
    const [userData, setUserData] = useState(null);
    const [show, setShow] = useState(false);
    
    // Funções para manipular a autenticação, carregamento de dados do usuário, etc.
    let Idusuario =""
    useEffect(() => {
        const checkIdCliente = async () => {
            try {
              const idCliente = await AsyncStorage.getItem('usuario');
                console.log("usuario123:", idCliente);
                Idusuario = idCliente;
                if (idCliente !== null) {
                    // Se encontrou idCliente, navega para a tela de mapa
                 await ObterUserId(idCliente);
                  await ObterEditarUser(idCliente)
                } else {
                    // Limpa o timer ao desmontar o componente
                }
            } catch (error) {
                console.log('Erro ao buscar idCliente:', error);
                // Lidar com o erro, se necessário
            }
        };

        checkIdCliente();
        
    }, []);


    const [user, SetUser] = useState([]);

    const ObterUserId = async (id) => {
        console.log(id);
        try {
            const res = await axios.get(`http://192.168.252.182:8800/api/usuarioId/${id}`);
            SetUser(res.data.data)
            setUserData(res.data.data)
          console.log(res.data.data);

        } catch (error) {
            console.error(error)
        }
    }
   
    const [dataload, setload] = useState(false)
    const [nome, setnome] = useState('');
    const [telefone, setTelefone] = useState('')
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState({
        senhaActual: '',
        novaSenha: ''
    })
    const [ConfimarSenha, setConfirmar] = useState('')

    const HandleSubmit = async () => {
       
        if ((Alterar.novaSenha === ConfimarSenha) && Alterar.senhaActual && ConfimarSenha && Alterar.novaSenha) {
            await api.put(`/api/actualizarsenha/${Idusuario}`, Alterar)
                .then(res => {
                    console.log(res.data);
                    if (res.data.data === "Actualizada") {

                      console.log("Senha Actualizada")

                    } else {
                       console.log("erro ao logar neste servidor");
                    }
                })
                .catch(err =>console.log(err))
        } else {
           console.error("ERRO!")
        }
    }


    const ObterEditarUser = async (id)=> {

        try {
            const res = await api.get(`/api/usuarioId/${id}`)
            console.log(res.data.data)
            setnome(res.data.data[0].nome);
            setTelefone(res.data.data[0].telefone);
            setemail(res.data.data[0].email);
            setload(true)

        } catch (error) {
            console.error(error)
        }
    }

    const ActualizarUser = async () => {
      
        const User = {
            nome: nome.trim(),
            telefone: telefone.trim(),
            email: email.trim()
        }
      
        try {
            const res = await api.put(`/api/actualizar/${Idusuario}`, User)
            console.log(res.data.data)
            
            ObterUserId(Idusuario);
        } catch (error) {
            console.error(error);
        }
    }
   
    const [showAside, setShowAside] = useState(true);

    const toggleAside = () => {
        setShowAside(!showAside)
        console.log("abrindo", showAside);
    };
   
    const [showtabsposition , setShowTbsPosition] = useState([true, false, false])
    return (
    
         <View>
            <Header toggleAside={toggleAside}/>

            {showAside && (
                <Aside isOpen={showAside} />
            )}
                    <View style={styles.container}>
                        <Text style={styles.pageTitle}>Perfil</Text>
                        <View style={styles.breadcrumb}>
                            <Text style={styles.breadcrumbItem}>Home</Text>
                            <Text style={styles.breadcrumbItem}>Usuario</Text>
                            <Text style={[styles.breadcrumbItem, styles.activeBreadcrumb]}>Perfil</Text>
                        </View>
                    </View>

                    <View style={styles.profileSection}>
                        <View style={styles.profileCard}>
                            <View style={styles.profileCardBody}>
                             {/*    {userPhoto ? (
                                    <Image source={{ uri: `http://localhost:8800/${userPhoto}` }} style={styles.profileImage} />
                                ) : (
                                    <Image source={require('./imagem')} style={styles.profileImage} />
                                )} */}
                                <Text style={styles.profileName}>{nome}</Text>
                                <Text>User {Idusuario}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Restante do código para a parte de edição do perfil, troca de senha, etc. */}
           
                <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tabItem} onPress={() => setShowTbsPosition([true, false, false]) }>
                        <Text style={styles.tabText}>Ver meu Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={()=> setShowTbsPosition([false, true, false])}>
                        <Text style={styles.tabText}>Editar</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={()=> setShowTbsPosition([false, false, true])} >
                        <Text style={styles.tabText}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>

                {/* Conteúdo das abas */}
                <View style={styles.tabContent}>
                    {/* Conteúdo para visualização do perfil */}
                 {showtabsposition[0] &&  ( <View style={styles.tabPane}>
                        <Text style={styles.sectionTitle}>Meu Perfil</Text>
                        <View style={styles.profileInfo}>
                            <Text style={styles.label}>Nome</Text>
                            <Text>{userData?.nome}</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.label}>Contacto</Text>
                            <Text>{userData?.telefone}</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.label}>Email</Text>
                            <Text>{userData?.email}</Text>
                        </View>
                    </View>)}

                    {/* Conteúdo para edição do perfil */}
                   { showtabsposition[1] && ( <View style={styles.tabPane}>
                        {dataload && (
                            <View style={styles.editProfileForm}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Imagem</Text>
                                    {/* Botão para mudar a foto */}
                                    {/* Outras informações do perfil do usuário */}
                                 {/*    {userPhoto ? (
                                        <Image source={{ uri: `http://localhost:8800/${userPhoto}` }} style={styles.profileImage} />
                                    ) : (
                                        <Image source={require('./imagem')} style={styles.profileImage} />
                                    )} */}
                                    <TouchableOpacity style={styles.uploadButton} onPress={() => handleUploadNewImage()}>
                                        <Text style={styles.uploadButtonText}><FontAwesome name="upload" size={20} />  Upload</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.removeImageButton} onPress={() => DeletarFoto(Idusuario)}>
                                        <Text style={styles.removeImageButtonText}><FontAwesome name="trash" size={20} />  Remover</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Nome</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={nome}
                                        onChangeText={(text) => setnome(text)}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Contacto</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={telefone}
                                        onChangeText={(text) => setTelefone(text)}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={email}
                                        onChangeText={(text) => setemail(text)}
                                    />
                                </View>
                                <TouchableOpacity style={styles.saveButton} onPress={() => ActualizarUser()}>
                                    <Text style={styles.saveButtonText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>)}

                    {/* Conteúdo para alteração de senha */}
                   {showtabsposition[2] &&( <View style={styles.tabPane}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Senha atual</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                value={senha.senhaActual}
                                onChangeText={(text) => setsenha({ ...senha, senhaActual: text })}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Nova senha</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                              
                                onChangeText={(text) => setsenha({ ...senha, novaSenha: text })}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Confirmar a senha</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                value={ConfimarSenha}
                                onChangeText={(text) => setConfirmar(text)}
                            />
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={() => HandleSubmit()}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>)}
                </View>

        </View>
    );
}

