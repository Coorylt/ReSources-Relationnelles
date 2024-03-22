import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    borderRadius: 30,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: "#03989E",
    width: '100%',
    padding:15,
    paddingHorizontal: 50,
    fontWeight: 'bold',
  },

  title:{
    textAlign:'center',
    fontSize:48,
    color:'#F7A932',
    fontWeight:'700',
    fontStyle:'italic'
  },
  categoryContainer: {
    borderRadius: 20, 
    overflow: 'hidden', 
    marginHorizontal: 10,
  },
});
