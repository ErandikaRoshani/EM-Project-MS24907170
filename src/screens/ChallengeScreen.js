import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressTracker from '../components/ProgressTracker';
import { saveProgressOffline, getOfflineProgress } from '../services/OfflineService';
import { ProgressContext } from '../components/ProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const challengesData = [
  { id: 1, goal: 'Run 3 miles', progress: 0, unlocked: true },
  { id: 2, goal: 'Complete 10,000 steps', progress: 0, unlocked: false },
  { id: 3, goal: 'Drink 8 glasses of water', progress: 0, unlocked: false },
  { id: 4, goal: 'Do 30 minutes of yoga', progress: 0, unlocked: false },
  { id: 5, goal: 'Complete 5km run', progress: 0, unlocked: false },
];

const ChallengeScreen = ({ navigation }) => {
  const [challenges, setChallenges] = useState(challengesData);
  const [streak, setStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [badges, setBadges] = useState([]);
  const [items, setItems] = useState([]); // Collected items

  const { progress, level, updateProgress, setLevel } = useContext(ProgressContext); // Access progress and level

  useEffect(() => {
    // Load saved progress and streak on initial render
    const loadProgress = async () => {
      try {
        const data = await getOfflineProgress('currentChallenge');
        if (data) {
          updateProgress(data.progress);  // Update the global progress
          setStreak(data.streak);
          setLastActiveDate(data.lastActiveDate);
          setLevel(data.level);
          setBadges(data.badges || []);
          setItems(data.items || []); // Load collected items
          setChallenges(data.challenges || challengesData); // Load challenges progress
        }
      } catch (error) {
        console.error("Error loading progress:", error); // Log the error or handle it appropriately
      }
    };
  
    loadProgress();
  }, []);

  const handleUpdateProgress = (challengeId) => {
    const currentChallenge = challenges.find(c => c.id === challengeId);

    if (currentChallenge && currentChallenge.progress < 1) {
      const newProgress = Math.min(currentChallenge.progress + 0.2, 1); // Update progress
      const updatedChallenges = challenges.map(challenge => 
        challenge.id === challengeId ? { ...challenge, progress: newProgress } : challenge
      );
      setChallenges(updatedChallenges);

      // Update streak and date logic
      const today = new Date().toISOString().split('T')[0];
      if (lastActiveDate !== today) {
        setStreak(streak + 1);
        setLastActiveDate(today);
      }

      // Level up and unlock next challenge
      if (newProgress >= 1 && challengeId < 5) {
        setLevel(level + 1);  // Advance to next level
        const nextChallenges = updatedChallenges.map(challenge =>
          challenge.id === challengeId + 1 ? { ...challenge, unlocked: true } : challenge
        );
        setChallenges(nextChallenges);
        setBadges([...badges, `Level ${level + 1} Completed`]); // Add badge for leveling up
        setItems([...items, `Gem Collected from Level ${level + 1}`]); // Add collected item
      }

      const updatedData = {
        challenges: updatedChallenges,
        streak,
        lastActiveDate: today,
        level,
        badges,
        items,
      };
      saveProgressOffline('currentChallenge', updatedData);
    } else if (challengeId === 5) {
      Alert.alert('Congratulations!', 'All challenges completed!');
    }
  };

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'Local storage has been cleared.');
    } catch (error) {
      console.error('Error clearing local storage:', error);
      Alert.alert('Error', 'There was an error clearing local storage.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Challenge Progress</Text>

      {/* Challenge List */}
      <FlatList
        data={challenges}
        renderItem={({ item }) => (
          <View style={styles.challengeContainer}>
            <Text style={styles.challengeTitle}>{item.goal}</Text>
            {item.unlocked ? (
              <>
                <ProgressTracker progress={item.progress} />
                <Button title="Update Progress" onPress={() => handleUpdateProgress(item.id)} />
              </>
            ) : (
              <Text style={styles.lockedText}>Locked</Text>
            )}
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <Text>Current Level: {level}</Text>
      <Text>Collected Items: {items.join(', ')}</Text>

      <Button title="Play Challenge Journey" onPress={() => navigation.navigate('ChallengeJourney')} />
      <Button title="Clear Local Storage" onPress={clearLocalStorage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  challengeContainer: {
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lockedText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ChallengeScreen;
