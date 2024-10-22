import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BadgeComponent = ({ badge }) => {
  return (
    <View style={styles.badgeContainer}>
      <Icon name={badge.icon} size={60} color={badge.earned ? '#FFD700' : '#d3d3d3'} />
      <Text style={styles.badgeName}>{badge.name}</Text>
      <Text style={styles.badgeDescription}>{badge.description}</Text>
      <Text style={styles.badgeStatus}>{badge.earned ? 'Earned' : 'Not Earned'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 200, // Fixed width
    height: 180, // Fixed height to allow space for text
  },
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgeDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeStatus: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default BadgeComponent;
