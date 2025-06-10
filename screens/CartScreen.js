import React from 'react';
// Importeer React om de component te maken.

import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

import { useCart } from '../context/CartContext';
// Importeer de `useCart`-hook om toegang te krijgen tot en de winkelwagencontext te beheren.

const CartScreen = ({ navigation }) => {
  // Definieer de CartScreen-component en haal de `navigation`-prop eruit.

  const { cart, setCart } = useCart();
  // Haal de `cart`- en `setCart`-functies uit de winkelwagencontext.

  const handleRemoveItem = (id) => {
    // Definieer een functie om een item uit de winkelwagen te verwijderen op basis van het ID.
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    // Werk de winkelwagen bij door het item met het opgegeven ID te verwijderen.
  };

  const handleBuyItems = () => {
    // Definieer een functie om de "Koop items"-knop te verwerken.
    if (cart.length === 0) {
      // Controleer of de winkelwagen leeg is.
      alert('Je winkelwagen is leeg!');
      // Toon een melding als de winkelwagen leeg is.
      return;
    }

    setCart([]);
    // Maak de winkelwagen leeg.

    navigation.reset({
      // Reset de navigatiestack en navigeer naar het Succes-scherm.
      index: 0,
      routes: [{ name: 'Success' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Render de hoofdcontainer voor het scherm. */}
      {cart.length === 0 ? (
        // Controleer of de winkelwagen leeg is.
        <Text style={styles.emptyText}>Je winkelwagen is leeg.</Text>
        // Toon een bericht als de winkelwagen leeg is.
      ) : (
        <>
          {/* Render de items in de winkelwagen als deze niet leeg is. */}
          <FlatList
            data={cart}
            // Stel de gegevensbron voor de FlatList in op de winkelwagen.
            keyExtractor={(item) => item.id}
            // Gebruik het ID van het item als sleutel voor elk lijstitem.
            renderItem={({ item }) => (
              // Definieer hoe elk item in de lijst moet worden weergegeven.
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                {/* Toon de afbeelding van het item. */}
                <View style={styles.itemDetails}>
                  <Text style={styles.title}>{item.name}</Text>
                  {/* Toon de naam van het item. */}
                  <Text style={styles.price}>
                    Prijs: €{(item.price * item.quantity).toFixed(2)}
                    {/* Toon de prijs van het item, berekend op basis van de hoeveelheid. */}
                  </Text>
                  <Text style={styles.quantity}>Aantal: {item.quantity}</Text>
                  {/* Toon de hoeveelheid van het item. */}
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  {/* Render de "Verwijder"-knop voor het item. */}
                  <Text style={styles.removeButtonText}>Verwijder</Text>
                  {/* Toon de tekst voor de "Verwijder"-knop. */}
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyItems}>
            {/* Render de "Koop items"-knop. */}
            <Text style={styles.buyButtonText}>Koop items</Text>
            {/* Toon de tekst voor de "Koop items"-knop. */}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor het scherm.
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
  quantity: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
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

export default CartScreen;
// Exporteer de CartScreen-component als de standaardexport.