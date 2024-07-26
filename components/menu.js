import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

const tabs = [{ name: 'Home', icon: <Icon source='home' size={18} /> },
{ name: 'Podologos', icon: <Icon source='doctor' size={18} /> },
{ name: 'Pacientes', icon: <Icon source='account-group' size={18} /> },
{ name: 'Agendamentos', icon: <Icon source='calendar' size={18} /> },
{ name: 'Perfil', icon: <Icon source='account' size={18} /> }];

export default function MenuScreen() {
  const [value, setValue] = React.useState(0);
  const route = useRoute();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Encontrar o índice da rota atual
      const currentIndex = tabs.findIndex(tab => tab.name === route.name);
      if (currentIndex !== -1) {
        setValue(currentIndex);
      }
    }, [route.name])
  );

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>
      {tabs.map((item, index) => {
        const isActive = index === value;

        return (
          <View key={item.name} style={{ flex: 1 }}>

            <TouchableWithoutFeedback
              onPress={() => {
                if (route.name !== item.name) {
                  navigation.navigate(item.name);
                }
              }}>
              <View
                style={[
                  styles.item,
                  isActive && { backgroundColor: '#e0e7ff' },
                ]}>
                <Text style={{ color: '#263eb5'}}>
                  {item.icon}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    maxHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: 6,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1976d2',
  },
});
