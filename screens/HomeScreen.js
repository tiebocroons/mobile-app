import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchData } from '../apiClient';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Add a timestamp to prevent caching
      const data = await fetchData(`/sites/67b3895e80c9f1633cc77720/products?timestamp=${Date.now()}`);
      const formattedProducts = data.items.map((item) => ({
        id: item.product.id,
        name: item.product.fieldData.name,
        imageUrl: item.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/200',
        price: item.skus[0]?.fieldData.price?.value || 0,
      }));
      console.log('Formatted Products:', formattedProducts); // Debugging log
      setProducts(formattedProducts);
    } catch (err) {
      console.error('Error fetching products:', err.message);
      setError('An error occurred while fetching products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
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
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                productId: item.id,
              })
            }
          />
        )}
      />
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
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default HomeScreen;