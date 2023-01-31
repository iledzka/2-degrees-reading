import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

export default function MainScreen({
  onNavigateToDetailScreen,
}: {
  onNavigateToDetailScreen: () => void;
}) {
  return (
    <View>
      <Text style={styles.text}>Front</Text>
      <Pressable onPress={onNavigateToDetailScreen} style={styles.button}>
        <Text style={styles.text}>Front</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'pink',
    alignItems: 'center',
  },

  text: { color: 'white', fontSize: 20 },
});
