import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Card({ children, title, text, result }) {
  return (
    <View style={styles.card}>
      {children}
      <Text variant='titleLarge' style={styles.title}>{title}</Text>
      <Text variant='bodyMedium' style={styles.text}>{text}</Text>
      <Text
        variant='bodyMedium'
        style={[styles.result, result <= 0 && {opacity: 0}]}
      >
        {result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#5c5c5c',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: '#ffffffde',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  text: {
    color: '#ffffffde',
  },
  result: {
    color: '#ffffffde',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
