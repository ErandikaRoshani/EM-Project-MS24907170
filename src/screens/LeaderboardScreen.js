import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getOfflineProgress } from '../services/OfflineService';

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Mock leaderboard data
    const mockData = [
      { id: '1', name: 'User 1', score: 100, streak: 5, level: 2, badges: ['Level 2 Achieved!'] },
      { id: '2', name: 'User 2', score: 80, streak: 3, level: 1, badges: [] },
      { id: '3', name: 'User 3', score: 70, streak: 1, level: 3, badges: ['Level 3 Achieved!'] },
    ];

    // Load progress data from local storage
    getOfflineProgress('currentChallenge').then((data) => {
      if (data) {
        // Update leaderboard based on challenge progress, streak, levels, and badges
        const updatedData = mockData.map((user) => ({
          ...user,
          score: data.progress * 100, // Using progress as score
          streak: data.streak, // Add user streak
          level: data.level, // Add user level
          badges: data.badges || [], // Add user badges
        }));
        setLeaderboardData(updatedData);
      } else {
        setLeaderboardData(mockData);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>Score: {item.score}</Text>
            <Text style={styles.streak}>Streak: {item.streak} days</Text>
            <Text style={styles.level}>Level: {item.level}</Text>
            <Text style={styles.badges}>Badges: {item.badges.join(', ')}</Text>
          </View>
        )}
      />
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
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  streak: {
    fontSize: 16,
  },
  level: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badges: {
    fontSize: 14,
    color: 'green',
  },
});

export default LeaderboardScreen;
