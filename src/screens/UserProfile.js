import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UserProfile = () => {
  // Sample user data
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    contactNo: "+1234567890",
    gems: 150,
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        {/* Profile Icon */}
        <View style={styles.profileIconContainer}>
          <Icon name="account" size={100} color={"#fff"} />
        </View>

        {/* User Information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.userContact}>{userData.contactNo}</Text>
          <Text style={styles.userGems}>Gems: {userData.gems}</Text>
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
  },
  profileCard: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
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
    backgroundColor: '#6200ee', // Background color for the icon
    padding: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  userContact: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  userGems: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 10,
  },
});

export default UserProfile;
