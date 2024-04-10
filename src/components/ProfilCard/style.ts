import { StyleSheet } from 'react-native';;

export const styles = StyleSheet.create({

    containerCard: {
        backgroundColor: 'white',
        width: '90%',
        height: 450,
        alignSelf: 'center',
        borderRadius: 25,
        top: 35
    },

    profileImage: {
        width: '35%',
        left: '6%',
        bottom: '15%'
    },

    pseudo: {
        position:'absolute',
        color: '#03989E',
        fontSize: 24,
        fontWeight:'700',
        top:'18%',
        left:'54%'
    },

    stats:{
        position:'absolute',
        fontWeight:'700',
        top:'30%',
        left:'47%'
    },

    button: {
        position:'absolute',
        backgroundColor:'#03989E',
        borderRadius:25,
        top:'40%',
        left:'50%',
        color:'white',
        fontWeight:'700',
        fontSize:12,
        padding:10,
        textAlign:'center'
 

    },

});
