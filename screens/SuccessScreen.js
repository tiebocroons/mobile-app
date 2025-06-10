import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const SuccessScreen = ({ navigation }) => {
  const [seconds, setSeconds] = useState(5); // Start with 5 seconds

  useFocusEffect(
    React.useCallback(() => {
      // Reset the countdown timer whenever the screen is focused
      setSeconds(5);

      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(timer); // Stop the timer when it reaches 0
            navigation.navigate('Home'); // Redirect to HomeScreen
            return 0;
          }
          return prevSeconds - 1; // Decrease the seconds
        });
      }, 1000); // Update every second

      return () => clearInterval(timer); // Cleanup the timer on unmount or when the screen loses focus
    }, [navigation])
  );

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