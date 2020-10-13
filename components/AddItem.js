import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const AddItem = ({addItem}) => {
  const [input, setInput] = useState('');
  const handleInputChange = (textValue) => setInput(textValue);

  return (
    <View>
      <TextInput
        onChangeText={handleInputChange}
        placeholder="Mitä ostetaan?"
        value={input}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addItem(input);
          setInput('');
        }}>
        <Text style={styles.btnText}>No tämä ostetaan...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#E2485E',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddItem;
