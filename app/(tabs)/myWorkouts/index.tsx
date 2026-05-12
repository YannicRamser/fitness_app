import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import Screen from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';

const CATEGORIES = ['All', 'Strength', 'Cardio', 'Mobility', 'HIIT'];

const WORKOUTS = [
  { id: '1', name: 'Full Body Blast', durationMin: 45, exercises: 6 },
  { id: '2', name: 'Upper Body Push', durationMin: 35, exercises: 5 },
  { id: '3', name: 'Leg Day', durationMin: 50, exercises: 7 },
  { id: '4', name: 'HIIT Cardio', durationMin: 25, exercises: 8 },
  { id: '5', name: 'Mobility Flow', durationMin: 20, exercises: 4 },
  { id: '6', name: 'Core Strength', durationMin: 30, exercises: 5 },
];

export default function WorkoutsPage() {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <Screen padded={false}>
      <View style={[styles.header, { paddingHorizontal: 20, paddingTop: 16 }]}>
        <Text style={[styles.title, { color: colors.text }]}>My workouts</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>12 workouts saved</Text>

        <View
          style={[
            styles.searchBox,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Ionicons name="search-outline" size={16} color={colors.icon} style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search workouts..."
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chips}
          contentContainerStyle={styles.chipsContent}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    activeCategory === cat ? colors.tint : colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: activeCategory === cat ? colors.buttonText : colors.textMuted },
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlashList
        data={WORKOUTS}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Card style={styles.workoutCard} onPress={() => {}}>
            <View style={styles.workoutRow}>
              <View style={[styles.workoutIcon, { backgroundColor: colors.tintMuted }]}>
                <Ionicons name="barbell-outline" size={22} color={colors.tint} />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={[styles.workoutName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.workoutMeta, { color: colors.textMuted }]}>
                  {item.durationMin} min · {item.exercises} exercises
                </Text>
              </View>
            </View>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      <View style={styles.fab}>
        <Button title="New workout" onPress={() => {}} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 2 },
  subtitle: { fontSize: 14, marginBottom: 16 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 44,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15 },
  chips: { marginBottom: 8 },
  chipsContent: { gap: 8, paddingRight: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13, fontWeight: '500' },
  workoutCard: { marginBottom: 0 },
  workoutRow: { flexDirection: 'row', alignItems: 'center' },
  workoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  workoutInfo: { flex: 1 },
  workoutName: { fontSize: 16, fontWeight: '600' },
  workoutMeta: { fontSize: 13, marginTop: 2 },
  fab: { position: 'absolute', bottom: 24, right: 20, left: 20 },
});
