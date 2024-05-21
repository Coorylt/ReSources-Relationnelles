import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerCard: {
        marginTop:'10%',
        backgroundColor: 'white',
        width: '90%',
        padding: 20,
        borderRadius: 25,
        alignItems: 'center',
    },

    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    profileImage: {
        width: 100, // Taille fixe pour l'image
        height: 100,
        borderRadius: 50, // Pour une image circulaire
        marginBottom: 10,
    },

    pseudo: {
        color: '#03989E',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center', // Centre le texte
    },

    stats: {
        fontWeight: '700',
        marginTop: 5,
        textAlign: 'center', // Centre le texte
    },

    button: {
        backgroundColor: '#03989E',
        borderRadius: 25,
        marginTop: 10,
        color: 'white',
        fontWeight: '700',
        fontSize: 12,
        padding: 10,
        textAlign: 'center',
        width: 160, 
    },

    centeredTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    centeredText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },

    divider: {
        marginHorizontal: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },

    underlined: {
        textDecorationLine: 'underline',
        color: '#03989E',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    resources:{
        width:'110%',
        marginTop:15,
    },

    // Modal 
    
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // Ombre pour Android
        shadowColor: '#000', // Ombre pour iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        width: '80%', // Ajuste la largeur du modal
        alignItems: 'center', // Centre le contenu du modal
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', // Centre le texte
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%', // Prend toute la largeur disponible
        textAlign: 'center', // Centre le texte
    },
    modalButton: {
        backgroundColor: '#03989E'
    }
});
