/**
 * Ứng dụng Quản lý Thư viện - Đề số 1
 * React Native CLI + React Navigation + AsyncStorage
 */
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {BooksProvider} from './src/context/BooksContext';
import BookListScreen from './src/screens/BookListScreen';
import BookFormScreen from './src/screens/BookFormScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import {colors} from './src/theme/colors';

type RootStackParamList = {
  BookList: undefined;
  BookForm: {id?: string} | undefined;
  BookDetail: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <BooksProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: colors.primary},
              headerTintColor: colors.white,
              headerTitleStyle: {fontWeight: '700'},
            }}>
            <Stack.Screen
              name="BookList"
              component={BookListScreen}
              options={{title: 'Quản lý Thư viện'}}
            />
            <Stack.Screen
              name="BookForm"
              component={BookFormScreen}
              options={({route}) => ({
                title: route.params?.id ? 'Sửa sách' : 'Thêm sách',
              })}
            />
            <Stack.Screen
              name="BookDetail"
              component={BookDetailScreen}
              options={{title: 'Chi tiết sách'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BooksProvider>
    </SafeAreaProvider>
  );
}

export default App;
