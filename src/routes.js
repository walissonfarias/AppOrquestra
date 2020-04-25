import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import colors from './constants/colors';
import fontFamily from './constants/fontFamily';

import BottomTab from './components/BottomTab';
import SettingsButtonHeader from './components/SettingsButtonHeader';

import Login from './pages/Login';
import SignIn from './pages/SignIn';
import ViewNews from './pages/ViewNews';
import ViewEvent from './pages/ViewEvent';
import Settings from './pages/Settings';

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.primary,
          headerStyle: {backgroundColor: colors.white},
          headerTitleStyle: {fontFamily: fontFamily.medium},
        }}>
        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={({navigation}) => ({
            headerLeft: null,
            headerRight: () => <SettingsButtonHeader navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ViewNews"
          component={ViewNews}
          options={{title: 'Notícia'}}
        />
        <Stack.Screen
          name="ViewEvent"
          component={ViewEvent}
          options={{title: 'Evento'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Ajustes'}}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name={'SignIn'}
          component={SignIn}
          options={{
            headerTitle: 'Cadastro',
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
