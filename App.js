import { StyleSheet, View, SafeAreaView, Keyboard } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import Card from "./components/Card";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Documentação eas build
// https://github.com/expo/eas-cli#enforcing-eas-cli-version-for-your-project
// https://docs.expo.dev/build/setup/
// https://docs.expo.dev/develop/user-interface/app-icons/

export default function App() {
  const [ weight, setWeight ] = useState('');
  const [ height, setHeight ] = useState('');
  const [ imc, setImc ] = useState(0);

  useEffect(() => {
    (async () => {
      const savedWeight = await AsyncStorage.getItem("@weight") || "";
      const savedHeight = await AsyncStorage.getItem("@height") || "";
      const savedIMC = await AsyncStorage.getItem("@imc") || "0";
      setWeight(savedWeight);
      setHeight(savedHeight);
      setImc(parseFloat(savedIMC));
    })();
  }, []);

  const handleWeight = async (value) => {
    if(isNaN(value) || value === '') {
      setWeight(value.slice(0, value.length-1));
    } else {
      try {
        await AsyncStorage.setItem("@weight", value.toString());
      } catch(error) {
        console.log("Error: ", error);
      }
    }
  };

  const handleHeight = async (value) => {
    if(isNaN(value) || value === '') {
      setHeight(value.slice(0, value.length-1));
    } else {
      try {
        await AsyncStorage.setItem("@height", value.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCalculate = async () => {
    const imc = (weight / (height*height));
    try {
      await AsyncStorage.setItem("@imc", imc.toFixed(2));
    } catch (error) {
      console.log(error);
    }
    setImc(parseFloat(imc.toFixed(2)));
    Keyboard.dismiss();
  };

  const clearInputs = async () => {
    setWeight("");
    setHeight("");
    setImc("0");
    try {
      await AsyncStorage.setItem("@weight", "");
      await AsyncStorage.setItem("@height", "");
      await AsyncStorage.setItem("@imc", "0");
    } catch(error) {
      console.log("Error: ", error);
    }
  };

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
          value={String(weight)}
          onChangeText={value => {
            setWeight(value.includes(',') ? value = value.replace(',', '.') : value);
            handleWeight(value);
          }}
          theme={{colors: {onSurfaceVariant: '#ffffffde'}}}
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
          value={String(height)}
          onChangeText={value => {
            setHeight(value.includes(',') ? value = value.replace(',', '.') : value);
            handleHeight(value);
          }}
          theme={{colors: {onSurfaceVariant: '#ffffffde'}}}
        />
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            mode='contained'
            buttonColor='#2587a8'
            textColor='#ffffffde'
            onPress={handleCalculate}
          >
            Calcular
          </Button>
          {(weight && height && imc > 0) &&
            <Button
              style={styles.button}
              mode='contained'
              buttonColor='#2587a8'
              textColor='#ffffffde'
              onPress={clearInputs}
            >
              Limpar
            </Button>
          }
        </View>
        <View style={styles.cards}>
          <Card
            title='Magreza'
            text='Está menor que 18.5'
            result={imc <= 18.5 ? imc : 0}
            bgColor={imc > 0 && imc <= 18.5 ? '#a0adb5' : '#5c5c5c'}
          >
            <SimpleLineIcons name="dislike" size={40} color="#000" />
          </Card>
          <Card
            title='Normal'
            text='Está entre 18.5 e 24.9'
            result={imc >= 18.5 && imc <= 24.9 ? imc : 0}
            bgColor={imc >= 18.5 && imc <= 24.9 ? '#0db675' : '#5c5c5c'}
          >
            <SimpleLineIcons name="like" size={40} color="#000" />
          </Card>
          <Card
            title='Sobrepeso'
            text='Está entre 25 e 29.9'
            result={imc >= 25 && imc <= 29.9 ? imc : 0}
            bgColor={imc >= 25 && imc <= 29.9 ? '#e6b741' : '#5c5c5c'}
          >
            <SimpleLineIcons name="dislike" size={40} color="#000" />
          </Card>
          <Card
            title='Obesidade'
            text='Está maior que 30'
            result={imc >= 30 ? imc : 0}
            bgColor={imc >= 30 ? '#ca4a49' : '#5c5c5c'}
          >
            <SimpleLineIcons name="dislike" size={40} color="#000" />
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#ffffffde',
    fontWeight: '700',
  },
  text: {
    color: '#ffffffde',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttons: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    borderRadius: 5,
    marginVertical: 10,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
});
