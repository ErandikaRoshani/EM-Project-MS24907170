import React, { useEffect, useRef, useState,useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { ProgressContext } from '../components/ProgressContext';

const { width, height } = Dimensions.get('window');

// Define the path as an array of points
const pathPoints = [
    { x: 30, y: height - 400 },  // Starting point (moved left by 20px)
    { x: 100, y: height - 500 }, // First challenge (moved left by 20px)
    { x: 170, y: height - 600 }, // Second challenge (moved left by 20px)
    { x: 300, y: height - 500 }, // Third challenge (moved left by 20px)
    { x: 350, y: height - 400 },  // Goal (moved left by 20px)
  ];
  
  

const ChallengeJourney = () => {
  const gameEngineRef = useRef(null);
  const { progress, level, updateProgress } = useContext(ProgressContext);  // Access global progress
  const [currentPosition, setCurrentPosition] = useState(0);                // Character position

  useEffect(() => {
    // Update character's position based on the level (levels 1-5 correspond to pathPoints[0-4])
    setCurrentPosition(level - 1);
  }, [level]);

  const handleProgressUpdate = () => {
    const newProgress = Math.min(progress + 0.1, 1); // Increment progress by 10%
    updateProgress(newProgress);
  };

  return (
    <GameEngine
    //   style={styles.container}
      ref={gameEngineRef}
      entities={{ player: { position: pathPoints[currentPosition], size: 50 } }}
    >
      <View style={styles.mapContainer}>
        <Text style={styles.instructions}>Tap to Update Progress</Text>
        <Text style={styles.progress}>Current Progress: {(progress * 100).toFixed(0)}%</Text>

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: height - 150, // Adjust height to reduce empty space
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  instructions: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  progress: {
    position: 'absolute',
    top: 100,
    left: 20,
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
