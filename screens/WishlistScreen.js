import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistScreen = () => {
  const { wishlist, setWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveItem = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) =>
        item.id === id
          ? { ...item, quantity: !isNaN(parsedValue) && parsedValue > 0 ? parsedValue : 1 }
          : item
      )
    );
  };

  const handleBuyItems = () => {
    console.log('Buy Items button pressed'); // Log button press

    if (wishlist.length === 0) {
      console.log('Wishlist is empty'); // Log empty wishlist
      alert('Your wishlist is empty!');
      return;
    }

    console.log('Wishlist before moving to cart:', wishlist); // Log wishlist before moving items

    // Move items to the cart
    addToCart(wishlist);
    console.log('Items added to cart:', wishlist); // Log items added to the cart

    // Clear the wishlist
    setWishlist([]);
    console.log('Wishlist cleared'); // Log wishlist cleared

    alert('Items moved to the cart!');
  };

  console.log('Wishlist:', wishlist); // Debugging log

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      ) : (
        <>
          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              console.log('Rendering item:', item); // Debugging log
              return (
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  <View style={styles.itemDetails}>
                    {/* Validate and render item name */}
                    <Text style={styles.title}>{item?.name || 'Unnamed Item'}</Text>

                    {/* Validate and render item price */}
                    <Text style={styles.price}>
                      Price: ${item?.price && item?.quantity ? (item.price * item.quantity).toFixed(2) : 'N/A'}
                    </Text>

                    {/* Validate and render item quantity */}
                    <View style={styles.quantityContainer}>
                      <Text style={styles.quantityLabel}>Quantity:</Text>
                      <TextInput
                        style={styles.quantityInput}
                        keyboardType="numeric"
                        value={item.quantity?.toString() || '1'} // Fallback to '1' if undefined
                        onChangeText={(value) => handleQuantityChange(item.id, value)}
                      />
                    </View>
                  </View>

                  {/* Remove button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyItems}>
            <Text style={styles.buyButtonText}>Buy Items</Text>
          </TouchableOpacity>
        </>
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
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityLabel: {
    fontSize: 14,
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
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WishlistScreen;