import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TestPage() {
    const handlePress = () => {
        alert('Button pressed!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello! This is a Test Page</Text>
            <Text style={styles.subtitle}>I am inside the (tabs) folder.</Text>

            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Click Me</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
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