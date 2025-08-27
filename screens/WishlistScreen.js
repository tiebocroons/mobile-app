import React from 'react';
// Importeer React om de component te maken.

import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

import { useWishlist } from '../context/WishlistContext';
// Importeer de `useWishlist`-hook om toegang te krijgen tot en de verlanglijstcontext te beheren.

import { useCart } from '../context/CartContext';
// Importeer de `useCart`-hook om toegang te krijgen tot en de winkelwagencontext te beheren.

const WishlistScreen = () => {
  // Definieer de WishlistScreen-component.

  const { wishlist, setWishlist } = useWishlist();
  // Haal de `wishlist`- en `setWishlist`-functies uit de verlanglijstcontext.

  const { addToCart } = useCart();
  // Haal de `addToCart`-functie uit de winkelwagencontext.

  const handleRemoveItem = (id) => {
    // Definieer een functie om een item uit de verlanglijst te verwijderen op basis van het ID.
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
    // Werk de verlanglijst bij door het item met het opgegeven ID te verwijderen.
  };

  const handleQuantityChange = (id, value) => {
    // Definieer een functie om wijzigingen in de hoeveelheid van een item te verwerken.
    const parsedValue = parseInt(value, 10);
    // Converteer de invoerwaarde naar een geheel getal.
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) =>
        item.id === id
          ? { ...item, quantity: !isNaN(parsedValue) && parsedValue > 0 ? parsedValue : 1 }
          : item
      )
    );
    // Werk de hoeveelheid van het item met het opgegeven ID bij, zorg ervoor dat het een geldig getal is.
  };

  const handleBuyItems = () => {
    // Definieer een functie om de "Koop items"-knop te verwerken.
    if (wishlist.length === 0) {
      // Controleer of de verlanglijst leeg is.
      alert('Je verlanglijst is leeg!');
      // Toon een melding als de verlanglijst leeg is.
      return;
    }

    addToCart(wishlist);
    // Voeg alle items uit de verlanglijst toe aan de winkelwagen.

    setWishlist([]);
    // Maak de verlanglijst leeg.

    alert('Items verplaatst naar de winkelwagen!');
    // Toon een melding die bevestigt dat de items zijn verplaatst naar de winkelwagen.
  };

  return (
    <View style={styles.container}>
      {/* Render de hoofdcontainer voor het scherm. */}
      {wishlist.length === 0 ? (
        // Controleer of de verlanglijst leeg is.
        <Text style={styles.emptyText}>Je verlanglijst is leeg.</Text>
        // Toon een bericht als de verlanglijst leeg is.
      ) : (
        <>
          {/* Render de items in de verlanglijst als deze niet leeg is. */}
          <FlatList
            data={wishlist}
            // Stel de gegevensbron voor de FlatList in op de verlanglijst.
            keyExtractor={(item) => item.id}
            // Gebruik het ID van het item als sleutel voor elk lijstitem.
            renderItem={({ item }) => {
              // Definieer hoe elk item in de lijst moet worden weergegeven.
              return (
                <View style={styles.itemContainer}>
                  {/* Render de container voor elk item in de verlanglijst. */}
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  {/* Toon de afbeelding van het item. */}
                  <View style={styles.itemDetails}>
                    {/* Render de container voor de details van het item. */}
                    <Text style={styles.title}>{item?.name || 'Naamloos item'}</Text>
                    {/* Toon de naam van het item, of een fallback als deze niet is opgegeven. */}
                    <Text style={styles.price}>
                      Prijs: €
                      {item?.price && item?.quantity ? (item.price * item.quantity).toFixed(2) : 'N/A'}
                    </Text>
                    {/* Toon de prijs van het item, berekend op basis van de hoeveelheid. */}
                    <View style={styles.quantityContainer}>
                      {/* Render de container voor de hoeveelheidinvoer. */}
                      <Text style={styles.quantityLabel}>Hoeveelheid:</Text>
                      {/* Toon het label voor de hoeveelheidinvoer. */}
                      <TextInput
                        style={styles.quantityInput}
                        keyboardType="numeric"
                        value={item.quantity?.toString() || '1'}
                        // Toon de hoeveelheid van het item als een string, of fallback naar '1'.
                        onChangeText={(value) => handleQuantityChange(item.id, value)}
                        // Roep `handleQuantityChange` aan wanneer de invoerwaarde verandert.
                      />
                    </View>
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
              );
            }}
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
    backgroundColor: 'black',
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
// Exporteer de WishlistScreen-component als de standaardexport.