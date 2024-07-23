import { View, Text, StyleSheet, FlatList } from "react-native"
import MenuScreen from '../components/menu';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import moment from 'moment'

export const PacienteScreen = () => {
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

    // INICIO GET DE PACIENTE
    React.useEffect(() => {
        fetchPaciente();
    }, []);

    async function fetchPaciente() {
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

        fetch("https://api-pi-senac.azurewebsites.net/paciente", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Pacientes');
                }
                return response.json();
            })
            .then((data) => {
                setDataTable(data);
            })
            .catch((error) => console.error(error));
    }
    // FIM GET DE PACIENTE

    return (
        <View >
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
                    keyExtractor={item => item.key}
                />
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
    },
    headCell: {
        fontSize: 18
    },
    cell: {
        marginBottom: 2,
        fontSize: 16
    }
});

export default PacienteScreen