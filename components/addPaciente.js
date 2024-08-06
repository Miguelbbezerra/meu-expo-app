import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AddPaciente = () => {

    const [formData, setFormData] = useState({
        nomeCompleto: '',
        genero: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        cidade: '',
        rua: '',
        numero: '',
        bairro: ''
    })

    function setValueFormOnChange(event, key) {
        const value = event.target.value
        const newFormData = { ...formData, [key]: value }
        setFormData(newFormData)
    }

    const handleSubmit = () => {

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        value={formData.nomeCompleto}
                        onChange={(event) => setValueFormOnChange(event, 'nomeCompleto')}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Gênero</Text>
                    <TextInput
                        value={formData.genero}
                        onChange={(event) => setValueFormOnChange(event, 'genero')}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Data de Nascimento</Text>
                    <TextInput
                        value={formData.dataNascimento}
                        onChange={(event) => setValueFormOnChange(event, 'dataNascimento')}
                        style={styles.input}
                        placeholder="__/__/____"
                    />
                    <Text style={styles.label}>CPF</Text>
                    <TextInput
                        value={formData.cpf}
                        onChange={(event) => setValueFormOnChange(event, 'cpf')}
                        style={styles.input}
                        placeholder="___.___.___-__"
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={formData.email}
                        onChange={(event) => setValueFormOnChange(event, 'email')}
                        style={styles.input}
                        placeholder="example@example.com.br"
                    />
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.telefone}
                        onChange={(event) => setValueFormOnChange(event, 'telefone')}
                        placeholder="(__) _____-____"
                    />
                    <Text style={styles.label}>CEP</Text>
                    <TextInput
                        value={formData.cep}
                        onChange={(event) => setValueFormOnChange(event, 'cep')}
                        placeholder="_____-___"
                        style={styles.input}
                    />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '49%' }}>
                            <Text style={styles.label}>Cidade</Text>
                            <TextInput
                                value={formData.cidade}
                                onChange={(event) => setValueFormOnChange(event, 'cidade')}
                                style={styles.input}
                            />
                        </View>
                        <View style={{ width: '49%' }}>
                            <Text style={styles.label}>Rua</Text>
                            <TextInput
                                value={formData.rua}
                                onChange={(event) => setValueFormOnChange(event, 'rua')}
                                style={styles.input}
                            />

                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '49%' }}>
                            <Text style={styles.label}>Numero</Text>
                            <TextInput
                                value={formData.numero}
                                onChange={(event) => setValueFormOnChange(event, 'numero')}
                                style={styles.input}
                            />
                        </View>
                        <View style={{ width: '49%' }}>
                            <Text style={styles.label}>Bairro</Text>
                            <TextInput
                                value={formData.bairro}
                                onChange={(event) => setValueFormOnChange(event, 'bairro')}
                                style={styles.input}
                            />

                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                        <Text style={styles.buttonText}>Change password</Text>
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

export default AddPaciente;