import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessScreen = ({ navigation }) => {
  if (!navigation) {
    return null; // This could cause the error if hooks are skipped
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Purchase Successful!</Text>
      <Text style={styles.redirect}>You will be redirected to the Home screen shortly.</Text>
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
    color: 'green',
    marginBottom: 20,
  },
  redirect: {
    fontSize: 16,
    color: '#666',
  },
});

export default SuccessScreen;