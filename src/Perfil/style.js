import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    breadcrumb: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breadcrumbItem: {
        fontSize: 16,
        marginRight: 5,
    },
    activeBreadcrumb: {
        fontWeight: 'bold',
    },
    profileSection: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    profileCardBody: {
        alignItems: 'center',
    },
    profileImage: {
        borderRadius: 50,
        width: 120,
        height: 120,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    }, tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tabContent: {
        marginTop: 20,
    },
    tabItem: {
        padding: 10,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabPane: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileInfo: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    editProfileForm: {
        marginTop: 20,
    },
    formGroup: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        fontSize: 16,
    },
    uploadButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    removeImageButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeImageButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    // Adicione outros estilos conforme necessário
});
