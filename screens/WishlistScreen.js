import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useWishlist } from '../context/WishlistContext';

const WishlistScreen = () => {
  const { wishlist } = useWishlist();
  console.log('Current wishlist:', wishlist);

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>Price: ${item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
});

export default WishlistScreen;