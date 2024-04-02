import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const asideWidth = windowWidth * 0.50;

export const Aside = ({ isOpen }) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.aside, { marginLeft: isOpen ? 0 : -asideWidth }]}>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("perfil")}>
                <View style={styles.content}>
                    <MaterialIcons name="person" size={24} color="white" />
                    <Text style={styles.text}>Perfil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("comment")}>
                <View style={styles.content}>
                    <MaterialIcons name="message" size={24} color="white" />
                    <Text style={styles.text}>Comentários</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Favmed")}>
                <View style={styles.content}>
                    <MaterialIcons name="favorite" size={24} color="white" />
                    <Text style={styles.text}>Favoritos Item</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("favFarma")}>
                <View style={styles.content}>
                    <MaterialIcons name="favorite" size={24} color="white" />
                    <Text style={styles.text}>Favoritos Farmácias</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    aside: {
        position: 'absolute',
        top: 105,
        left: 0,
        width: asideWidth,
        height: windowHeight,
        backgroundColor: '#00968c',
        zIndex: 100,
        elevation: 4,
        padding: 10,
        transition: 'margin-left 0.1s ease-in-out',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    link: {
        marginBottom: 45,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        marginRight: 10,
    },
});
