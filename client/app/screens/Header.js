import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from './CustomHeader';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Home" />
      <Text style={styles.content}>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    fontSize: 16,
    padding: 20,
  },
});

export default HomeScreen;