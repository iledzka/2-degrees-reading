import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { transformOrigin, rotateXY } from './utils';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const BOX_SIZE = WIDTH;

export default function Box() {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const origin = { x: 60, y: 0, z: -BOX_SIZE / 2 };
  const matrix = useSharedValue(transformOrigin(rotateXY(rotate.value, 0), origin));

  const matrixRight = useSharedValue(transformOrigin(rotateXY(rotate.value + 90, 0), origin));

  const panGesture = Gesture.Pan().onUpdate((e) => {
    if (e.translationX < 0 && rotate.value > -90) {
      translateX.value = interpolate(Math.abs(e.translationX), [0, 10, 60], [0, 40, 60], {
        extrapolateRight: Extrapolate.CLAMP,
      });
      rotate.value = interpolate(Math.abs(e.translationX), [0, 60], [0, -90], {
        extrapolateRight: Extrapolate.CLAMP,
      });
    } else if (e.translationX > 0 && rotate.value !== 0) {
      console.log('rotate.value', rotate.value);
      translateX.value = interpolate(Math.abs(e.translationX), [0, 38, 60], [60, 60, 0], {
        extrapolateRight: Extrapolate.CLAMP,
      });
      rotate.value = interpolate(Math.abs(e.translationX), [0, 60], [-90, 0], {
        extrapolateRight: Extrapolate.CLAMP,
      });
    }

    console.log(e.translationX);
    matrix.value = transformOrigin(rotateXY(rotate.value, 0), origin);
    matrixRight.value = transformOrigin(rotateXY(rotate.value + 90, 0), origin);
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
  box: {
    height: HEIGHT,
    width: BOX_SIZE,
    backgroundColor: 'blue',
  },
  boxSide: {
    height: HEIGHT,
    width: BOX_SIZE,
    padding: Math.floor(BOX_SIZE / 4),
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
    // transform: [{ perspective: HEIGHT }, { matrix: matrixLeft }, { translateX: 60 }],
    width: BOX_SIZE - 60,
  },
});
