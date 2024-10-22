import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChallengeScreen from '../screens/ChallengeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ChallengeJourney from '../screens/ChallengeJourney';
import UserProfile from '../screens/UserProfile';
import {ProgressProvider} from '../components/ProgressContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <ProgressProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'rgb(0, 110, 0)',
        }}>
        <Tab.Screen
          name="Challenge"
          component={ChallengeScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Icon name="walk" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Icon name="account-group" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="ChallengeJourney"
          component={ChallengeJourney}
          options={{
            tabBarIcon: ({color, size}) => {
              return (
                <Icon name="map-marker-radius" size={size} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Icon name="account" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </ProgressProvider>
  );
};

export default TabNavigator;
