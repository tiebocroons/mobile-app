import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, TextInput, Alert } from 'react-native';
import { fetchData } from '../apiClient';

const DetailsScreen = ({ route }) => {
  const { productId } = route.params; // Get the product ID from route parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchData('/sites/67b3895e80c9f1633cc77720/products');

        // Find the specific product based on the productId
        const foundProduct = data.items.find((item) => item.product.id === productId);

        if (foundProduct) {
          const formattedProduct = {
            id: foundProduct.product.id,
            name: foundProduct.product.fieldData.name,
            imageUrl: foundProduct.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/200',
            price: foundProduct.skus[0]?.fieldData.price?.value || 0,
            description: foundProduct.product.fieldData.description || 'No description available.',
          };
          setProduct(formattedProduct);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product:', err.message);
        setError('An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    // Add the product to the cart (you can adapt this to your cart logic)
    Alert.alert('Added to Cart', `${quantity} x ${product.name} has been added to your cart.`);
    console.log('Added to cart:', { product, quantity });
  };

  const handleQuantityChange = (text) => {
    const parsedQuantity = parseInt(text, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      setQuantity(parsedQuantity);
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

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product details are not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      {/* Quantity Input */}
      <Text style={styles.quantityLabel}>Quantity:</Text>
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={handleQuantityChange}
      />

      {/* Add to Cart Button */}
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 400,
    height: 400,
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
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  quantityInput: {
    width: 100,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;