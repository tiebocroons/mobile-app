import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'https://api.webflow.com/v2/sites/67b3895e80c9f1633cc77720/products';
const API_KEY = '24041412307977360bc577b126c9f1b8a4b60ee9145baa4df60dbb991731aa73';

const DetailsScreen = ({ route }) => {
  const { productId } = route.params; // Haal het product-ID op uit de parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Standaard hoeveelheid is 1

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'accept-version': '1.0.0',
          },
        });

        // Zoek het specifieke product op basis van het productId
        const foundProduct = response.data.items.find(
          (item) => item.product.id === productId
        );

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

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error.response?.data || error.message);
        setError('An error occurred while fetching the product.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    // Voeg het product toe aan de winkelwagen (je kunt dit aanpassen aan je winkelwagenlogica)
    Alert.alert('Added to Cart', `${quantity} x ${product.name} has been added to your cart.`);
    console.log('Added to cart:', { product, quantity });
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
      <Text style={styles.price}>${product.price}</Text>

      {/* Hoeveelheid invoeren */}
      <Text style={styles.quantityLabel}>Quantity:</Text>
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={(text) => setQuantity(Number(text) || 1)} // Zorg ervoor dat de hoeveelheid minimaal 1 is
      />

      {/* Knop om toe te voegen aan winkelwagen */}
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