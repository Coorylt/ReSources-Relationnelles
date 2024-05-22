import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 48,
    color: '#F7A932',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom:'20%'
  },
  categoryBox: {
    width: '45%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,  

  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',

  },
});
