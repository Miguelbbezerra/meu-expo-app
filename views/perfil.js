import { View, Text, StyleSheet } from "react-native"
import MenuScreen from '../components/menu';

export const PerfilScreen = () => {
    return (
        <View >
            <View style={{ height: 60 }}>
                <MenuScreen />
            </View>
            <View style={styles.container}>
                <Text>Rota Teste OK</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
    },
});
export default PerfilScreen