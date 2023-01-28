import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
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

import { transformOrigin, rotateX } from './utils';

const { width: SCREEN_WIDTH, height: HEIGHT } = Dimensions.get('window');
const ROTATION = -90;
const TRANSLATION_X_CLAMP = 70;
const MARGIN_LEFT = 60;

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
      z: interpolate(translateX.value, [0, MARGIN_LEFT - 16, MARGIN_LEFT], [z - 20, z, z]),
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

  const rotateAndSnapToEdge = (tX: number, r: number) => {
    'worklet';
    const config = { duration: 300, easing: Easing.bezier(1, 0.3, 0.85, 1) };
    rotate.value = withTiming(r, config);
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
        rotateAndSnapToEdge(0, 0);
      } else if (rotate.value <= ROTATION / 2) {
        rotateAndSnapToEdge(MARGIN_LEFT, ROTATION);
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

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Animated.View style={[styles.boxSide, styles.front, animatedStyle]}>
            <Text style={styles.text}>Front</Text>
            <Pressable
              onPress={() => rotateAndSnapToEdge(MARGIN_LEFT, ROTATION)}
              style={styles.button}>
              <Text style={styles.text}>Front</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={[styles.boxSide, styles.right, animatedStyleRight]}>
            <Text style={styles.text}>Left</Text>
          </Animated.View>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'pink',
    alignItems: 'center',
  },
  box: {
    height: HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'blue',
  },
  boxSide: {
    height: HEIGHT,
    width: SCREEN_WIDTH,
    padding: Math.floor(SCREEN_WIDTH / 4),
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
  },
  text: { color: 'white', fontSize: 20 },
  front: {
    // transform: [{ perspective: HEIGHT }, { matrix }, { translateX: 60 }],
  },
  right: {
    width: SCREEN_WIDTH - MARGIN_LEFT,
  },
});
