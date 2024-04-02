import { StyleSheet, Dimensions } from "react-native";


const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
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
    },
    map: {
        flex: 1,
        width: '100%',
    },
    aside: {
        position: 'absolute',
        top: 100,
        left: 0,
        width: '65%',
        height: windowHeight,
        backgroundColor: '#00968c',
        zIndex: 100,
        elevation: 4,
        padding: 10,
    },
    asideText: {
        fontSize: 16,
        marginBottom: 10,
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#00968c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    bottomButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
