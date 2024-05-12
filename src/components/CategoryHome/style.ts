import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 50,
  },

  image: {
    width: '100%',
    height: 110,
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
    backgroundColor: "#03989E",
    width: 210,
    height: 30,
    paddingHorizontal: 50,
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
    marginHorizontal: 15,
  },
});
