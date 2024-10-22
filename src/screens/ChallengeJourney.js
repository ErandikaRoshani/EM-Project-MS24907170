import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import {useProgressContext} from '../components/ProgressContext';
import { ProgressBar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

// Define the path as an array of points
const pathPoints = [
  { x: 30, y: height - 400 },  // Starting point (Level 1)
  { x: 100, y: height - 500 }, // First challenge (Level 2)
  { x: 170, y: height - 600 }, // Second challenge (Level 3)
  { x: 300, y: height - 500 }, // Third challenge (Level 4)
  { x: 350, y: height - 400 }, // Goal (Level 5)
];

const ChallengeJourney = () => {
  const gameEngineRef = useRef(null);
  const { progress, level, updateProgress } = useProgressContext();
  const [currentPosition, setCurrentPosition] = useState(0);
  const animatedValue = useRef(new Animated.ValueXY(pathPoints[0])).current;

  useEffect(() => {

    const newPositionIndex = level > 1 ? level - 2 : 0; // Position below the current level

    const newPoint = pathPoints[newPositionIndex];


    // Move the character to the completed level point only when level is completed
    if (level > 1 && level - 1 <= pathPoints.length) {
      Animated.timing(animatedValue, {
        toValue: { x: newPoint.x, y: newPoint.y },
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }

    setCurrentPosition(newPositionIndex);
  }, [animatedValue, level]);


  const overallProgress = (level - 1) * 20; // Each level completion is 20%

  return (
    <GameEngine ref={gameEngineRef} style={styles.container}>
      <View style={styles.mapContainer}>
        <Text style={styles.title}>Challenge Journey</Text>

        {/* Progress Bar */}
        <ProgressBar
          progress={overallProgress / 100}
          style={styles.progressBar}
          color="#28a745"
        />
        <Text style={styles.overallProgressText}>Overall Progress: {overallProgress.toFixed(0)}%</Text>

        {/* Animated Character */}
        <Animated.Image
          source={require('../images/character.jpg')} // Replace with your character image
          style={[styles.character, animatedValue.getLayout()]} // Use animatedValue for positioning
        />

        {/* Path points */}
        {pathPoints.map((point, index) => (
          <View key={index} style={[styles.pathPoint, { left: point.x, top: point.y }]} />
        ))}

        <Text style={styles.goal}>
          Goal Reached: {currentPosition === pathPoints.length - 1 ? '✅ YES' : '❌ NO'}
        </Text>
      </View>
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: height - 70,
    justifyContent: 'center',
    backgroundColor: '#fff', // White background
  },
  title: {
    position: 'absolute',
    top: 20,
    left: 80,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  overallProgressText: {
    position: 'absolute',
    top: 100,
    left: 100,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#28a745',
  },
  progressBar: {
    position: 'absolute',
    top: 150,
    left: 20,
    width: '90%',
  },
  character: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  pathPoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  goal: {
    position: 'absolute',
    bottom: 40,
    left: 85,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tapArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ChallengeJourney;
