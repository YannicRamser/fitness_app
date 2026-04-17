import {useColorScheme, View} from 'react-native';
import {ThemedText} from "@/components/themed-text";
import {getGlobalStyles} from "@/constants/Styles";

export default function TestScreen() {
    const theme = useColorScheme() ?? 'light';

    const globalStyles = getGlobalStyles(theme);

    return (
        <View style={globalStyles.container}>
            <ThemedText>Questa è la sottopagina Test!</ThemedText>
        </View>
    );
}