import { StyleSheet, Dimensions } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginVertical: windowHeight * 0.02,
    },
    card: {
        height: windowHeight * 0.28,
        width: windowWidth * 0.28,
        borderRadius: windowWidth * 0.03,
        backgroundColor: '#d5d5d5',
        overflow: 'hidden',
        marginBottom: 'auto'

    },
    imagem: {
        height: '100%',
        width: '100%',
        borderRadius: windowWidth * 0.03,
    }, txt2: {
        color: '#fff',
        fontSize: 8,
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 14,
        color: '#00968c',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    }, btnagendar: {
        backgroundColor: '#00968c',
        height: '4vh',
        width: '6vh',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        top: -20,
        alignSelf: 'flex-end',
    }
})