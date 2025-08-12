import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, FlatList, RefreshControl, TextInput } from 'react-native';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.webflow.com/v2/sites/67b3895e80c9f1633cc77720/products' , {
        headers: {
          Authorization: `Bearer 886892667cf6f17b2ab536cd43fb4c9c7322f9fc99e2334a946aada783bf01ec`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData); // Bekijk de foutdetails.
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedProducts = data.items.map((item) => ({
        id: item.product.id,
        name: item.product.fieldData.name,
        imageUrl: item.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/200',
        price: item.skus[0]?.fieldData.price?.value || 0,
      }));

      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    } catch (err) {
      console.error('Fout bij het ophalen van producten:', err.message);
      setError('Er is een fout opgetreden bij het ophalen van producten. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

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
      <TextInput
        style={styles.searchBar}
        placeholder="Zoek producten..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#fff',
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