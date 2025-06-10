import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessScreen = ({ navigation }) => {
  const [seconds, setSeconds] = useState(5); // Start with 5 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer); // Stop the timer when it reaches 0
          return 0;
        }
        return prevSeconds - 1; // Decrease the seconds
      });
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, []);

  // Separate navigation logic into another `useEffect`
  useEffect(() => {
    if (seconds === 0) {
      navigation.navigate('Home'); // Redirect to Home screen
    }
  }, [seconds, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Purchase Successful!</Text>
      <Text style={styles.redirect}>You will be redirected in {seconds} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
  redirect: {
    fontSize: 24,
    marginBottom: 20,
    color: 'grey',
  },
});

export default SuccessScreen;