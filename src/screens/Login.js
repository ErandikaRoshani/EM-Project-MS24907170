import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here (e.g., authentication with Firebase)
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill out all fields.');
    } else {
      // You can validate and authenticate the user here
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('TabNavigation', { screen: 'Challenge' });
      // Navigate to Challenge after login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={styles.spacer} />

      {/* Register Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  spacer: {
    height: 20,
  },
  registerLink: {
    color: 'blue',            // Blue color to look like a link
    textAlign: 'center',
    textDecorationLine: 'underline',  // Underline the text to enhance the link effect
    marginTop: 10,
  },
});

export default LoginScreen;
