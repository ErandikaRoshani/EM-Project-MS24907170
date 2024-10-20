import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChallengeScreen from '../screens/ChallengeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ChallengeJourney from '../screens/ChallengeJourney';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Challenge">
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="ChallengeJourney" component={ChallengeJourney} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
