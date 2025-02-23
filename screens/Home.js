import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Button } from 'react-native';
import ProductCard from '../components/ProductCart';

const products = [
  {
    name: 'Product 1',
    description: 'This is the description for product 1.',
    image: 'https://picsum.photos/100',
  },
  {
    name: 'Product 2',
    description: 'This is the description for product 2.',
    image: 'https://picsum.photos/100',
  },
  {
    name: 'Product 3',
    description: 'This is the description for product 3.',
    image: 'https://picsum.photos/100',
  },
];

const Home = ({ navigation }) => {
  const exampleProduct = {
    name: 'Example Product',
    description: 'This is an example product description.',
    image: 'https://picsum.photos/100',
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('ProductDetails', { product })}>
            <ProductCard product={product} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button
        title="Go to Product Details"
        onPress={() => navigation.navigate('ProductDetails', { product: exampleProduct })}
      />
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
    paddingTop: 20, // Add padding to the top of the ScrollView content
  },
});

export default Home;