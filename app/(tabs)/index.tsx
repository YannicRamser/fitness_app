import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ThemedText} from "@/components/themed-text";
import {Redirect} from "expo-router";

export default function HomePage() {
    const handlePress = () => {
        return <Redirect href="/myWorkouts" />
    };

    return (
        <View style={styles.container}>
            <ThemedText type="defaultSemiBold" style={styles.title}>Hello! This is the Home Page</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.subtitle}>I am inside the (tabs) folder.</ThemedText>

            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Click Me</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});