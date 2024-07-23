import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Linking,
} from 'react-native';
import MenuScreen from '../components/menu';
import * as SecureStore from 'expo-secure-store'

const items = [
    {
        img: 'https://ww3.ms.senac.br/Portals/0/Cursos/53089/Anexo_53089_133190658289652415.jpg?w=360',
        name: 'Tecnicas Praticas em Podologia',
        body: 'Cursos Livres . Saúde',
        location: 'Saiba Mais',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/32624'
    },
    {
        img: 'https://ww3.ms.senac.br/Portals/0/Cursos/34419/Anexo_34419_133023879459010346.jpeg?w=360',
        name: 'Técnico em Podologia - Senac MS',
        body: 'Cursos Técnicos . Saúde',
        location: 'Saiba Mais',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/34419'
    },
    {
        img: 'https://ww3.ms.senac.br/Portals/0/Cursos/00.jpg?w=360',
        name: 'Podologia esportiva - Senac MS',
        body: 'Cursos Livres . Saúde',
        location: 'Saiba Mais',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/103359'
    },
];

export default function HomeScreen() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        usuario();
    }, []);

    async function GetItemLocalStorage(key) {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (e) {
            console.error('Failed to fetch the token from storage', e);
            return null;
        }
    }

    async function usuario() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = await GetItemLocalStorage('token');

        if (!token) {
            console.error('Token is not available');
            return;
        }

        const raw = JSON.stringify({
            "token": token
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("https://api-pi-senac.azurewebsites.net/api/validate-token", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUser(data.decoded.data);
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <MenuScreen />
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    />
                    <Text style={styles.title}>{user ? `Bem-vindo, ${user.nome}!` : 'Carregando...'}</Text>

                    {items.map(
                        (
                            { img, name, location, url, body },
                            index,
                        ) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => Linking.openURL(url)}
                                >
                                    <View style={styles.card}>
                                        <View style={styles.cardTop}>
                                            <Image
                                                alt=""
                                                resizeMode="cover"
                                                style={styles.cardImg}
                                                source={{ uri: img }} />
                                        </View>

                                        <View style={styles.cardBody}>
                                            <View style={styles.cardHeader}>
                                                <Text style={styles.cardTitle}>{name}</Text>
                                            </View>

                                            <View style={styles.cardHeader}>
                                                <Text style={styles.cardDesc}>{body}</Text>
                                            </View>

                                            <View style={styles.cardFooter}>
                                                <Text onPress={() => Linking.openURL(url)} style={styles.cardFooterText}>{location}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        },
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    /** Card */
    card: {
        borderRadius: 12,
        backgroundColor: 'white',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardTop: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    cardImg: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    cardBody: {
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#2d2d2d',
    },
    cardDesc: {
        fontSize: 18,
        color: '#444',
    },
    cardFooter: {
        paddingTop: 8,
        borderTopWidth: 1,
        borderColor: '#e9e9e9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardFooterText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1976d2',
    },
});