import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingBottom: '15%'
    },
    image: {
        width: '100%',
        height: '80%',
        resizeMode: 'cover',
    },
    textContainer: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        padding:15,
        backgroundColor: "#03989E",
        width: 278,
        height: '100%',
        paddingHorizontal: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        flexWrap: 'wrap',
        textAlignVertical: 'center',
    },
    title: {
        marginTop: 25,
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 48,
        color: '#F7A932',
        fontWeight: '700',
        fontStyle: 'italic'
    },
    RessourceContainer: {
        borderRadius: 40,
        overflow: 'hidden',
        marginHorizontal: 55,
    },
});
