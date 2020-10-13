import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Ostos from './components/Ostos';
import Header from './components/Header';
import AddItem from './components/AddItem';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'https://ostolista-api.herokuapp.com';
const socket = socketIOClient(ENDPOINT, {query: 'b64=1'});

const App = () => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    //console.log(groceries);
    socket.on('FromAPI', (data) => {
      console.log(data);
      setGroceries(data);
    });
    return () => socket.disconnect();
  }, []);

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Älä tyhjää lissää', [
        {
          text: 'Ok',
        },
      ]);
    } else {
      console.log(text);
      socket.emit('adding-grocery', text);
      socket.on('AfterAdding', (data) => {
        console.log(data);
        setGroceries((prevState) => {
          return [...data];
        });
      });
      return () => socket.disconnect();
      /* setGroceries((prevGroceries) => {
        return [{text}, ...prevGroceries];
      }); */
    }
  };
  const deleteItem = (text) => {
    socket.emit('deleting-grocery', text);
    //setGroceries(groceries.filter((grocery) => grocery.text !== text));
    socket.on('AfterDeleting', (data) => {
      console.log(data);
      setGroceries(data);
    });
    return () => socket.disconnect();
  };
  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem} />
      <FlatList
        data={groceries}
        renderItem={({item}) => <Ostos item={item} deleteItem={deleteItem} />}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

