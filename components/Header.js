import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Ostoslista</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    padding: 15,
    paddingTop: 45,
    backgroundColor: '#910D3D',
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
  },
});
export default Header;
