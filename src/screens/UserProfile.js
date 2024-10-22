import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../firebaseConfig'; // Import Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { signOut } from 'firebase/auth'; // Firebase signOut function
import BadgeComponent from '../components/Badge'; // Import the BadgeComponent
import { badges } from '../data/BadgeData'; // Import badge data

const UserProfile = ({ navigation }) => {
  const [userData, setUserData] = useState(null); // State to hold user data
  const [userBadges, setUserBadges] = useState(badges); // State to hold user badges

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const userDoc = await getDoc(doc(db, 'users', userId)); // Get user document from Firestore

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data); // Set user data to state

          // Unlock badges based on user data
          unlockBadges(data);
        } else {
          console.log('No such user!');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const unlockBadges = (data) => {
    // Count the number of completed challenges
    const completedChallengesCount = data.challenges.filter(challenge => challenge.completed).length;
  
    const updatedBadges = userBadges.map(badge => {
      let earned = badge.earned;
  
      // Check criteria for unlocking each badge
      if (badge.criteria.gems && data.gems >= badge.criteria.gems) {
        earned = true;
      }
      if (badge.criteria.steps && data.totalSteps >= badge.criteria.steps) {
        earned = true;
      }
      if (badge.criteria.completedChallenges && completedChallengesCount >= badge.criteria.completedChallenges) {
        earned = true;
      }
  
      return { ...badge, earned }; // Return updated badge
    });
  
    setUserBadges(updatedBadges); // Update badges state
  };
  

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Successfully logged out, navigate to login screen
        navigation.replace('Login'); // Redirect to Login screen after logout
      })
      .catch((error) => {
        Alert.alert('Logout Failed', error.message);
      });
  };

  // If userData is not loaded yet, show a loading indicator
  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#155724" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Profile</Text>
  
      {/* Profile Card */}
      <View style={styles.profileCard}>
        {/* Profile Icon */}
        <View style={styles.profileIconContainer}>
          <Icon name="account" size={100} color={"#fff"} />
        </View>
  
        {/* User Information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{userData.name}</Text>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#155724" />
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="phone" size={20} color="#155724" />
            <Text style={styles.userContact}>{userData.contactNo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="diamond" size={20} color="#155724" />
            <Text style={styles.userGems}>Gems: {userData.gems}</Text>
          </View>
        </View>
      </View>
  
      {/* Badges Section */}
      <View style={styles.badgesSection}>
        <Text style={styles.badgesHeader}>Your Badges</Text>
        <View style={styles.badgesContainer}>
          {userBadges.map((badge) => (
            <BadgeComponent key={badge.id} badge={badge} />
          ))}
        </View>
      </View>
  
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
  },
  profileCard: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#d4edda',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  profileIconContainer: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#155724', // Background color for the icon
    padding: 10,
  },
  userInfoContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#155724',
    marginLeft: 10,
  },
  userContact: {
    fontSize: 16,
    color: '#155724',
    marginLeft: 10,
  },
  userGems: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#155724',
    marginLeft: 10,
  },
  badgesSection: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  badgesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#155724',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfile;
