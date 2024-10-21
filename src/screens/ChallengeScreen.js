import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { ProgressContext } from '../components/ProgressContext'; // Import the ProgressContext

const ChallengeScreen = () => {
  const { level, setLevel } = useContext(ProgressContext); // Access level and setLevel from context
  const [gems, setGems] = useState(0);
  const [watchId, setWatchId] = useState(null);
  const [lastPosition, setLastPosition] = useState(null);

  const stepsPerMile = 2000; // Average steps per mile
  const metersPerMile = 1609.34; // Meters in a mile

  const [challenges, setChallenges] = useState([
    { level: 1, targetSteps: 1000, rewardGems: 10, isUnlocked: true, completed: false, completedSteps: 0, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
    { level: 2, targetSteps: 2000, rewardGems: 20, isUnlocked: false, completed: false, completedSteps: 0, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
    { level: 3, targetSteps: 3000, rewardGems: 30, isUnlocked: false, completed: false, completedSteps: 0, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
    { level: 4, targetSteps: 4000, rewardGems: 40, isUnlocked: false, completed: false, completedSteps: 0, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
    { level: 5, targetSteps: 5000, rewardGems: 50, isUnlocked: false, completed: false, completedSteps: 0, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
  ]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to track steps.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');

          const id = Geolocation.watchPosition(
            position => {
              if (lastPosition) {
                const distance = calculateDistance(lastPosition, position.coords);
                const steps = convertDistanceToSteps(distance);

                // Update GPS steps for the current challenge
                setChallenges(prevChallenges => {
                  const updatedChallenges = [...prevChallenges];
                  if (!updatedChallenges[level - 1].completed) { // Only update if the challenge is not completed
                    updatedChallenges[level - 1].gpsSteps += steps; // Increment GPS steps for the current challenge
                    updatedChallenges[level - 1].totalSteps = updatedChallenges[level - 1].gpsSteps + updatedChallenges[level - 1].manualSteps; // Update total steps
                  }
                  return updatedChallenges;
                });
              }
              setLastPosition(position.coords);
            },
            error => {
              console.error(error);
              Alert.alert("Error", "Unable to access GPS. Please check your settings.");
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 1, // Trigger updates when moving 1 meter
              interval: 10000,
              fastestInterval: 5000,
            }
          );

          setWatchId(id);
        } else {
          Alert.alert('Permission denied', 'Please enable location permissions in settings.');
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    requestLocationPermission();

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [lastPosition]);

  const calculateDistance = (lastPosition, currentPosition) => {
    const { latitude: lat1, longitude: lon1 } = lastPosition;
    const { latitude: lat2, longitude: lon2 } = currentPosition;

    const R = 6371000; // Radius of the Earth in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters

    return distance;
  };

  const convertDistanceToSteps = (distance) => {
    const miles = distance / metersPerMile; // Convert distance to miles
    const steps = miles * stepsPerMile; // Convert miles to steps
    return Math.round(steps); // Return the rounded number of steps
  };

  const handleCompleteChallenge = () => {
    const currentChallengeIndex = level - 1; // Use the level from context
    const currentChallenge = challenges[currentChallengeIndex];

    // Check if the current challenge is completed
    if (currentChallenge.totalSteps >= currentChallenge.targetSteps) {
      setGems(gems + currentChallenge.rewardGems);

      // Update completed status and steps for the current challenge
      setChallenges(prevChallenges => {
        const updatedChallenges = [...prevChallenges];
        updatedChallenges[currentChallengeIndex].completed = true; // Mark as completed
        updatedChallenges[currentChallengeIndex].completedSteps = currentChallenge.totalSteps; // Save completed steps

        // Unlock the next challenge if it exists
        if (level < challenges.length) {
          updatedChallenges[level].isUnlocked = true; // Unlock the next challenge
        }
        return updatedChallenges;
      });

      // Move to the next challenge
      setLevel(prevLevel => Math.min(prevLevel + 1, challenges.length)); // Ensure we do not exceed the total number of challenges
    } else {
      Alert.alert('Not enough steps to complete the challenge!');
    }
  };

  const renderChallenge = (challenge) => {
    const isCurrentChallenge = challenge.level === level; // Compare with the level from context

    return (
      <View key={challenge.level} style={styles.challengeContainer}>
        <Text style={styles.levelText}>Level {challenge.level}</Text>
        {challenge.isUnlocked ? (
          <>
            <Text style={styles.targetText}>Target Steps: {challenge.targetSteps}</Text>
            <Text style={styles.stepsText}>Total Steps: {challenge.totalSteps}</Text>
            <Text style={styles.stepsText}>GPS Steps: {challenge.gpsSteps}</Text>
            <Text style={styles.stepsText}>Manual Steps: {challenge.manualSteps}</Text>
            <Text style={styles.rewardText}>Reward: {challenge.rewardGems} gems</Text>
            <Text style={styles.completedText}>Completed Steps: {challenge.completedSteps}</Text>

            {/* Disable completed challenges and show "Completed" label */}
            {challenge.completed ? (
              <Text style={styles.completedText}>Completed</Text>
            ) : (
              <>
                {/* Show input and button only for the current challenge */}
                {isCurrentChallenge && (
                  <>
                    <TextInput
                      placeholder="Add Manual Steps"
                      keyboardType="numeric"
                      onChangeText={(value) => {
                        setChallenges(prevChallenges => {
                          const updatedChallenges = [...prevChallenges];
                          if (!updatedChallenges[level - 1].completed) { // Update only if the challenge is not completed
                            updatedChallenges[level - 1].manualSteps = Number(value); // Update manual steps for the current challenge
                            updatedChallenges[level - 1].totalSteps = updatedChallenges[level - 1].gpsSteps + updatedChallenges[level - 1].manualSteps; // Update total steps
                          }
                          return updatedChallenges;
                        });
                      }}
                      style={styles.input}
                    />
                    <Button title="Complete Challenge" onPress={handleCompleteChallenge} />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Text style={styles.lockedText}>Challenge Locked</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Step Challenges</Text>
      {challenges.map(renderChallenge)}
      <Text style={styles.gemsText}>Total Gems: {gems}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  challengeContainer: {
    marginBottom: 20,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007BFF',
  },
  targetText: {
    fontSize: 16,
    color: '#555',
  },
  stepsText: {
    fontSize: 16,
    color: '#333',
  },
  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  completedText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#28a745', // Color for completed steps
  },
  lockedText: {
    fontSize: 16,
    color: '#d9534f',
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  gemsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
});

export default ChallengeScreen;
