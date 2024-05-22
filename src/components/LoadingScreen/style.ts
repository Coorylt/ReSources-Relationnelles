import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerBoxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  boxCategory: {
    width: '20%',
    height: 150,
    margin: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryTitle: {
    color: 'black',
  },
  // Define other styles as needed
});
