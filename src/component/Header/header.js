import React from 'react';
import { View, Pressable, StyleSheet, Dimensions,Text, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const Header = ({ toggleAside, value, onChangeText, onSubmitEditing }) => {

   
    return (
        <View style={styles.header}>
            <Pressable style={styles.asideButton} onPress={toggleAside}>
                <Text style={styles.asideButtonText} >
                    <MaterialIcons name="menu" size={24} color="white" />
                </Text>
            </Pressable>
            <TextInput
                style={styles.input}
                placeholder="Pesquisa por medicamento, sua categoria..."
                onChangeText={onChangeText}
                value={value}
                onSubmitEditing={onSubmitEditing}
                
            />
        </View>
    );
};



const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: '15%',
        backgroundColor: '#00968c',
        elevation: 3,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    asideButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    asideButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginLeft: 10,
        borderRadius: 10
    }
});

export default Header;
