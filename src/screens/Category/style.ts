import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
  },

  image: {
    width: 180,
    height: 90,
    resizeMode: 'cover',
  },

  textContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },

  text: {
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
    width: 180,
    height: 30,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 48,
    color: '#F7A932',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  categoryContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal:8,
  },
});
