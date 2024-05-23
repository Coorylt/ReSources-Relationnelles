import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: '10%',
    paddingHorizontal: 20,
    width: '110%',
  },
  formContainer: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 20,
  },
  title: {
    marginTop: '5%',
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 38,
    color: '#03989E',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  inputContainer: {
    marginBottom: 15,
    
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    width:'80%',
    alignSelf:'center'

  },
  button: {
    backgroundColor: '#03989E',
    width: '50%',
    marginTop: 25,
    borderRadius: 25,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom:20,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  example:{
    left:50
  }
});
