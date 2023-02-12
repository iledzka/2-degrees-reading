import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from '@expo-google-fonts/raleway';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailScreen() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
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
      <View style={styles.spacer} />
      <Text style={styles.h2}>Love Like a MIdnight Whistle</Text>
      <Text style={styles.label}>Read 75%</Text>
      <View style={styles.bookAnimation}>
        <Text style={styles.verticalLabel}>Volume V</Text>
        <Image
          source={require('./assets/images/Lord-of-the-Flies.png')}
          style={styles.imageSmall}
        />
        <Image source={require('./assets/images/Brutes.png')} style={styles.imageSmall} />
        <Image source={require('./assets/images/Dance.png')} style={styles.imageSmall} />
        <Image source={require('./assets/images/Iconicon.png')} style={styles.imageSmall} />
      </View>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf7ff',
    paddingLeft: 30,
    paddingRight: 20,
  },
  h1: { color: 'black', fontSize: 28, fontFamily: 'Raleway_900Black', paddingVertical: 32 },
  h2: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Raleway_800ExtraBold',
    fontSize: 18,
    paddingVertical: 10,
  },
  label: { color: 'gray', fontSize: 12, fontFamily: 'Raleway_700Bold', paddingBottom: 16 },
  verticalLabel: {
    color: 'gray',
    fontSize: 10,
    position: 'absolute',
    left: -36,
    top: 66,
    transform: [{ rotate: '-90deg' }],
    fontFamily: 'Raleway_400Regular',
  },
  bookAnimation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    shadowColor: '#ceaaef',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,
    elevation: 24,
  },
  imageSmall: { resizeMode: 'contain', width: 70, height: 104 },
  spacer: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    width: '80%',
    opacity: 0.3,
    alignSelf: 'flex-end',
    marginVertical: 30,
  },
});
