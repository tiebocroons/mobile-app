import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import ProductCard from '../components/ProductCard';

const products = [
  {
    title: 'Product 1',
    description: 'This is the description for product 1.',
    price: 10.0,
    image: 'https://picsum.photos/100',
  },
  {
    title: 'Product 2',
    description: 'This is the description for product 2.',
    price: 20.0,
    image: 'https://picsum.photos/100',
  },
  {
    title: 'Product 3',
    description: 'This is the description for product 3.',
    price: 30.0,
    image: 'https://picsum.photos/100',
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onPress={() => navigation.navigate('ProductDetails', { product })}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    paddingTop: 20,
  },
});

export default HomeScreen;