import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Left</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: { color: 'white', fontSize: 20 },
});
