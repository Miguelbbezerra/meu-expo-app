import { View, Text, StyleSheet, FlatList } from "react-native"
import MenuScreen from '../components/menu';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import moment from 'moment'

export const AgendamentoScreen = () => {

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

    // INICIO GET DE AGENDAMENTO
    React.useEffect(() => {
        fetchAgendamento();
    }, []);

    async function fetchAgendamento() {
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

        fetch("https://api-pi-senac.azurewebsites.net/agendamento", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Agendamentos');
                }
                return response.json();
            })
            .then((data) => {
                setDataTable(data);
            })
            .catch((error) => console.error(error));
    }
    // FIM GET DE AGENDAMENTO
    
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
                                        <Text style={styles.headCell}>{new Date(item.dataHora).toLocaleDateString('pt-br')} {new Date(item.dataHora).toLocaleTimeString('pt-br')}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>Podólogo(a):</Text> {item.podologo.nomeCompleto}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>Paciente:</Text> {item.paciente.nomeCompleto}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>Descrição:</Text> {item.descricao}</Text>
                                        <Text style={styles.cell}><Text style={{ fontWeight: 'bold' }}>Situação:</Text> {item.situacao}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={item => `${item.key}-${item.dataHora}`}
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
        marginBottom: 5
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
export default AgendamentoScreen