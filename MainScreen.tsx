import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from '@expo-google-fonts/raleway';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from './Carousel';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default function MainScreen({
  onNavigateToDetailScreen,
}: {
  onNavigateToDetailScreen: () => void;
}) {
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
      <View style={styles.containerInner}>
        <View style={styles.nameArea}>
          <Text style={[styles.h1, { fontFamily: 'Raleway_900Black' }]}>Hello, Iza</Text>
          <Ionicons name="search" size={24} color="black" style={styles.icon} />
        </View>
        <View style={styles.heroButtonContainer}>
          <Pressable onPress={onNavigateToDetailScreen} style={styles.button}>
            <Ionicons name="chevron-back-circle" size={30} color="black" style={styles.icon} />
            <View>
              <Text style={[styles.text, { fontFamily: 'Raleway_600SemiBold' }]}>READING 2</Text>
              <Text style={[styles.text, { fontFamily: 'Raleway_500Medium' }]}>BOOKS LIST</Text>
            </View>

            <Image
              source={require('./assets/images/Ten-Birds.png')}
              style={styles.heroButtonImage}
            />
          </Pressable>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.h2}>Popular</Text>
          <Text style={[styles.seeAllLink, { fontFamily: 'Raleway_400Regular' }]}>See all</Text>
        </View>
        <Carousel />
        <Text style={styles.h2}>Audiobook</Text>
        <View style={[styles.audiobookItem, styles.rowContainer]}>
          <View style={styles.rowContainer}>
            <Image source={require('./assets/images/avatar.png')} style={styles.imageAvatar} />
            <View>
              <Text style={styles.titleText}>Brutes</Text>
              <Text style={styles.authorText}>Dizz Tate</Text>
            </View>
          </View>

          <Ionicons name="play" size={20} color="black" style={{ padding: 24 }} />
        </View>
      </View>

      <View style={styles.tabBar}>
        <Feather name="triangle" size={24} color="black" style={styles.icon} />
        <Feather name="star" size={24} color="black" style={styles.icon} />
        <Feather name="hexagon" size={24} color="black" style={styles.icon} />
        <Feather name="circle" size={24} color="black" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 8,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    backgroundColor: '#ffe606',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
  },
  nameArea: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: { color: 'orange', fontSize: 16 },
  h1: { color: 'black', fontSize: 28 },
  h2: {
    color: 'black',
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: 'Raleway_800ExtraBold',
  },
  icon: { paddingHorizontal: 20, paddingVertical: 10 },
  heroButtonContainer: {
    justifyContent: 'flex-end',
    paddingTop: 30,
    overflow: 'hidden',
  },
  heroButtonImage: {
    width: 106,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -48,
    right: 34,
    transform: [{ rotate: '-24deg' }],
  },
  imageSmall: { resizeMode: 'contain', width: 60, height: 94 },
  imageAvatar: {
    resizeMode: 'contain',
    width: 60,
    aspectRatio: 1,
    margin: 10,
  },
  authorText: {
    color: 'gray',
    paddingTop: 6,
    fontFamily: 'Raleway_400Regular',
  },
  titleText: {
    paddingVertical: 4,
    fontSize: 15,
    fontFamily: 'Raleway_600SemiBold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audiobookItem: {
    borderRadius: 50,
    backgroundColor: 'rgba(250,239,255,0.7)',
    marginRight: 20,
  },
  tabBar: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 9,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  seeAllLink: { color: 'orange', fontSize: 12, marginRight: 20, paddingTop: 20, paddingBottom: 10 },
});
