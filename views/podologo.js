import * as React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import MenuScreen from '../components/menu';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment'

const PodologoScreen = () => {
    async function GetItemLocalStorage(key) {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (e) {
            console.error('Failed to fetch the token from storage', e);
            return null;
        }
    }

    const [dataTable, setDataTable] = React.useState()

    // INICIO GET DE PODOLOGO
    React.useEffect(() => {
        fetchPodologo();
    }, []);

    async function fetchPodologo() {
        const myHeaders = new Headers();
        const token = await GetItemLocalStorage('token');

        if (!token) {
            console.error('Token is not available');
            return;
        }

        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("https://api-pi-senac.azurewebsites.net/podologo", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Podologos');
                }
                return response.json();
            })
            .then((data) => {
                setDataTable(data);
            })
            .catch((error) => console.error(error));
    }
    // FIM GET DE PODOLOGO

    return (
        <>
            <View style={{ height: 60 }}>
                <MenuScreen />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={dataTable}
                    renderItem={({ item }) =>
                        <View style={styles.table}>
                            <View style={styles.body}>
                                <View >
                                    <View style={styles.head}>
                                        <Text style={styles.headCell}>{item.nomeCompleto}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>CPF:</Text> {item.cpf}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>E-mail:</Text> {item.email}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>Telefone:</Text> {item.telefone}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>Data Nascimento:</Text> {moment(item.dataNascimento).format('DD/MM/YYYY')}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>Gênero:</Text> {item.genero}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>CEP:</Text> {item.cep}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={item => `${item.key}-${item.cpf}`}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
    },
    table: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#c2c2c2',
        marginBottom: 5
    },
    head: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        borderColor: '#c2c2c2',
        marginTop: 1

    },
    body: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        padding: 10,
        display: 'flex',
        flexDirection: 'colunm',
        justifyContent: 'space-around',
        width: '100%',
        width: '100%',
        marginVertical: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2'
    },
    headCell: {
        fontSize: 18
    },
    cell: {
        marginBottom: 2,
        fontSize: 16
    }
});

export default PodologoScreen;
