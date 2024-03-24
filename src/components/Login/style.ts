import { StyleSheet } from 'react-native';;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf:'center',
        marginTop:'10%',
        paddingHorizontal: 20,
        width:'90%',
    },
    formContainer: {
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 30,
    },
    input: {
        height: 40,
        borderBottomWidth: 1, 
        borderColor: 'black',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    title:{
        marginTop: '30%',
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 38,
        color: '#03989E',
        fontWeight: '700',
        fontStyle: 'italic'
    },
    text:{
        fontSize:20,
        padding:10
    },
    button: {
        backgroundColor:'#03989E',
        width: '50%',
        marginTop:25,
        borderRadius:25,
        height:'25%',
        alignSelf:'center',
        justifyContent: 'center', 
    },
    
    textButton:{
        color:'white',
        textAlign:'center',
    }
});

    