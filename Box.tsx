import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import DetailScreen from './DetailScreen';
import MainScreen from './MainScreen';
import { transformOrigin, rotateX } from './utils';

const { width: SCREEN_WIDTH, height: HEIGHT } = Dimensions.get('window');
const ROTATION = -90;
const TRANSLATION_X_CLAMP = 70;
const MARGIN_LEFT = 34;

export default function Box() {
  const rotate = useSharedValue(0);

  const translateX = useDerivedValue(() => {
    return interpolate(rotate.value, [0, ROTATION], [0, MARGIN_LEFT], {
      extrapolateRight: Extrapolate.CLAMP,
      extrapolateLeft: Extrapolate.CLAMP,
    });
  }, [rotate]);

  // origin should fall back at least half-length of the screen width in z-axis
  const origin = useDerivedValue(() => {
    const z = -SCREEN_WIDTH / 2;
    return {
      x: translateX.value,
      y: 0,
      z,
    };
  }, [translateX]);

  // rotate the main screen in a 3-dimensional space
  const matrix = useDerivedValue(
    () => transformOrigin(rotateX(rotate.value), origin.value),
    [rotate, origin]
  );

  // rotate detail screen in a 3-dimensional space
  const matrixRight = useDerivedValue(
    () => transformOrigin(rotateX(rotate.value + 90), origin.value),
    [rotate, origin]
  );

  // animate the button to navigate back from the detail view
  const backButtonPosition = useDerivedValue(() => {
    return rotate.value === ROTATION
      ? withTiming(-MARGIN_LEFT * 0.6, {
          duration: 200,
          easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
        })
      : withTiming(MARGIN_LEFT, { duration: 300, easing: Easing.ease });
  }, [rotate]);

  const rotateAndSnapToEdge = (r: number) => {
    'worklet';
    const config = { duration: 300, easing: Easing.bezier(1, 0.3, 0.85, 1) };
    rotate.value = withTiming(r, config);
  };

  const navigateToDetailScreen = () => {
    'worklet';
    rotateAndSnapToEdge(ROTATION);
  };
  const navigateToMainScreen = () => {
    'worklet';
    rotateAndSnapToEdge(0);
  };

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onChange((e) => {
      'worklet';

      // snap to both edges when panning
      const config = {
        extrapolateRight: Extrapolate.CLAMP,
        extrapolateLeft: Extrapolate.CLAMP,
      };

      const translationX = Math.abs(e.translationX);

      // swipe to open the detail screen
      if (e.translationX < 0 && rotate.value > -90) {
        rotate.value = interpolate(translationX, [10, TRANSLATION_X_CLAMP], [0, ROTATION], config);

        // swipe back to the main screen
      } else if (e.translationX > 0 && rotate.value !== 0) {
        rotate.value = interpolate(translationX, [10, TRANSLATION_X_CLAMP], [ROTATION, 0], config);
      }
    })
    .onFinalize(() => {
      'worklet';

      if (rotate.value > ROTATION / 2 && translateX.value !== 0) {
        navigateToMainScreen();
      } else if (rotate.value <= ROTATION / 2) {
        navigateToDetailScreen();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: HEIGHT },
        { matrix: matrix.value },
        { translateX: translateX.value },
      ],
    };
  });
  const animatedStyleRight = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: HEIGHT },
        { matrix: matrixRight.value },
        { translateX: translateX.value },
      ],
    };
  });

  const animatedStyleBackBtn = useAnimatedStyle(() => {
    return {
      marginLeft: backButtonPosition.value,
      opacity: backButtonPosition.value > 0 ? 0 : 1,
    };
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Animated.View style={[styles.boxSide, styles.front, animatedStyle]}>
              <MainScreen onNavigateToDetailScreen={navigateToDetailScreen} />
            </Animated.View>

            <Animated.View style={[styles.boxSide, animatedStyleRight]}>
              <Pressable
                style={{ zIndex: 10 }}
                onPress={() => {
                  navigateToMainScreen();
                }}>
                <Animated.View style={[styles.goBackButton, animatedStyleBackBtn]}>
                  <Ionicons name="arrow-back-outline" size={22} color="black" />
                </Animated.View>
              </Pressable>

              <View style={[styles.innerRight]}>
                <DetailScreen />
              </View>
            </Animated.View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    height: HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#ffe606',
  },
  boxSide: {
    height: HEIGHT,
    width: SCREEN_WIDTH,
  },
  goBackButton: {
    height: MARGIN_LEFT + 10,
    width: MARGIN_LEFT,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    marginTop: MARGIN_LEFT * 1.4,
    backgroundColor: '#fdf7ff',
    zIndex: 10,
  },
  text: { color: '#fdf7ff', fontSize: 20 },
  front: {
    backgroundColor: '#fdf7ff',
    position: 'absolute',
  },
  innerRight: {
    height: HEIGHT,
    width: SCREEN_WIDTH - MARGIN_LEFT,
    marginLeft: 0,
    flex: 1,
    position: 'absolute',
  },
});
