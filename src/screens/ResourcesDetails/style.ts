import { StyleSheet } from 'react-native';;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAE5E0',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    containerResources: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    creatorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    meta: {
        justifyContent: 'center',
    },
    metaText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateViews: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    date: {
        marginRight: 5,
    },
    views: {
        marginRight: 10,
    },
    body: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#03989E'
    },

    textType:{
        marginBottom:10,
        color:'grey'
    },

    likes: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
    downloadContainer: {
        marginTop: 10,
    },
    downloadButton: {
        backgroundColor: '#03989E',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteContainer: {
        marginTop: 20,
    },
    button:{
        marginRight:20,
    }
});
