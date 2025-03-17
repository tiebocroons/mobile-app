import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const API_URL = 'https://api.webflow.com/v2/sites/67b3895e80c9f1633cc77720/products';
const API_KEY = '27786b30638667e363a560f16ef4f49a5da86f2d0d5181e6cf49df9feff1aa8a';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'accept-version': '1.0.0',
          },
        });
        setProducts(response.data.items); // Assuming the products are in the 'items' array
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('Products not found.');
        } else {
          setError('An error occurred.');
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onPress={() => navigation.navigate('ProductDetails', { productId: product._id })}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;