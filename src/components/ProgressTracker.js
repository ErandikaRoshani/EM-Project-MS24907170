import React from 'react';
import { View, Text } from 'react-native';
import { Circle } from 'react-native-progress';

const ProgressTracker = ({ progress }) => {
  return (
    <View style={{ alignItems: 'center', margin: 20 }}>
      <Circle size={120} progress={progress} showsText={true} />
      <Text>Challenge Progress: {(progress * 100).toFixed(2)}%</Text>
    </View>
  );
};

export default ProgressTracker;
