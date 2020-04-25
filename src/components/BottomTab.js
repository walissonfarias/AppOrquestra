import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

import IconHome from '../assets/icons/IconHome';
import IconEvents from '../assets/icons/IconEvents';
import IconSchedule from '../assets/icons/IconSchedule';
import IconOrchestra from '../assets/icons/IconOrchestra';

import News from '../pages/News';
import Events from '../pages/Events';
import Schedule from '../pages/Schedule';
import Orchestra from '../pages/Orchestra';

export default ({navigation, route}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const _response = await AsyncStorage.getItem('@user');
      const response = JSON.parse(_response);
      if (!response) {
        navigation.reset({routes: [{name: 'Login'}]});
      }

      // CRIAR VALIDAÇÃO DO TOKEN

      setUser(response);
    })();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({headerTitle: getHeaderTitle(route)});
  }, [navigation, route]);

  function getHeaderTitle(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    switch (routeName) {
      case 'Events':
        return 'Eventos';
      case 'Schedule':
        return 'Agenda';
      case 'Orchestra':
        return 'Orquestra';
      default:
        return 'Notícias';
    }
  }

  return (
    <>
      {user ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.black,
            tabStyle: {paddingVertical: 5, backgroundColor: colors.white},
          }}>
          <Tab.Screen
            name="News"
            component={News}
            options={{
              tabBarLabel: ({focused, color}) => {
                return (
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: focused
                        ? fontFamily.bold
                        : fontFamily.regular,
                      color,
                      fontSize: fontSize.mini,
                    }}>
                    {'Notícias'}
                  </Text>
                );
              },
              tabBarIcon: ({focused, color}) => {
                return (
                  <IconHome
                    color={color}
                    size={20}
                    type={focused ? 'fill' : 'outline'}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Events"
            component={Events}
            options={{
              tabBarLabel: ({focused, color}) => {
                return (
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: focused
                        ? fontFamily.bold
                        : fontFamily.regular,
                      color,
                      fontSize: fontSize.mini,
                    }}>
                    {'Eventos'}
                  </Text>
                );
              },
              tabBarIcon: ({focused, color}) => {
                return (
                  <IconEvents
                    color={color}
                    size={20}
                    type={focused ? 'fill' : 'outline'}
                  />
                );
              },
            }}
          />
          {user.token !== 'guest' ? (
            <Tab.Screen
              name="Schedule"
              component={Schedule}
              options={{
                tabBarLabel: ({focused, color}) => {
                  return (
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: focused
                          ? fontFamily.bold
                          : fontFamily.regular,
                        color,
                        fontSize: fontSize.mini,
                      }}>
                      {'Agenda'}
                    </Text>
                  );
                },
                tabBarIcon: ({focused, color}) => {
                  return (
                    <IconSchedule
                      color={color}
                      size={20}
                      type={focused ? 'fill' : 'outline'}
                    />
                  );
                },
              }}
            />
          ) : (
            <></>
          )}
          <Tab.Screen
            name="Orchestra"
            component={Orchestra}
            options={{
              tabBarLabel: ({focused, color}) => {
                return (
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: focused
                        ? fontFamily.bold
                        : fontFamily.regular,
                      color,
                      fontSize: fontSize.mini,
                    }}>
                    {'Orquestra'}
                  </Text>
                );
              },
              tabBarIcon: ({focused, color}) => {
                return (
                  <IconOrchestra
                    color={color}
                    size={20}
                    type={focused ? 'fill' : 'outline'}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <></>
      )}
    </>
  );
};
