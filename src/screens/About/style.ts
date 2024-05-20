import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    textContainer: {
        marginHorizontal: 20,
    },
    textMain: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#03989E',
        marginTop: 15,
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 18,
        marginBottom: 20,
        color: '#555',
        textAlign:'left',
    },

    title: {
        marginTop: 25,
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 48,
        color: '#F7A932',
        fontWeight: '700',
        fontStyle: 'italic',        
    },
});