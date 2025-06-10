import React, { useState, useEffect } from 'react';
// Importeer React en de `useState`- en `useEffect`-hooks om state te beheren en acties uit te voeren bij het laden.

import { View, Text, Image, StyleSheet, ActivityIndicator, Button, Alert, ScrollView, TextInput } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

import { useWishlist } from '../context/WishlistContext';
// Importeer de `useWishlist`-hook om toegang te krijgen tot en de verlanglijstcontext te beheren.

import { fetchData } from '../apiClient';
// Importeer de `fetchData`-functie om productgegevens van de API op te halen.

const ProductDetailsScreen = ({ route }) => {
  // Definieer de ProductDetailsScreen-component en haal de `route`-prop eruit.

  const { productId } = route.params;
  // Haal het `productId` op uit de routeparameters.

  const { addToWishlist } = useWishlist();
  // Haal de `addToWishlist`-functie uit de verlanglijstcontext.

  const [product, setProduct] = useState(null);
  // State om de productdetails op te slaan.

  const [loading, setLoading] = useState(true);
  // State om bij te houden of de gegevens nog worden geladen.

  const [error, setError] = useState(null);
  // State om eventuele foutmeldingen op te slaan.

  const [quantity, setQuantity] = useState(1);
  // State om de hoeveelheid van het product bij te houden.

  useEffect(() => {
    // Gebruik de `useEffect`-hook om productdetails op te halen wanneer de component wordt geladen of `productId` verandert.
    const fetchProductDetails = async () => {
      // Definieer een asynchrone functie om productdetails op te halen.
      try {
        const data = await fetchData('/sites/67b3895e80c9f1633cc77720/products');
        // Haal de productgegevens op van de API.

        const foundProduct = data.items.find((item) => item.product.id === productId);
        // Zoek het product in de API-respons dat overeenkomt met het `productId`.

        if (foundProduct) {
          // Als het product wordt gevonden, formatteer de details.
          const formattedProduct = {
            id: foundProduct.product.id,
            name: foundProduct.product.fieldData.name,
            description: foundProduct.product.fieldData.description || 'Geen beschrijving beschikbaar.',
            price: foundProduct.skus[0]?.fieldData.price?.value || 0,
            imageUrl: foundProduct.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/300',
          };
          setProduct(formattedProduct);
          // Werk de `product`-state bij met de geformatteerde productdetails.
        } else {
          setError('Product niet gevonden.');
          // Stel een foutmelding in als het product niet wordt gevonden.
        }
      } catch (err) {
        setError('Er is een fout opgetreden bij het ophalen van het product.');
        // Stel een foutmelding in als de API-aanroep mislukt.
      } finally {
        setLoading(false);
        // Zet de `loading`-state op `false` nadat de API-aanroep is voltooid.
      }
    };

    fetchProductDetails();
    // Roep de `fetchProductDetails`-functie aan om de productdetails op te halen.
  }, [productId]);
  // Voeg `productId` toe als afhankelijkheid om de effect opnieuw uit te voeren als het verandert.

  const handleAddToWishlist = () => {
    // Definieer een functie om het product aan de verlanglijst toe te voegen.
    if (product) {
      const productWithQuantity = { ...product, quantity };
      // Voeg de hoeveelheid toe aan het productobject.

      addToWishlist(productWithQuantity);
      // Voeg het product met hoeveelheid toe aan de verlanglijst.

      Alert.alert('Toegevoegd aan verlanglijst', `${product.name} (x${quantity}) is toegevoegd aan je verlanglijst.`);
      // Toon een melding die bevestigt dat het product is toegevoegd aan de verlanglijst.
    }
  };

  const handleQuantityChange = (value) => {
    // Definieer een functie om wijzigingen in de hoeveelheidinvoer te verwerken.
    if (value === '') {
      setQuantity('');
      // Sta tijdelijke lege invoer toe.
      return;
    }

    const parsedValue = parseInt(value, 10);
    // Converteer de invoerwaarde naar een geheel getal.

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setQuantity(parsedValue);
      // Werk de `quantity`-state bij als de invoer geldig is.
    } else {
      setQuantity(1);
      // Stel standaard in op 1 als de invoer ongeldig is.
    }
  };

  if (loading) {
    // Controleer of de gegevens nog worden geladen.
    return (
      <View style={styles.loadingContainer}>
        {/* Toon een laadindicator terwijl de gegevens worden opgehaald. */}
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    // Controleer of er een fout is opgetreden.
    return (
      <View style={styles.container}>
        {/* Toon de foutmelding als er een fout is opgetreden. */}
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Render de productdetails in een scrollbare weergave. */}
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      {/* Toon de productafbeelding. */}
      <Text style={styles.title}>{product.name}</Text>
      {/* Toon de productnaam. */}
      <Text style={styles.description}>{product.description}</Text>
      {/* Toon de productbeschrijving. */}
      <Text style={styles.price}>
        Prijs: €{product?.price ? product.price.toFixed(2) : 'N/A'}
        {/* Toon de productprijs, geformatteerd met twee decimalen. */}
      </Text>
      <View style={styles.quantityContainer}>
        {/* Render de container voor de hoeveelheidinvoer. */}
        <Text style={styles.quantityLabel}>Hoeveelheid:</Text>
        {/* Toon het label voor de hoeveelheidinvoer. */}
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          value={quantity.toString()}
          // Converteer de hoeveelheid naar een string voor het invoerveld.
          onChangeText={handleQuantityChange}
          // Roep `handleQuantityChange` aan wanneer de invoerwaarde verandert.
        />
      </View>
      <Button title="Toevoegen aan verlanglijst" onPress={handleAddToWishlist} />
      {/* Render een knop om het product aan de verlanglijst toe te voegen. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor het scherm.
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
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
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
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
});

export default ProductDetailsScreen;
// Exporteer de ProductDetailsScreen-component als de standaardexport.