import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import colors from '../constants/colors';

import IconHome from '../assets/icons/IconHome';
import IconEvents from '../assets/icons/IconEvents';
import IconSchedule from '../assets/icons/IconSchedule';
import IconOrchestra from '../assets/icons/IconOrchestra';

import News from '../pages/News';
import Events from '../pages/Events';
import Schedule from '../pages/Schedule';
import Orchestra from '../pages/Orchestra';

export default ({navigation, route}) => {
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
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.black,
        tabStyle: {paddingVertical: 5, backgroundColor: colors.white},
      }}>
      {/* <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: ({focused, color}) => {
            return (
              <Text
                style={{
                  fontWeight: focused ? 'bold' : 'normal',
                  color,
                  fontSize: 12,
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
      /> */}
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: ({focused, color}) => {
            return (
              <Text
                style={{
                  fontWeight: focused ? 'bold' : 'normal',
                  color,
                  fontSize: 12,
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
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarLabel: ({focused, color}) => {
            return (
              <Text
                style={{
                  fontWeight: focused ? 'bold' : 'normal',
                  color,
                  fontSize: 12,
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
      <Tab.Screen
        name="Orchestra"
        component={Orchestra}
        options={{
          tabBarLabel: ({focused, color}) => {
            return (
              <Text
                style={{
                  fontWeight: focused ? 'bold' : 'normal',
                  color,
                  fontSize: 12,
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
  );
};
