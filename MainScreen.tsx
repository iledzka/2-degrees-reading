import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function MainScreen({
  onNavigateToDetailScreen,
}: {
  onNavigateToDetailScreen: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.nameArea}>
        <Text style={styles.h1}>Hello, Iza</Text>
        <Ionicons name="search" size={24} color="black" style={styles.icon} />
      </View>
      <View style={styles.heroButtonContainer}>
        <Pressable onPress={onNavigateToDetailScreen} style={styles.button}>
          <Ionicons name="chevron-back-circle" size={24} color="black" style={styles.icon} />
          <View>
            <Text style={styles.text}>READING 2</Text>
            <Text style={styles.text}>BOOKS LIST</Text>
          </View>

          <Image source={require('./assets/images/Ten-Birds.png')} style={styles.heroButtonImage} />
        </Pressable>
      </View>
      <Text style={styles.h2}>Popular</Text>
      <View style={styles.carousel}>
        <View>
          <View style={styles.carouselItem}>
            <Image source={require('./assets/images/Iconicon.png')} style={styles.imageSmall} />
            <View style={styles.bookInfo}>
              <Text style={styles.titleText}>Iconicon</Text>
              <Text style={styles.authorText}>John Grindrod</Text>
              <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <Ionicons
                  name="star"
                  size={14}
                  color="black"
                  style={{ color: 'orange', marginRight: 4 }}
                />
                <Text>5</Text>
              </View>
            </View>
          </View>
          <View style={styles.carouselItem}>
            <Image source={require('./assets/images/Re-Sisters.png')} style={styles.imageSmall} />
            <View style={styles.bookInfo}>
              <Text style={styles.titleText}>Re-Sisters</Text>
              <Text style={styles.authorText}>Cosey Fanni Tutti</Text>
              <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <Ionicons
                  name="star"
                  size={14}
                  color="black"
                  style={{ color: 'orange', marginRight: 4 }}
                />
                <Text>4.8</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.carouselItem}>
            <Image
              source={require('./assets/images/Lord-of-the-Flies.png')}
              style={styles.imageSmall}
            />
            <View style={styles.bookInfo}>
              <Text style={styles.titleText}>Lord of the Flies</Text>
              <Text style={styles.authorText}>William Golding</Text>
              <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <Ionicons
                  name="star"
                  size={14}
                  color="black"
                  style={{ color: 'orange', marginRight: 4 }}
                />
                <Text>4.5</Text>
              </View>
            </View>
          </View>
          <View style={styles.carouselItem}>
            <Image source={require('./assets/images/Dance.png')} style={styles.imageSmall} />
            <View style={styles.bookInfo}>
              <Text style={styles.titleText}>Dance</Text>
              <Text style={styles.authorText}>Emma Warren</Text>

              <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <Ionicons
                  name="star"
                  size={14}
                  color="black"
                  style={{ color: 'orange', marginRight: 4 }}
                />
                <Text>4.5</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.h2}>Audiobook</Text>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'red',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image source={require('./assets/images/Dance.png')} style={styles.imageSmall} />
        <Ionicons name="play" size={20} color="black" style={{ padding: 20 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 20,
    backgroundColor: '#ffe606',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
  },
  nameArea: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: { color: 'black', fontSize: 18 },
  h1: { color: 'black', fontSize: 28, paddingVertical: 20, fontWeight: 'bold' },
  h2: { color: 'black', fontSize: 20, paddingVertical: 20 },
  icon: { padding: 20 },
  heroButtonContainer: {
    justifyContent: 'flex-end',
    paddingTop: 28,
    overflow: 'hidden',
  },
  heroButtonImage: {
    width: 116,
    height: 156,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -44,
    right: 34,
    transform: [{ rotate: '-24deg' }],
  },
  carousel: { flex: 1, flexDirection: 'row' },
  imageSmall: { resizeMode: 'contain', width: 60, height: 94 },
  carouselItem: {
    width: SCREEN_WIDTH * 0.7,
    marginBottom: 10,
    flexDirection: 'row',
  },
  bookInfo: {
    marginLeft: 10,
  },
  authorText: {
    color: 'gray',
  },
  titleText: {
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});
