import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext';

const API_URL = 'https://api.webflow.com/v2/sites/67b3895e80c9f1633cc77720/products';
const API_KEY = '24041412307977360bc577b126c9f1b8a4b60ee9145baa4df60dbb991731aa73';

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const { addToWishlist } = useWishlist(); // Haal de functie op uit de context

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'accept-version': '1.0.0',
          },
        });

        const foundProduct = response.data.items.find(
          (item) => item.product.id === productId
        );

        if (foundProduct) {
          const formattedProduct = {
            id: foundProduct.product.id,
            name: foundProduct.product.fieldData.name,
            description: foundProduct.product.fieldData.description || 'No description available.',
            price: foundProduct.skus[0]?.fieldData.price?.value || 0,
            imageUrl: foundProduct.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/300',
          };
          setProduct(formattedProduct);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product:', err.response?.data || err.message);
        setError('An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToWishlist = () => {
    if (product) {
      console.log('Adding to wishlist:', product); // Debug log
      addToWishlist(product);
      Alert.alert('Added to Wishlist', `${product.name} has been added to your wishlist.`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Button title="Add to Wishlist" onPress={handleAddToWishlist} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ProductDetailsScreen;