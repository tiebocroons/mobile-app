import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://api.webflow.com/v2/sites/67b3895e80c9f1633cc77720/products';
const API_KEY = '27786b30638667e363a560f16ef4f49a5da86f2d0d5181e6cf49df9feff1aa8a';

const DetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${productId}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'accept-version': '1.0.0',
          },
        });
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const sku = product.skus && product.skus[0] ? product.skus[0] : null;
  const price = sku && sku.fieldData && sku.fieldData.price ? sku.fieldData.price.value : 0;
  const imageUrl = sku && sku.fieldData && sku.fieldData['main-image'] ? sku.fieldData['main-image'].url : 'https://via.placeholder.com/200';

  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{product.fieldData.name}</Text>
      <Text style={styles.description}>{product.fieldData.description}</Text>
      <Text style={styles.price}>${price}</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={decreaseQuantity} />
        <Text style={styles.quantity}>{quantity}</Text>
        <Button title="+" onPress={increaseQuantity} />
      </View>
      <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
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
    width: 200,
    height: 200,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;