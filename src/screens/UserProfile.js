import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, db } from '../../firebaseConfig'; // Import Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const userDoc = await getDoc(doc(db, 'users', userId)); // Get user document from Firestore

        if (userDoc.exists()) {
          setUserData(userDoc.data()); // Set user data to state
        } else {
          console.log('No such user!');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  // If userData is not loaded yet, show a loading indicator
  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#155724" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default UserProfile;
