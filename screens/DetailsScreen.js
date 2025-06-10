import React, { useState, useEffect } from 'react';
// Importeer React en de `useState`- en `useEffect`-hooks om state te beheren en acties uit te voeren bij het laden.

import { View, Text, Image, StyleSheet, ActivityIndicator, Button, TextInput, Alert } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

import { fetchData } from '../apiClient';
// Importeer de `fetchData`-functie om productgegevens van de API op te halen.

const DetailsScreen = ({ route }) => {
  // Definieer de DetailsScreen-component en haal de `route`-prop eruit.

  const { productId } = route.params;
  // Haal het `productId` op uit de routeparameters.

  const [product, setProduct] = useState(null);
  // State om de productdetails op te slaan.

  const [loading, setLoading] = useState(true);
  // State om bij te houden of de gegevens nog worden geladen.

  const [error, setError] = useState(null);
  // State om eventuele foutmeldingen op te slaan.

  const [quantity, setQuantity] = useState(1);
  // State om de hoeveelheid van het product bij te houden, standaard ingesteld op 1.

  useEffect(() => {
    // Gebruik de `useEffect`-hook om productdetails op te halen wanneer de component wordt geladen of `productId` verandert.
    const fetchProduct = async () => {
      // Definieer een asynchrone functie om productdetails op te halen.
      try {
        const data = await fetchData('/sites/67b3895e80c9f1633cc77720/products');
        // Haal de productgegevens op van de API.

        const foundProduct = data.items.find((item) => item.product.id === productId);
        // Zoek het specifieke product op basis van het `productId`.

        if (foundProduct) {
          // Als het product wordt gevonden, formatteer de details.
          const formattedProduct = {
            id: foundProduct.product.id,
            name: foundProduct.product.fieldData.name,
            imageUrl: foundProduct.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/200',
            // Gebruik een standaardafbeelding als de productafbeelding niet beschikbaar is.
            price: foundProduct.skus[0]?.fieldData.price?.value || 0,
            // Gebruik 0 als standaardprijs als de prijs niet beschikbaar is.
            description: foundProduct.product.fieldData.description || 'Geen beschrijving beschikbaar.',
            // Gebruik een standaardbeschrijving als er geen beschrijving is opgegeven.
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

    fetchProduct();
    // Roep de `fetchProduct`-functie aan om de productdetails op te halen.
  }, [productId]);
  // Voeg `productId` toe als afhankelijkheid om de effect opnieuw uit te voeren als het verandert.

  const addToCart = () => {
    // Definieer een functie om het product aan de winkelwagen toe te voegen.
    if (product) {
      Alert.alert('Toegevoegd aan winkelwagen', `${quantity} x ${product.name} is toegevoegd aan je winkelwagen.`);
      // Toon een melding die bevestigt dat het product is toegevoegd aan de winkelwagen.
    }
  };

  const handleQuantityChange = (text) => {
    // Definieer een functie om wijzigingen in de hoeveelheidinvoer te verwerken.
    const parsedQuantity = parseInt(text, 10);
    // Converteer de invoerwaarde naar een geheel getal.

    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      setQuantity(parsedQuantity);
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

  if (!product) {
    // Controleer of de productdetails niet beschikbaar zijn.
    return (
      <View style={styles.container}>
        {/* Toon een fallback-bericht als het product niet beschikbaar is. */}
        <Text>Productdetails zijn niet beschikbaar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render de productdetails. */}
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      {/* Toon de productafbeelding. */}
      <Text style={styles.title}>{product.name}</Text>
      {/* Toon de productnaam. */}
      <Text style={styles.description}>{product.description}</Text>
      {/* Toon de productbeschrijving. */}
      <Text style={styles.price}>€{product.price.toFixed(2)}</Text>
      {/* Toon de productprijs, geformatteerd met twee decimalen. */}

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

      <Button title="Toevoegen aan winkelwagen" onPress={addToCart} />
      {/* Render een knop om het product aan de winkelwagen toe te voegen. */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor het scherm.
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 400,
    height: 400,
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
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  quantityInput: {
    width: 100,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
// Exporteer de DetailsScreen-component als de standaardexport.