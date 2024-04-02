import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const LilacLoadingWheel = () => {

    return (
        <View style={styles.container}>
            <View style={styles.overlay} />
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color=" #00968c" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: ' #00968c', // cor de fundo com opacidade
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});




