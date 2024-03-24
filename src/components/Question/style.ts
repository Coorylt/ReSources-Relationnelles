import { StyleSheet } from 'react-native';;

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAE5E0',
  },
  questionContainer: {

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10,
  },
  question: {
    flex: 1,
    fontSize: 24,
    padding:20,
    fontWeight: 'bold',
    color: '#005A5E',
  },
  separator: {
    height: 1,
    backgroundColor: '#005A5E',
    width:'100%',
    marginBottom: 10,
  },
  answer: {
    marginLeft:15,
    marginBottom:20,
    fontSize: 16,
    color: '#005A5E',
  },  
});
