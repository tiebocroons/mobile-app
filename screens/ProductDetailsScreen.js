import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, Alert, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext';

const API_URL = 'https://api.webflow.com/v2/sites/67b3895e80c9f1633cc77720/products';
const API_KEY = '24041412307977360bc577b126c9f1b8a4b60ee9145baa4df60dbb991731aa73';

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage quantity

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
      const productWithQuantity = { ...product, quantity }; // Add quantity to the product object
      addToWishlist(productWithQuantity);
      Alert.alert('Added to Wishlist', `${product.name} (x${quantity}) has been added to your wishlist.`);
    }
  };

  const handleQuantityChange = (value) => {
    console.log('Raw input value:', value); // Debugging log

    // Allow empty input temporarily
    if (value === '') {
      setQuantity(''); // Set quantity to an empty string to allow user input
      return;
    }

    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setQuantity(parsedValue); // Update the quantity state
    } else {
      setQuantity(1); // Default to 1 if the input is invalid
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
      <Text style={styles.price}>
        Price: ${product?.price ? product.price.toFixed(2) : 'N/A'}
      </Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          value={quantity.toString()} // Convert quantity to a string
          onChangeText={handleQuantityChange} // Update quantity on input change
        />
      </View>
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
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 50,
    textAlign: 'center',
  },
});

export default ProductDetailsScreen;