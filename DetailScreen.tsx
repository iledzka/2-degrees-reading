import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.h1}>Bookshelf</Text>
      <Text style={styles.h2}>Morning On The Banks of the Seine</Text>
      <Text style={styles.label}>Read 25%</Text>
      <View style={styles.bookAnimation}>
        <Text style={styles.verticalLabel}>Volume III</Text>
        <Image
          source={require('./assets/images/Lord-of-the-Flies.png')}
          style={styles.imageSmall}
        />
        <Image source={require('./assets/images/Brutes.png')} style={styles.imageSmall} />
        <Image source={require('./assets/images/Dance.png')} style={styles.imageSmall} />
        <Image source={require('./assets/images/Iconicon.png')} style={styles.imageSmall} />
      </View>
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'gray', width: '80%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf7ff',
    paddingHorizontal: 30,
  },
  h1: { color: 'black', fontSize: 28, fontWeight: 'bold', paddingVertical: 32 },
  h2: { color: 'black', fontWeight: 'bold', fontSize: 18, paddingVertical: 20 },
  label: { color: 'gray', fontSize: 16 },
  verticalLabel: {
    color: 'gray',
    fontSize: 10,
    position: 'absolute',
    left: -36,
    top: 66,
    transform: [{ rotate: '-90deg' }],
  },
  bookAnimation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageSmall: { resizeMode: 'contain', width: 70, height: 104 },
});
