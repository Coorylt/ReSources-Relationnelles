import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  textContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 48,
    color: '#F7A932',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  categoryContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    margin: 10,
    width: 200,
  },
});
