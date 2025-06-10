import React from 'react';
// Importeer React om de component te maken.

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

const ProductCard = ({ product, onPress }) => {
  // Definieer de ProductCard-component en haal de `product`- en `onPress`-props eruit.

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Maak een klikbare kaart die de `onPress`-functie uitvoert wanneer erop wordt geklikt. */}
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      {/* Toon de productafbeelding met behulp van de `imageUrl` uit het productobject. */}
      <Text style={styles.name}>{product.name}</Text>
      {/* Toon de naam van het product. */}
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      {/* Toon de prijs van het product, geformatteerd met twee decimalen. */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor de ProductCard-component.
  card: {
    flex: 1,
    // Laat de kaart groeien en beschikbare ruimte innemen.
    margin: 10,
    // Voeg marge toe rond de kaart.
    backgroundColor: '#fff',
    // Stel de achtergrondkleur van de kaart in op wit.
    borderRadius: 8,
    // Maak de hoeken van de kaart afgerond.
    padding: 10,
    // Voeg opvulling toe binnen de kaart.
    shadowColor: '#000',
    // Stel de schaduwkleur in op zwart.
    shadowOpacity: 0.1,
    // Stel de schaduwdekking in.
    shadowOffset: { width: 0, height: 2 },
    // Stel de schaduwpositie in om een lichte verheffing te creëren.
    shadowRadius: 4,
    // Stel de schaduwradius in voor een zachte schaduw.
    elevation: 3,
    // Voeg verheffing toe voor schaduwondersteuning op Android.
  },
  image: {
    width: '100%',
    // Laat de afbeelding de volledige breedte van de kaart innemen.
    height: 150,
    // Stel de hoogte van de afbeelding in.
    borderRadius: 8,
    // Maak de hoeken van de afbeelding afgerond.
    marginBottom: 10,
    // Voeg een marge toe onder de afbeelding.
  },
  name: {
    fontSize: 16,
    // Stel de lettergrootte in voor de productnaam.
    fontWeight: 'bold',
    // Maak de tekst van de productnaam vet.
    marginBottom: 5,
    // Voeg een marge toe onder de productnaam.
  },
  price: {
    fontSize: 14,
    // Stel de lettergrootte in voor de productprijs.
    color: '#666',
    // Stel de tekstkleur in op een grijstint.
  },
});

export default ProductCard;
// Exporteer de ProductCard-component als de standaardexport.