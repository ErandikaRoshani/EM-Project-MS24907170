import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { ProgressContext } from '../components/ProgressContext';
import { ProgressBar } from 'react-native-paper'; // Make sure to install react-native-paper

const { width, height } = Dimensions.get('window');

// Define the path as an array of points
const pathPoints = [
  { x: 30, y: height - 400 },  // Starting point
  { x: 100, y: height - 500 }, // First challenge
  { x: 170, y: height - 600 }, // Second challenge
  { x: 300, y: height - 500 }, // Third challenge
  { x: 350, y: height - 400 },  // Goal
];

const ChallengeJourney = () => {
  const gameEngineRef = useRef(null);
  const { progress, level, updateProgress } = useContext(ProgressContext);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    // Update character's position based on the level (levels 1-5 correspond to pathPoints[0-4])
    setCurrentPosition(level - 1);
  }, [level]);

  const handleProgressUpdate = () => {
    const newProgress = Math.min(progress + 0.1, 1); // Increment progress by 10%
    updateProgress(newProgress);
  };

  // Calculate overall progress as a percentage
  const overallProgress = (level / pathPoints.length) * 100;

  return (
    <GameEngine
      ref={gameEngineRef}
      entities={{ player: { position: pathPoints[currentPosition], size: 50 } }}
    >
      <View style={styles.mapContainer}>
        <Text style={styles.title}>Challenge Journey</Text>

        {/* Progress Spinner */}
        <ProgressBar 
          progress={overallProgress / 100} 
          style={styles.progressBar} 
          color="#6200ee" // Customize color as needed
        />
        <Text style={styles.overallProgressText}>Overall Progress: {overallProgress.toFixed(0)}%</Text>

        {/* Character */}
        <Image
          source={require('../images/character.jpg')} // Replace with your character image
          style={[styles.character, { left: pathPoints[currentPosition].x, top: pathPoints[currentPosition].y }]}
        />

        {/* Path points (optional visual representation) */}
        {pathPoints.map((point, index) => (
          <View key={index} style={[styles.pathPoint, { left: point.x, top: point.y }]} />
        ))}

        <Text style={styles.goal}>Goal Reached: {currentPosition === pathPoints.length - 1 ? 'YES' : 'NO'}</Text>
      </View>

      {/* Handle tap event for updating progress */}
      <View style={styles.tapArea} onTouchEnd={handleProgressUpdate} />
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: height - 150, // Adjust height to reduce empty space
    justifyContent: 'center',
  },
  instructions: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    position: 'absolute',
    top: 20,
    left: 80,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  overallProgressText: {
    position: 'absolute',
    top: 130,
    left: 20,
    fontWeight: 'bold',
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
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  goal: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 18,
    fontWeight: 'bold',
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
