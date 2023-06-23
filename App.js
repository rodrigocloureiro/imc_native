import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import Card from "./components/Card";

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Calcule seu IMC
        </Text>
        <Text variant="bodyMedium" style={styles.text}>
          IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela
          Organização Mundial da Saúde para calcular o peso ideal de casa pessoa.
        </Text>
        <TextInput
          textColor='#fff'
          style={styles.input}
          placeholder='Digite seu peso'
          placeholderTextColor='#ccc'
          label='Peso (KG)'
          activeUnderlineColor='#ccc'
          underlineColor='#ccc'
          keyboardType='numeric'
        />
        <TextInput
          textColor='#fff'
          style={styles.input}
          placeholder='Digite sua altura'
          placeholderTextColor='#ccc'
          label='Altura (Metros)'
          activeUnderlineColor='#ccc'
          underlineColor='#ccc'
          keyboardType='numeric'
        />
        <Button
          style={styles.button}
          mode='contained'
          buttonColor='#2587a8'
          textColor='#ffffffde'
          onPress={() => alert('Clicou!')}
        >
          Calcular
        </Button>
        <Card
          text='Magreza'
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#242424",
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#ffffffde',
  },
  text: {
    color: '#ffffffde',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 20,
  },
});
