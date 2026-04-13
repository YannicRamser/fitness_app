import { StyleSheet } from 'react-native';
import {Colors} from "@/constants/theme";

export const getGlobalStyles = (theme: 'light' | 'dark') => {
    const colors = Colors[theme];

    return StyleSheet.create({
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
            backgroundColor: colors.buttonBackground,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
        },
        buttonText: {
            color: colors.text,
            fontWeight: '600',
        },
    });
}

