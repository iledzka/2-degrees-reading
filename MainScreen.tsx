import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        <Ionicons name="search" size={28} color="black" style={styles.icon} />
      </View>
      <Pressable onPress={onNavigateToDetailScreen} style={styles.button}>
        <Ionicons name="chevron-back-circle" size={28} color="black" style={styles.icon} />
        <Text style={styles.text}>READING 2 BOOKS LIST</Text>
      </Pressable>
      <Text style={styles.h2}>Popular</Text>
      <Text style={styles.h2}>Audiobook</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
  },
  button: {
    paddingVertical: 20,
    backgroundColor: 'yellow',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
  },
  nameArea: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: { color: 'black', fontSize: 18 },
  h1: { color: 'black', fontSize: 24, paddingVertical: 20, fontWeight: 'bold' },
  h2: { color: 'black', fontSize: 20, paddingVertical: 20 },
  icon: { padding: 20 },
});
