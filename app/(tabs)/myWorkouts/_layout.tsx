import { Stack } from 'expo-router';

export default function WorkoutsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: 'I miei Allenamenti', headerShown: false }}
            />
            <Stack.Screen
                name="test"
                options={{ title: 'Dettaglio Test', headerShown: false }}
            />
        </Stack>
    );
}