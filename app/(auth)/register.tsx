import { View, Text, StyleSheet } from 'react-native';
import Screen from '@/components/ui/Screen';

export default function RegisterScreen() {
  return (
    <Screen scroll style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.heading}>Create Account</Text>
        {/* TODO: add name + email + password inputs and call useSession().signIn after register */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 32 },
});
