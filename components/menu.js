import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

const tabs = [{ name: 'Home'}, { name: 'Podologo' }, { name: 'Log Out' }];

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
                  <Text style={[styles.text, isActive && { color: '#263eb5' }]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1976d2',
  },
});
