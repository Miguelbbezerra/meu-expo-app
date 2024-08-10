import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store'

const AddTable = ({ navigation, table, formDataTable, inputs }) => {

    const [formData, setFormData] = useState(formDataTable)

    function setValueFormOnChange(event, key) {
        const value = event.target.value
        const newFormData = { ...formData, [key]: value }
        setFormData(newFormData)
    }

    async function GetItemLocalStorage(key) {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (e) {
            console.error('Failed to fetch the token from storage', e);
            return null;
        }
    }

    const handleSubmit = async (table) => {
        try {
            const token = await GetItemLocalStorage('token')
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify(formData)
            const response = await fetch(`https://api-pi-senac.azurewebsites.net/${table}`, {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao salvar o paciente');
            }
            navigation.navigate('Pacientes')
        } catch (error) {
            alert(`${error.message}` || 'Erro ao salvar o paciente!');
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.form}>
                    {inputs.map((input, index) => (
                        <View key={index}>
                            <Text style={styles.label}>{input.label}</Text>
                            <TextInput
                                value={formData[input.key]}
                                onChange={(event) => setValueFormOnChange(event, input.key)}
                                style={styles.input}
                            />
                        </View>
                    ))}
                    <TouchableOpacity style={styles.button} onPress={() => handleSubmit(table)}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    form: {
        width: '90%',
    },
    label: {
        marginTop: 20,
        marginBottom: 5
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    button: {
        marginVertical: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    avatarContainer: {
        marginTop: 10,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default AddTable;