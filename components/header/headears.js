import * as SecureStore from 'expo-secure-store'
export const getHeaders = async () => {
    const token = await SecureStore.getItemAsync('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    return myHeaders
};