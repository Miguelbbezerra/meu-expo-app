import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { tailwind } from 'nativewind'; // Import the `tailwind` function

const AddPaciente = ({ navigation }) => {
    return (
        <View style={tailwind('flex-1 bg-white')}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Pacientes")}>
                <View>
                    <Text style={tailwind('text-blue-600 border border-blue-600 text-center rounded-md my-2 mx-4 p-2')}>
                        Voltar
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={tailwind('p-4 bg-gray-100 h-full justify-center')}>
                <Text style={tailwind('text-2xl font-bold text-center mb-6')}>Sign Up</Text>

                <Text style={tailwind('text-gray-700 mb-2')}>Email</Text>
                <TextInput
                    style={tailwind('bg-white p-2 border border-gray-300 rounded mb-4')}
                    placeholder="Enter your email"
                />

                <Text style={tailwind('text-gray-700 mb-2')}>Password</Text>
                <TextInput
                    style={tailwind('bg-white p-2 border border-gray-300 rounded mb-4')}
                    placeholder="Enter your password"
                    secureTextEntry
                />

                <Button title="Sign Up" onPress={() => alert('Signed Up')} />
            </View>
        </View>
    );
};

export default AddPaciente;
