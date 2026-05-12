import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { ListItem } from '@/components/ui/ListItem';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';

export default function ProfilePage() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Screen scroll padded>
      <Card style={styles.profileCard}>
        <View style={styles.avatarRow}>
          <View style={[styles.avatar, { backgroundColor: colors.tintMuted }]}>
            <Text style={[styles.initials, { color: colors.tint }]}>YR</Text>
          </View>
          <View style={styles.ml}>
            <Text style={[styles.name, { color: colors.text }]}>Yannick Ramser</Text>
            <Text style={[styles.email, { color: colors.textMuted }]}>
              yannickramser1@gmail.com
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.statsRow}>
        <StatTile value="42" label="Workouts" style={styles.stat} />
        <StatTile value="7" label="Day streak" style={styles.stat} />
        <StatTile value="1280" label="Minutes" style={styles.stat} />
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Settings</Text>
      <Card padding={0} style={styles.settingsCard}>
        <ListItem
          leadingIcon={<Ionicons name="color-palette-outline" size={20} color={colors.tint} />}
          title="Appearance"
          onPress={() => router.push('/settings/appearance')}
        />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <ListItem
          leadingIcon={<Ionicons name="notifications-outline" size={20} color={colors.tint} />}
          title="Notifications"
          onPress={() => router.push('/settings/notifications')}
        />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <ListItem
          leadingIcon={
            <Ionicons name="information-circle-outline" size={20} color={colors.tint} />
          }
          title="About"
          onPress={() => router.push('/settings/about')}
        />
      </Card>

      <Button
        title="Sign out"
        onPress={() => {}}
        variant="ghost"
        fullWidth
        style={{ borderWidth: 1, borderColor: colors.danger } as any}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: { marginBottom: 16 },
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 28, fontWeight: '700' },
  ml: { marginLeft: 16 },
  name: { fontSize: 20, fontWeight: '700' },
  email: { fontSize: 14, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  stat: { flex: 1 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  settingsCard: { marginBottom: 24 },
  divider: { height: 1, marginHorizontal: 16 },
});
