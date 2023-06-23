import { StyleSheet, View, Text } from "react-native";

export default function Card({ text }) {
  return (
    <View style={styles.card}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '50%',
    backgroundColor: '#5c5c5c',
  },
});
