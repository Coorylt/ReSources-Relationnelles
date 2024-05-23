import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.1, // For iOS shadow
        shadowRadius: 5, // For iOS shadow
      },
      imageContainer: {
        width: 100,
        height: 100,
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
      },
      imageStyle: {
        borderRadius: 10,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
      infoContainer: {
        flex: 1,
        padding: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      categoryContainer: {
        marginVertical: 5,
      },
      category: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        color: 'white',
        fontSize: 12,
      },
      stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
      },
      stat: {
        fontSize: 12,
        color: '#666',
      },
});
