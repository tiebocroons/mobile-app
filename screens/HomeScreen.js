import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator, Text, FlatList } from 'react-native';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const API_URL = 'https://api.webflow.com/v2/sites/67b3895e80c9f1633cc77720/products';
const API_KEY = '24041412307977360bc577b126c9f1b8a4b60ee9145baa4df60dbb991731aa73';

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
        // Map de JSON-structuur om de juiste gegevens te extraheren
        const formattedProducts = response.data.items.map((item) => ({
          id: item.product.id,
          name: item.product.fieldData.name,
          imageUrl: item.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/200',
          price: item.skus[0]?.fieldData.price?.value || 0,
        }));
        setProducts(formattedProducts);
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
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2} // Zorgt voor een 2-koloms weergave
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => {
              console.log('Navigating to ProductDetails with productId:', item.id);
              navigation.navigate('ProductDetails', {
                productId: item.id,
                name: item.name,
                description: item.description, // Zorg ervoor dat dit wordt doorgegeven
                price: item.price,
                imageUrl: item.imageUrl,
              });
            }}
          />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatListContent: {
    paddingHorizontal: 10,
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